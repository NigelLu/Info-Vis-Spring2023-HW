/** @format */

import { Scales } from "./scales.js";
import { getDataByMonth } from "./data_filter.js";
import { drawPoints } from "./scatter.js";
import { drawBars } from "./bar.js";

const svg_scatter = d3.select("#scatterplot");
const svg_bar = d3.select("#barchart");
// const viewBox_scatter = svg_scatter.attr('viewBox'); //not needed because the scatter plot and bar chart have the same width and height
const viewBox = svg_bar.attr("viewBox").split(" ");

let div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

d3.csv("citi_bike_2020.csv").then(function (data) {
  //some framework-codes are given to guide you complete the tasks;
  //in some places, you need to modify them so that they will adapt to your code.
  const width = +viewBox[2]; //Note: in this case, viewBox_bar and viewBox_scatter are the same
  const height = +viewBox[3];
  console.log(width, height);
  // * Q2.1 Scatter Plot
  const margin = { left: 50, right: 30, top: 30, bottom: 120 }; // @ done
  const xScale_spl = Scales.linear(0, 0, 0, 0);
  const yScale_spl = Scales.linear(0, 0, 0, 0);
  let width_spl = 1200; // @ done
  let height_spl = 800; // @ done

  const scatterPlotLayer = svg_scatter
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  drawPoints(
    scatterPlotLayer,
    getDataByMonth(data, "May"),
    xScale_spl,
    yScale_spl,
    div,
    width_spl,
    height_spl,
  );

  //Q2.2 Bar Chart
  const xScale_bar = Scales.band([], 0, 0);
  const yScale_bar = Scales.linear(0, 0, 0, 0);
  let width_bar = 0; // you need to modify it
  let height_bar = 0; //you need to modify it
  let barChartLayer = svg_bar
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
