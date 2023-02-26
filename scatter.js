/** @format */

export const drawPoints = (
  scatterPlotLayer,
  data,
  xScale,
  yScale,
  div,
  scatterPlotWidth,
  scatterPlotHeight,
) => {
  const scatterLayer = scatterPlotLayer.append("g");

  scatterLayer
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", "5")
    .style("stroke", "black")
    .style("fill", "steelblue")
    .style("stroke-width", "2")
    .attr("id", (item) => item.station.replace(/[^a-zA-Z]/g, ""))
    .attr("cx", (item) => `${xScale(item.tripdurationS)}`)
    .attr("cy", (item) => `${yScale(item.tripdurationE)}`)
    .on("mouseover", function (evt, item) {
      const stationId = d3.select(this).node().id;
      d3.selectAll(`#${stationId}`).raise();
      d3.selectAll(`#${stationId}`).transition().duration(200).attr("r", "10").style("fill", "red");
      div
        .style("left", `${evt.x}px`)
        .style("top", `${evt.y}px`)
        .style("opacity", 0.9)
        .html(`<p>${item.station}</p>`);
    })
    .on("mouseout", function () {
      const stationId = d3.select(this).node().id;
      d3.selectAll(`#${stationId}`)
        .transition()
        .duration(200)
        .attr("r", "5")
        .style("fill", "steelblue");
      div.style("opacity", 0).style("left", "0px").style("top", "0px").html();
    });
};
