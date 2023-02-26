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
    .attr("y", (item) => `${yScale(item.start)}`)
    .attr("x", (item) => `${xScale(item.station)}`)
    .attr("id", (item) => item.station.replace(/[^a-zA-Z]/g, ""))
    .attr("width", (barChartWidth - margin.right - 40) / data.length)
    .attr("height", (item) => barChartHeight - yScale(item.start) - margin.bottom)
    .on("mouseover", function (evt, item) {
      const stationId = d3.select(this).node().id;
      const correspondingElements = d3.selectAll(`#${stationId}`);
      correspondingElements.transition().duration(200).style("fill", "red").attr("r", "10");
    })
    .on("mouseout", function () {
      const stationId = d3.select(this).node().id;
      const correspondingElements = d3.selectAll(`#${stationId}`);
      correspondingElements.transition().duration(200).style("fill", "steelblue").attr("r", "5");
    });
};
