/** @format */

export const drawBars = (
  barChartLayer,
  data,
  xScale,
  yScale,
  barChartWidth,
  barChartHeight,
  div,
  margin,
) => {
  const barLayer = barChartLayer.append("g");
  barLayer
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .style("stroke", "black")
    .style("fill", "steelblue")
    .style("stroke-width", "2")
    .attr("x", (item) => `${xScale(item.station)}`)
    .attr("y", (item) => `${yScale(item.start)}`)
    .attr("width", (barChartWidth - margin.right - 40) / data.length)
    .attr("height", (item) => barChartHeight - yScale(item.start) - margin.bottom)
    .on("mouseover", function (evt, item) {
      d3.select(this).transition().duration(200).style("fill", "red");
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).style("fill", "steelblue");
    });
};
