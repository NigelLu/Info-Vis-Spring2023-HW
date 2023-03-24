/** @format */

import React from "react";
import { scaleLinear, min, max } from "d3";
import { geoPath, geoMercator } from "d3-geo";

export function SymbolMap({
  map,
  data,
  width,
  height,
  offsetX,
  offsetY,
  selectedStation,
  setSelectedStation,
}) {
  // * projection & generator for svg path
  const projection = geoMercator().fitSize([width, height], map);
  const geoGenerator = geoPath(projection);

  // * linear scaler for determining circle radius based on station popularity
  const radius = scaleLinear()
    .domain([min(data, (d) => d.popularity), max(data, (d) => d.popularity)])
    .range([2, 20]);

  // * circle color and opacity getter
  const getColor = (selectedStation, station) =>
    selectedStation === station ? "steelblue" : "red";
  const getOpacity = (selectedStation, station) => (selectedStation === station ? 1 : 0.7);

  // * mouse events
  const mouseEnter = (d) => setSelectedStation(d.station);
  const mouseOut = () => setSelectedStation(null);

  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      {/* Draw the map of Jersey City */}
      {map.features.map((feature, idx) => (
        <path key={idx + "boundary"} className={"boundary"} d={geoGenerator(feature)}></path>
      ))}
      {/* Draw the points for stations */}
      {data.map((d) => {
        const [x, y] = projection([d.longitude, d.latitude]);
        return (
          <circle
            cx={x}
            cy={y}
            onMouseOut={mouseOut}
            r={radius(d.popularity)}
            onMouseEnter={() => mouseEnter(d)}
            key={"station" + d.longitude + d.latitude}
            style={{ stroke: "black", strokeWidth: 1 }}
            fill={getColor(selectedStation, d.station)}
            opacity={getOpacity(selectedStation, d.station)}
          />
        );
      })}
    </g>
  );
}
