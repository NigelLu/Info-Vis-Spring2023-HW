/** @format */

import React from "react";
import { max } from "d3";
import { XAxis, YAxis } from "./axes";
import { Scales } from "./scale";
import { Bars } from "./bars";

export function BarChart({
  data,
  width,
  height,
  offsetX,
  offsetY,
  selectedStation,
  setSelectedStation,
}) {
  // * supply the stations Array as sorted to keep the xAxis unchanged between month shifts
  const xScale = Scales.band(
    Array.from(new Set(data.map((item) => item.station))).sort(),
    width,
    0,
  );
  const yScale = Scales.linear(
    0,
    max(data, (d) => d.start),
    height,
    0,
  );

  // * prepare props for components
  const xAxisProps = {
    width,
    height,
    xScale,
    axisLabel: null,
    chartType: "bar",
  };
  const yAxisProps = {
    height,
    yScale,
    axisLabel: "Bikers start from",
  };
  const barsProps = {
    data,
    width,
    height,
    xScale,
    yScale,
    selectedStation,
    setSelectedStation,
  };

  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      <Bars {...barsProps} />
      <XAxis {...xAxisProps} />
      <YAxis {...yAxisProps} />
    </g>
  );
}
