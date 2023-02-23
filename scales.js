/** @format */

export const Scales = {
  linear: (min_value, max_value, start_pos, end_pos) => {
    return d3.scaleLinear([min_value, max_value], [start_pos, end_pos]);
  },
  band: (stations, start_pos, end_pos) => {
    console.log("the x scale for the bar chart");
  },
};
