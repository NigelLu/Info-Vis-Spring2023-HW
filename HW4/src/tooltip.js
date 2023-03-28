/** @format */

import React from "react";
import { SymmetricAreaChart } from "./charts";

export function Tooltip({ d, stationYearData, left, top, height, width }) {
  if (!d) {
    return <g></g>;
  } else {
    return (
      <g transform={`translate(${left}, ${top})`}>
        <text
          style={{ textAnchor: "start", fontSize: "15px" }}
          transform={`translate(${0}, ${5})rotate(0)`}
        >
          {d.station}{" "}
        </text>
        <SymmetricAreaChart
          offsetX={0}
          offsetY={0}
          width={width}
          height={height / 2}
          data={stationYearData}
        />
      </g>
    );
  }
}
