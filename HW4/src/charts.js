/** @format */

import React from "react";
import { scaleLinear, scaleBand, area, max, curveBasis } from "d3";

function SymmetricBarChart({
  data,
  width,
  height,
  offsetX,
  offsetY,
  selectedStation,
  setSelectedStation,
}) {
  // * retrieve the unique stations of the month
  const uniqueStations = new Set(data.map((d) => d.station));

  // * init the scales for xAxis, yAxisStart, and yAxisEnd
  const xScale = scaleBand().domain(uniqueStations).range([0, width]);
  const maximumY = Math.max(
    max(data, (d) => d.start),
    max(data, (d) => d.end),
  );
  const yScale = scaleLinear()
    .domain([0, maximumY])
    .range([height / 2, 0])
    .nice();

  // * calculate the width for each bar
  const barWidth = width / Array.from(uniqueStations).length;

  // * color getter
  const getColorStart = (selectedStation, station) =>
    selectedStation === station ? "red" : "#99d594";
  const getColorEnd = (selectedStation, station) =>
    selectedStation === station ? "steelblue" : "#fc8d59";

  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      {/* Ridders start from a station */}
      <g>
        {/* the text needed is given as the following */}
        <text
          style={{ textAnchor: "start", fontSize: "15px" }}
          transform={`translate(${width / 3}, 0)`}
        >
          {"Num. of ridders start from a station"}
        </text>
        {/* start your code here */}
        {/* xAxis */}
        <line x1={0} x2={width} y1={height / 2} y2={height / 2} stroke={"black"} />
        {/* yAxisStart */}
        <line y2={height / 2} stroke={"black"} />
        {yScale.ticks().map((tickVal) => (
          <g key={tickVal} transform={`translate(-10, ${yScale(tickVal)})`}>
            <line x2={10} stroke={"black"} />
            <text style={{ textAnchor: "end", fontSize: "0.5rem" }}>{tickVal}</text>
          </g>
        ))}
        {/* barsStart */}
        <g>
          {data.map((d) => (
            <rect
              width={barWidth}
              x={xScale(d.station)}
              y={yScale(d.start)}
              key={`${d.station}-${d.month}-start`}
              height={height / 2 - yScale(d.start)}
              onMouseOut={() => setSelectedStation(null)}
              onMouseEnter={() => setSelectedStation(d.station)}
              style={{
                strokeWidth: 2,
                stroke: "black",
                fill: getColorStart(selectedStation, d.station),
              }}
            ></rect>
          ))}
        </g>
      </g>

      {/* Ridders end into a station */}
      <g transform={`translate(${0}, ${height / 2})`}>
        {/* the text needed is given as the following */}
        <text
          style={{ textAnchor: "start", fontSize: "15px" }}
          transform={`translate(${width / 3}, ${height / 2 + 10})`}
        >
          {"Num. of ridders end into a station"}
        </text>
        {/* start your code here */}
        {/* yAxisEnd */}
        <line y2={height / 2} stroke={"black"} />
        {yScale
          .ticks()
          .reverse()
          .map((tickVal) => (
            <g key={tickVal} transform={`translate(-10, ${height / 2 - yScale(tickVal)})`}>
              <line x2={10} stroke={"black"} />
              <text style={{ textAnchor: "end", fontSize: "0.5rem" }}>{tickVal}</text>
            </g>
          ))}
        {/* barsEnd */}
        <g>
          {data.map((d) => (
            <rect
              width={barWidth}
              x={xScale(d.station)}
              key={`${d.station}-${d.month}-end`}
              height={height / 2 - yScale(d.end)}
              onMouseOut={() => setSelectedStation(null)}
              onMouseEnter={() => setSelectedStation(d.station)}
              style={{
                strokeWidth: 2,
                stroke: "black",
                fill: getColorEnd(selectedStation, d.station),
              }}
            ></rect>
          ))}
        </g>
      </g>
    </g>
  );
}

