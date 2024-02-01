import { data } from "./index.js";
import {eventEmitter} from "./event-emitter.js";

function responsivefy(svg) {
  // get container + svg aspect ratio
  var container = d3.select(svg.node().parentNode),
    width = parseInt(svg.style("width")),
    height = parseInt(svg.style("height")),
    aspect = width / height;

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("perserveAspectRatio", "xMinYMid")
    .call(resize);

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on("resize." + container.attr("id"), resize);

  // get width of container and resize svg to fit it
  function resize() {
    var targetWidth = parseInt(container.style("width"));
    svg.attr("width", targetWidth);
    svg.attr("height", Math.round(targetWidth / aspect));
  }
}

function functieTotaalMisdrijvenUtrecht(data) {
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const svg = d3
    .select("#totaalMisdrijvenUtrecht")
    .append("svg")
    .attr("viewBox", `0 0 600 300`)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .style("font", "40px times")
    .call(responsivefy);

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Totale hoeveelheid misdrijven in Utrecht");

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.Perioden))
    .range([0, width])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => +d.aantal)])
    .nice()
    .range([height, 0]);

  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));

  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.Perioden))
    .attr("width", x.bandwidth())
    .attr("y", height) // Start from the bottom
    .attr("height", 0) // Initially have zero height
    .transition()
    .duration(1000)
    .attr("y", (d) => y(+d.aantal))
    .attr("height", (d) => height - y(+d.aantal)) // Calculate height based on the data
    .on("end", function () {
      d3.select(this)
        .on("mouseover", function (event, d) {
          const bar = d3.select(this);
          const tooltip = d3.select("#tooltip");
          // Outline the hovered bar
          bar
            .transition()
            .duration(150)
            .attr("stroke", "white")
            .attr("stroke-width", 5);

          // Fancy animation for the tooltip
          tooltip.transition().duration(150).style("opacity", 0.9);

          // Tooltip content
          const tooltipContent = `Totaal aantal misdaden: \n${d["aantal"]}`;

          // Position the tooltip
          tooltip
            .html(tooltipContent)
            .style("left", event.pageX + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mousemove", function (event, d) {
          const bar = d3.select(this);
          const tooltip = d3.select("#tooltip");

          // Outline the hovered bar
          bar
            .transition()
            .duration(150)
            .attr("stroke", "white")
            .attr("stroke-width", 5);

          // Fancy animation for the tooltip
          tooltip.transition().duration(150).style("opacity", 0.9);

          // Tooltip content
          const tooltipContent = `Totaal aantal misdrijven: \n${d["aantal"]}`;

          // Position the tooltip
          tooltip
            .html(tooltipContent)
            .style("left", event.pageX + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", function () {
          const bar = d3.select(this);
          const tooltip = d3.select("#tooltip");

          // Remove outline from the bar
          bar.transition().duration(200).attr("stroke", "none");

          // Fade out the tooltip
          tooltip.transition().duration(500).style("opacity", 0);
        });
    });
}

function removePreviousGraph() {
  // Select the container and remove its content
  d3.select("#totaalMisdrijvenUtrecht").html("");
}

// On the first load, load the graph
eventEmitter.on('firstLoad', () => {
  console.log("first Load")
  // functieTotaalMisdrijvenUtrecht(data)
});


// Every time there's an update, remove the previous graph and load the page
eventEmitter.on('update', () => {
  console.log("Updated")
  // console.log(data)
  removePreviousGraph()
  // functieTotaalMisdrijvenUtrecht(data)
});
