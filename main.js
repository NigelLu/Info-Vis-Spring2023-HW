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

// region Reusable Functions

const plotScatter = function ({
  div,
  data,
  margin,
  width_spl,
  xScale_spl,
  yScale_spl,
  height_spl,
  scatterPlotLayer,
}) {
  // * axis definition
  const xAxisScatter = d3.axisBottom(xScale_spl).ticks(width_spl / TICK_WIDTH);
  const yAxisScatter = d3.axisLeft(yScale_spl).ticks(height_spl / TICK_HEIGHT);

  // * draw the xAxisScatter
  scatterPlotLayer
    .append("g")
    .attr("transform", `translate(0, ${height_spl - margin.bottom})`)
    .call(xAxisScatter)
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

  // * draw the yAxisScatter
  scatterPlotLayer
    .append("g")
    .call(yAxisScatter)
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

  drawPoints(scatterPlotLayer, data, xScale_spl, yScale_spl, div, width_spl, height_spl); // ~ done
};

const plotBar = function ({
  div,
  data,
  margin,
  width_bar,
  height_bar,
  xScale_bar,
  yScale_bar,
  barChartLayer,
}) {
  // * axis definition
  const xAxisBar = d3.axisBottom(xScale_bar).ticks(width_bar / TICK_WIDTH);
  const yAxisBar = d3.axisLeft(yScale_bar).ticks(height_bar / TICK_HEIGHT);

  // * draw the xAxis
  const xAxisSvgBar = barChartLayer
    .append("g")
    .attr("transform", `translate(0, ${height_bar - margin.bottom})`);

  xAxisSvgBar.call(xAxisBar);

  xAxisSvgBar
    .selectAll("text")
    .style("text-anchor", "end")
    .style("font-size", "0.4rem")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  // * draw the yAxis
  barChartLayer
    .append("g")
    .call(yAxisBar)
    .call((g) =>
      g
        .append("text")
        .attr("x", -15)
        .attr("y", -5)
        .attr("fill", "currentColor")
        .attr("font-size", "0.75rem")
        .attr("text-anchor", "start")
        .text("Bikers start from"),
    );

  drawBars(barChartLayer, data, xScale_bar, yScale_bar, width_bar, height_bar, div, margin);
};

const removeAndResetLayer = function ({
  margin,
  svg_bar,
  svg_scatter,
  barChartLayer,
  scatterPlotLayer,
}) {
  scatterPlotLayer.remove();
  barChartLayer.remove();
  return [
    svg_scatter.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`),
    svg_bar.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`),
  ];
};
// endregion Reusable Functions

d3.csv("citi_bike_2020.csv").then(function (data) {
  // region Misc Prep
  // some framework-codes are given to guide you complete the tasks;
  // in some places, you need to modify them so that they will adapt to your code.
  const width = +viewBox[2]; // Note: in this case, viewBox_bar and viewBox_scatter are the same
  const height = +viewBox[3];

  // * convert numerical fields in the data to numerical values
  convertNumericalData(data);
  let dataSelected = getDataByMonth(data, d3.select("#slidertext").node().value);
  // endregion Misc Prep

  // region Scatter Plot
  // * Q2.1 Scatter Plot
  const margin = { left: 50, right: 30, top: 30, bottom: 120 }; // ~ done
  const xScale_spl = Scales.linear(
    0,
    d3.max(dataSelected, (item) => item.tripdurationS),
    0,
    width - margin.right - 40,
  ); // ~ done
  const yScale_spl = Scales.linear(
    0,
    d3.max(dataSelected, (item) => item.tripdurationE),
    height - margin.bottom,
    0,
  ); // ~ done
  const width_spl = width; // ~ done
  const height_spl = height; // ~ done

  let scatterPlotLayer = svg_scatter
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  plotScatter({
    div,
    margin,
    width_spl,
    xScale_spl,
    yScale_spl,
    height_spl,
    scatterPlotLayer,
    data: dataSelected,
  });
  // endregion Scatter Plot

  // region Bar Chart
  // * Q2.2 Bar Chart
  const xScale_bar = Scales.band(
    new Set(dataSelected.map((item) => item.station).values()),
    0,
    width - margin.right - 40,
  ); // ~ done
  const yScale_bar = Scales.linear(
    0,
    d3.max(data, (item) => item.start),
    height - margin.bottom,
    0,
  ); // ~ done
  const width_bar = width; // ~ done
  const height_bar = height; // ~ done
  let barChartLayer = svg_bar
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  plotBar({
    div,
    margin,
    width_bar,
    height_bar,
    xScale_bar,
    yScale_bar,
    barChartLayer,
    data: dataSelected,
  });
  // endregion Bar Chart

  // region Slider
  // * Q2.4 Slider
  let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let slider = d3.select("#slider");
  let slidertext = d3.select("#slidertext");
  slider.on("input", function () {
    slidertext.attr("value", month[this.value - 1]);
    dataSelected = getDataByMonth(data, d3.select("#slidertext").node().value);
    [scatterPlotLayer, barChartLayer] = removeAndResetLayer({
      margin,
      svg_bar,
      svg_scatter,
      barChartLayer,
      scatterPlotLayer,
    });
    plotScatter({
      div,
      margin,
      width_spl,
      xScale_spl,
      yScale_spl,
      height_spl,
      scatterPlotLayer,
      data: dataSelected,
    });
    plotBar({
      div,
      margin,
      width_bar,
      height_bar,
      xScale_bar,
      yScale_bar,
      barChartLayer,
      data: dataSelected,
    });
  });
  // endregion Slider
});
