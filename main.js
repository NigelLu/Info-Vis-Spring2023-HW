/**
 * ~format
 *
 * @format
 */

import { Scales } from "./scales.js";
import { getDataByMonth, convertNumericalData } from "./data_filter.js";
import { drawPoints } from "./scatter.js";
import { drawBars } from "./bar.js";

const TICK_WIDTH = 60;
const TICK_HEIGHT = 80;

const svg_scatter = d3.select("#scatterplot");
const svg_bar = d3.select("#barchart");
// const viewBox_scatter = svg_scatter.attr('viewBox'); //not needed because the scatter plot and bar chart have the same width and height
const viewBox = svg_bar.attr("viewBox").split(" ");

let div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

d3.csv("citi_bike_2020.csv").then(function (data) {
  // some framework-codes are given to guide you complete the tasks;
  // in some places, you need to modify them so that they will adapt to your code.
  const width = +viewBox[2]; // Note: in this case, viewBox_bar and viewBox_scatter are the same
  const height = +viewBox[3];

  // * convert numerical fields in the data to numerical values
  convertNumericalData(data);
  console.log(data.slice(0, 3)); // ! remove this before submission

  // * Q2.1 Scatter Plot
  const margin = { left: 50, right: 30, top: 30, bottom: 120 }; // ~ done
  const xScale_spl = Scales.linear(
    0,
    d3.max(getDataByMonth(data, "May"), (item) => item.tripdurationS),
    0,
    width - margin.right - 40,
  ); // ~ done
  const yScale_spl = Scales.linear(
    0,
    d3.max(getDataByMonth(data, "May"), (item) => item.tripdurationE),
    height - margin.bottom,
    0,
  ); // ~ done
  let width_spl = width; // ~ done
  let height_spl = height; // ~ done

  const scatterPlotLayer = svg_scatter
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // region Axis

  // * axis definition
  const xAxis = d3.axisBottom(xScale_spl).ticks(width_spl / TICK_WIDTH);
  const yAxis = d3.axisLeft(yScale_spl).ticks(height_spl / TICK_HEIGHT);

  // * draw the xAxis
  scatterPlotLayer
    .append("g")
    .attr("transform", `translate(0, ${height_spl - margin.bottom})`)
    .call(xAxis)
    .call((g) =>
      g
        .append("text")
        .attr("x", width_spl - margin.right - margin.left + 15)
        .attr("y", -8)
        .attr("fill", "currentColor")
        .attr("font-size", "0.75rem")
        .style("text-anchor", "end")
        .text("Trip duration start from"),
    );

  // * draw the yAxis
  scatterPlotLayer
    .append("g")
    .call(yAxis)
    .call((g) =>
      g
        .append("text")
        .attr("x", -100)
        .attr("y", 20)
        .attr("fill", "currentColor")
        .attr("font-size", "0.75rem")
        .attr("text-anchor", "start")
        .attr("transform", "rotate(-90)")
        .text("Trip duration end in"),
    );

  // endregion Axis

  drawPoints(
    scatterPlotLayer,
    getDataByMonth(data, "May"),
    xScale_spl,
    yScale_spl,
    div,
    width_spl,
    height_spl,
    margin,
  );

  // * Q2.2 Bar Chart
  const xScale_bar = Scales.band([], 0, 0);
  const yScale_bar = Scales.linear(0, 0, 0, 0);
  let width_bar = width; // ~ done
  let height_bar = height; // ~ done
  let barChartLayer = svg_bar
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  drawBars(
    barChartLayer,
    getDataByMonth(data, "May"),
    xScale_bar,
    yScale_bar,
    width_bar,
    height_bar,
    div,
  );

  //Q2.4 Slider
  let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let slider = d3.select("#slider");
  let slidertext = d3.select("#slidertext");
  slider.on("input", function () {
    console.log(this.value);
    slidertext.attr("value", month[this.value - 1]);
  });
});
