/** @format */

import React from "react";

export function Points({ data, xScale, yScale }) {
  //complete the getColor and getRadius when you are asked to
  const getColor = () => {
    return;
  };
  const getRadius = () => {
    return;
  };

  return (
    <g>
      {data.map((d) => (
        <circle
          r={5}
          stroke='black'
          fill='steelblue'
          cx={xScale(d.tripdurationS)}
          cy={yScale(d.tripdurationE)}
          key={`${d.station}-${d.month}`}
        />
      ))}
    </g>
  );
}
