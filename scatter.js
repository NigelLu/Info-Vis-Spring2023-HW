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
  // div.style("position", "relative").style("width", "40px").style("height", "30px");
  const scatterLayer = scatterPlotLayer.append("g");

  scatterLayer
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", "5")
    .attr("cx", (item) => `${xScale(item.tripdurationS)}`)
    .attr("cy", (item) => `${yScale(item.tripdurationE)}`)
    .attr("style", "fill: steelblue; stroke: black; stroke-width: 2")
    .on("mouseover", function (evt, item) {
      d3.select(this).transition().duration(200).attr("r", "10").style("fill", "red");
      div
        .style("left", `${evt.x}px`)
        .style("top", `${evt.y}px`)
        .style("opacity", 0.9)
        .html(`<p>${item.station}</p>`);
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(200).attr("r", "5").style("fill", "steelblue");
      div.style("opacity", 0).style("left", "0px").style("top", "0px").html();
    });
};
