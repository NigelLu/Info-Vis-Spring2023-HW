/** @format */

import React from "react";

const RED = "red";
const STEELBLUE = "steelblue";

export function Points({
  data,
  xScale,
  yScale,
  setTop,
  setLeft,
  setTooltipData,
  selectedStation,
  setSelectedStation,
}) {
  //complete the getColor and getRadius when you are asked to
  const getColor = (selectedStation, station) => {
    return selectedStation === station ? RED : STEELBLUE;
  };
  const getRadius = (selectedStation, station) => {
    return selectedStation === station ? 10 : 5;
  };

  return (
    <g>
      {data
        .filter((d) => d.station !== selectedStation)
        .map((d) => (
          <circle
            stroke='black'
            cx={xScale(d.tripdurationS)}
            cy={yScale(d.tripdurationE)}
            key={`${d.station}-${d.month}`}
            r={getRadius(selectedStation, d.station)}
            fill={getColor(selectedStation, d.station)}
            onMouseEnter={(evt) => {
              setTooltipData(d);
              setTop(evt.screenY);
              setLeft(evt.screenX);
              setSelectedStation(d.station);
            }}
            onMouseOut={() => {
              setTop(null);
              setLeft(null);
              setTooltipData(null);
              setSelectedStation(null);
            }}
          />
        ))}
      {selectedStation && (
        <rect
          width={xScale.range()[1]}
          height={yScale.range()[0]}
          style={{ opacity: 0.75, strokeWidth: 0, fill: "#fce703" }}
        />
      )}
      {data
        .filter((d) => d.station === selectedStation)
        .map((d) => (
          <circle
            stroke='black'
            cx={xScale(d.tripdurationS)}
            cy={yScale(d.tripdurationE)}
            key={`${d.station}-${d.month}`}
            r={getRadius(selectedStation, d.station)}
            fill={getColor(selectedStation, d.station)}
            onMouseEnter={(evt) => {
              setTooltipData(d);
              setTop(evt.screenY);
              setLeft(evt.screenX);
              setSelectedStation(d.station);
            }}
            onMouseOut={() => {
              setTop(null);
              setLeft(null);
              setTooltipData(null);
              setSelectedStation(null);
            }}
          />
        ))}
    </g>
  );
}
