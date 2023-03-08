/** @format */

import React, { useState } from "react";

const RED = "red";
const STEELBLUE = "steelblue";

export function Bars({ data, xScale, yScale, height, width }) {
  const [selectedStation, setSelectedStation] = useState(null);

  //complete the getColor when you are asked to
  const getColor = (selectedStation, station) => {
    return selectedStation === station ? RED : STEELBLUE;
  };
  const barWidth = width / data.length;

  return (
    <g>
      {data.map((d) => (
        <rect
          width={barWidth}
          y={yScale(d.start)}
          x={xScale(d.station)}
          key={`${d.station}-${d.month}`}
          height={height - yScale(d.start)}
          onMouseOut={() => setSelectedStation(null)}
          onMouseEnter={() => setSelectedStation(d.station)}
          style={{ fill: getColor(selectedStation, d.station), stroke: "black", strokeWidth: 2 }}
        ></rect>
      ))}
    </g>
  );
}