function SymmetricAreaChart({ data, width, height, offsetX, offsetY }) {
  const MONTH = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // * init the scales for xAxis and yAxis (two scales for yAxis)
  const xScale = scaleBand().domain(MONTH).range([0, width]);
  const maximumY = Math.max(
    max(data, (d) => d.start),
    max(data, (d) => d.end),
  );
  const numTicksYAxis = 3;
  const yScaleStart = scaleLinear()
    .domain([0, maximumY])
    .range([height / 2, 0])
    .nice();
  const yScaleEnd = scaleLinear()
    .domain([0, maximumY])
    .range([0, height / 2])
    .nice();

  // * states for upperArea and lowerArea paths
  const [upperAreaPath, setUpperAreaPath] = React.useState(
    area()
      .x((d) => xScale(d.month))
      .y0(height / 2)
      .y1((d) => yScaleStart(d.start))
      .curve(curveBasis)(data),
  );
  const [lowerAreaPath, setLowerAreaPath] = React.useState(
    area()
      .x((d) => xScale(d.month))
      .y0(0)
      .y1((d) => yScaleEnd(d.end))
      .curve(curveBasis)(data),
  );

  // * useEffect to update area paths
  React.useEffect(() => {
    setUpperAreaPath(
      area()
        .x((d) => xScale(d.month))
        .y0(height / 2)
        .y1((d) => yScaleStart(d.start))
        .curve(curveBasis)(data),
    );
    setLowerAreaPath(
      area()
        .x((d) => xScale(d.month))
        .y0(0)
        .y1((d) => yScaleEnd(d.end))
        .curve(curveBasis)(data),
    );
  }, [data]);

  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      {/* the text needed is given as the following */}
      <text
        style={{ textAnchor: "end", fontSize: "15px" }}
        transform={`translate(${width}, ${20})rotate(0)`}
      >
        {"Start"}
      </text>
      <text
        style={{ textAnchor: "end", fontSize: "15px" }}
        transform={`translate(${(width * 2) / 3}, ${-10})rotate(0)`}
      >
        {"Num. of riders over the year"}
      </text>
      <g transform={`translate(${offsetX}, ${offsetY + height / 2})`}>
        <text
          style={{ textAnchor: "end", fontSize: "15px" }}
          transform={`translate(${width}, ${height / 2 - 20})rotate(0)`}
        >
          {"End"}
        </text>
      </g>
      {/* start your code here */}
      {/* Ridders start from a station */}
      <g>
        {/* xAxis */}
        <line x1={0} x2={width} y1={height / 2} y2={height / 2} stroke={"black"} />
        {/* yAxisStart */}
        <line y2={height / 2} stroke={"black"} />
        {yScaleStart.ticks(numTicksYAxis).map((tickVal) => (
          <g key={tickVal} transform={`translate(-10, ${yScaleStart(tickVal)})`}>
            <line x2={10} stroke={"black"} />
            <text style={{ textAnchor: "end", fontSize: "0.5rem" }}>{tickVal}</text>
          </g>
        ))}
        {/* upperArea */}
        <path d={upperAreaPath} fill={"lightgreen"} stroke={"black"} />
      </g>

      {/* Ridders end into a station */}
      <g transform={`translate(${0}, ${height / 2})`}>
        {/* yAxisEnd */}
        <line y2={height / 2} stroke={"black"} />
        {yScaleEnd.ticks(numTicksYAxis).map((tickVal) => (
          <g key={tickVal} transform={`translate(-10, ${yScaleEnd(tickVal)})`}>
            <line x2={10} stroke={"black"} />
            <text style={{ textAnchor: "end", fontSize: "0.5rem" }}>{tickVal}</text>
          </g>
        ))}
        {/* lowerArea */}
        <path d={lowerAreaPath} fill={"pink"} stroke={"black"} />
      </g>
      <g>
        {MONTH.map((xLabel) => (
          <g key={xLabel} transform={`translate(${xScale(xLabel)}, ${height + 20})`}>
            <line y1={-15} y2={-20} stroke={"black"} />
            <text style={{ textAnchor: "middle", fontSize: "0.8rem" }}>
              {xLabel}
            </text>
          </g>
        ))}
      </g>
    </g>
  );
}

export { SymmetricAreaChart, SymmetricBarChart };
