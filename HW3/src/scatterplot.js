/** @format */

import { max } from "d3";
import React from "react";
import { Scales } from "./scale";
import { Points } from "./points";
import { XAxis, YAxis } from "./axes";

export function ScatterPlot({
  data,
  offsetX,
  offsetY,
  height,
  width,
  selectedStation,
  setSelectedStation,
}) {
  // * scales for x & y axis
  const xScale = Scales.linear(
    0,
    max(data, (d) => d.tripdurationS),
    0,
    width,
  );
  const yScale = Scales.linear(
    0,
    max(data, (d) => d.tripdurationE),
    height,
    0,
  );

  // * prepare props for components
  const xAxisProps = {
    width,
    height,
    xScale,
    chartType: "scatter",
    axisLabel: "Trip duration start from",
  };
  const yAxisProps = {
    height,
    yScale,
    axisLabel: "Trip duration end in",
  };
  const pointsProps = {
    data,
    xScale,
    yScale,
    selectedStation,
    setSelectedStation,
  };

  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      <Points {...pointsProps} />
      <YAxis {...yAxisProps} />
      <XAxis {...xAxisProps} />
    </g>
  );
}
