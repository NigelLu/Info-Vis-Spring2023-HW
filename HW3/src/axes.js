/** @format */

import React from "react";

export { XAxis, YAxis };

function XAxis({ width, xScale, height, chartType, axisLabel }) {
  if (chartType === "scatter") {
    const ticks = xScale.ticks();
    return (
      <g>
        <text
          x={width - 45}
          y={height - 10}
          style={{ textAnchor: "middle", fontSize: "0.5rem", fontWeight: "bold" }}
        >
          {axisLabel}
        </text>
        <line x1={0} x2={width} y1={height} y2={height} stroke={"black"} />
        {ticks.map((tickVal) => (
          <g key={tickVal} transform={`translate(${xScale(tickVal)}, ${height})`}>
            <line y2={5} stroke={"black"}></line>
            <text y={15} style={{ textAnchor: "middle", fontSize: "0.5rem" }}>
              {tickVal}
            </text>
          </g>
        ))}
      </g>
    );
  }
  if (chartType === "bar") {
    const xLabels = xScale.domain();
    return (
      <g>
        <line x1={0} x2={width} y1={height} y2={height} stroke={"black"} />
        {xLabels.map((xLabel) => (
          <g key={xLabel} transform={`translate(${xScale(xLabel)}, ${height})`}>
            <text x={5} transform="rotate(75)" style={{ textAnchor: "start", fontSize: "0.4rem" }}>
              {xLabel}
            </text>
          </g>
        ))}
      </g>
    );
  }
}

function YAxis({ height, yScale, axisLabel }) {
  const ticks = yScale.ticks();

  return (
    <g>
      <text
        x={-60}
        y={15}
        style={{ textAnchor: "start", fontSize: "0.5rem", fontWeight: "bold" }}
        transform='rotate(-90)'
      >
        {axisLabel}
      </text>
      <line y2={height} stroke={"black"} />
      {ticks.map((tickVal) => (
        <g key={tickVal} transform={`translate(-10, ${yScale(tickVal)})`}>
          <line x2={10} stroke={"black"} />
          <text style={{ textAnchor: "end", fontSize: "0.5rem" }}>{tickVal}</text>
        </g>
      ))}
    </g>
  );
}
