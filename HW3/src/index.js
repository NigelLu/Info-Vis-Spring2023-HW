/** @format */

import { csv } from "d3";
import ReactDOM from "react-dom";
import { Tooltip } from "./tooltip";
import { BarChart } from "./barchart";
import React, { useState } from "react";
import { ScatterPlot } from "./scatterplot";
import "bootstrap/dist/css/bootstrap.min.css"; //import bootstrap

//url
const csvUrl =
  "https://gist.githubusercontent.com/hogwild/3b9aa737bde61dcb4dfa60cde8046e04/raw/citibike2020.csv";
//function for loading the data
function useData(csvPath) {
  const [dataAll, setData] = React.useState(null);
  React.useEffect(() => {
    csv(csvPath).then((data) => {
      data.forEach((d) => {
        d.start = +d.start;
        d.tripdurationS = +d.tripdurationS;
        d.end = +d.end;
        d.tripdurationE = +d.tripdurationE;
      });
      setData(data);
    });
  }, []);
  return dataAll;
}
// the Chart component
function Charts() {
  const [month, setMonth] = React.useState("4");
  // * add a new state to monitor selected station
  const [selectedStation, setSelectedStation] = useState(null);
  const SVG_WIDTH = 500;
  const SVG_HEIGHT = 400;
  const margin = { left: 50, right: 30, top: 30, bottom: 80 }; //you can modify the values if needed.
  const width = SVG_WIDTH - margin.left - margin.right;
  const height = SVG_HEIGHT - margin.top - margin.bottom;
  //the handler of the slider bar
  const changeHandler = (event) => {
    setMonth(event.target.value);
  };
  //loading the whole data set
  const dataAll = useData(csvUrl);
  if (!dataAll) {
    return <pre>Loading...</pre>;
  }

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
  //get the monthly data
  const data = dataAll.filter((d) => {
    return d.month === MONTH[month];
  });

  // * scatterplot props
  const scatterplotProps = {
    data,
    width,
    height,
    selectedStation,
    setSelectedStation,
    offsetX: margin.left,
    offsetY: margin.right,
  };

  // * barchart props
  const barchartProps = {
    ...scatterplotProps,
  };

  return (
    <div>
      <div>
        <input
          key='slider'
          type='range'
          min='0'
          max='11'
          value={month}
          step='1'
          onChange={changeHandler}
        />
        <input key='monthText' type='text' value={MONTH[month]} readOnly />
      </div>
      <div className='row'>
        <div className='col-lg-6'>
          <svg width={"100%"} viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}>
            <ScatterPlot {...scatterplotProps} />
          </svg>
        </div>
        <div className='col-lg-6'>
          <svg width={"100%"} viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}>
            <BarChart {...barchartProps} />
          </svg>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Charts />, rootElement);
