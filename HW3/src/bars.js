/** @format */

import React from "react";

export function Bars({ data, xScale, yScale, height, width }) {
  //complete the getColor when you are asked to
  const getColor = () => {
    return;
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
          style={{ fill: "steelblue", stroke: "black", strokeWidth: 2 }}
        ></rect>
      ))}
    </g>
  );
}
