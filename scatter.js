/** @format */

export const drawPoints = (
  scatterPlotLayer,
  data,
  xScale,
  yScale,
  div,
  scatterPlotWidth,
  scatterPlotHeight,
  margin,
) => {
  const scatterLayer = scatterPlotLayer.append("g");
  let scatterCover = scatterLayer
    .append("rect")
    .style("opacity", 0)
    .style("stroke-width", 0)
    .style("fill", "#fce703")
    .attr("id", "scatterCover")
    .attr("width", scatterPlotWidth)
    .attr("height", scatterPlotHeight - margin.bottom);

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
    .on("mouseenter", function (evt, item) {
      const stationId = d3.select(this).node().id;
      scatterCover.style("opacity", 0.75).raise();

      d3.selectAll(`#${stationId}`).raise();
      d3.selectAll(`#${stationId}`).transition().duration(200).attr("r", "10").style("fill", "red");
      div
        .style("left", `${evt.x}px`)
        .style("top", `${evt.y}px`)
        .style("opacity", 0.9)
        .html(`<p>${item.station}</p>`);
    })
    .on("mouseleave", function () {
      const stationId = d3.select(this).node().id;
      scatterCover.style("opacity", 0).lower();
      d3.selectAll(`#${stationId}`)
        .transition()
        .duration(200)
        .attr("r", "5")
        .style("fill", "steelblue");
      div.style("opacity", 0).style("left", "0px").style("top", "0px").html();
    });
};
