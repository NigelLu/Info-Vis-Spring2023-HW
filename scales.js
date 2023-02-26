/** @format */

export const Scales = {
  linear: (min_value, max_value, start_pos, end_pos) => {
    return d3.scaleLinear([min_value, max_value], [start_pos, end_pos]).nice();
  },
  band: (stations, start_pos, end_pos) => {
    return d3.scaleBand(stations, [start_pos, end_pos]);
  },
};
