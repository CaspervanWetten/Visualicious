import { data, focusArea, startDateText, endDateText, crimeCodeList, regionData } from "./index.js";
import { eventEmitter } from "./event-emitter.js";

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

function frequentieMisdaden(data) {
  console.log(regionData)
  const margin = { top: 30, right: 20, bottom: 50, left: 20 };
  const width = 600 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const svg = d3
    .select("#frequentieMisdaden")
    .append("svg")
    .attr("viewBox", `0 0 600 300`)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .style("font", "40px times")
    .call(responsivefy)
    .attr("id", "frequentieMisdaden-svg");

  if (crimeCodeList.includes("0.0.0")){
    svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -19)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("The relative frequency of the 6 most common crimes between ");

  } else {
    svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -19)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("The relative frequency of the selected crimes between ");

  }


  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -5)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text(startDateText + " and " + endDateText + " in " + focusArea);

  const root = d3.hierarchy({ children: data }).sum((d) => d.Total);

  // Create a treemap layout
  const treemap = d3.treemap().size([width, height]);

  // Apply the treemap layout to the data
  treemap(root);

  // Create a group for each leaf node
  const cells = svg
    .selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .style("font-size", "12px")
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

  // Create rectangles for each leaf node
  cells
    .append("rect")
    .attr("width", 0) // Initialize width to 0
    .attr("height", (d) => d.y1 - d.y0)
    .attr("fill", "black")
    .attr("stroke", "white") // Add white border
    .attr("stroke-width", 2) // Adjust border width as needed
    .transition() // Apply a transition
    .duration(1000) // Set the duration of the animation (in milliseconds)
    .attr("width", (d) => d.x1 - d.x0); // Update width during the transition

  cells
    .on("mouseover", function (d) {
      // Change color on hover
      d3.select(this)
        .select("rect")
        .transition()
        .duration(150)
        .attr("fill", "orange");
      const tooltip = d3.select("#tooltip");
      tooltip.transition().duration(150).style("opacity", 0.9);
      const tooltipContent = `Aantal: ${d.srcElement.__data__.data.Total}`;
      let tooltipX = d.pageX + 10;
      const tooltipY = d.pageY - 28;
      const tooltipWidth = tooltip.node().offsetWidth;
      const rightBoundary = window.innerWidth - 5;
      if (tooltipX + tooltipWidth > rightBoundary) {
        tooltipX = rightBoundary - tooltipWidth;
      }
      tooltip
        .html(tooltipContent)
        .style("left", tooltipX + "px")
        .style("top", tooltipY + "px");
    })
    .on("mousemove", function (d) {
      const tooltip = d3.select("#tooltip");
      tooltip.transition().duration(150).style("opacity", 0.9);
      const tooltipContent = `Aantal ${d.srcElement.__data__.data.SoortMisdrijfRaw}: ${d.srcElement.__data__.data.Total}`;
      let tooltipX = d.pageX + 10;
      const tooltipY = d.pageY - 28;
      const tooltipWidth = tooltip.node().offsetWidth;
      const rightBoundary = window.innerWidth - 5;
      if (tooltipX + tooltipWidth > rightBoundary) {
        tooltipX = rightBoundary - tooltipWidth;
      }
      tooltip
        .html(tooltipContent)
        .style("left", tooltipX + "px")
        .style("top", tooltipY + "px");
    })
    .on("mouseout", function () {
      // Reset color on mouseout
      d3.select(this)
        .select("rect")
        .transition()
        .duration(150)
        .attr("fill", "black");

      const tooltip = d3.select("#tooltip");
      tooltip.transition().duration(500).style("opacity", 0);
    });

  const foreignObjects = cells
    .append("foreignObject")
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0);

  // Add a div inside foreignObject to contain the text
  foreignObjects
    .append("xhtml:div")
    .style("width", "100%")
    .style("height", "100%")
    .style("display", "flex")
    .style("align-items", "center")
    .style("justify-content", "center")
    .html(
      (d) =>
        `<div style="color: white; margin-left: 10px; margin-right: 10px;">${d.data.SoortMisdrijfRaw}</div>`
    );

    foreignObjects
    .on("mouseover", function (d) {
      console.log(d.srcElement.__data__)
      const tooltip = d3.select("#tooltip");
      tooltip.transition().duration(150).style("opacity", 0.9);
      const tooltipContent = `Aantal ${d.srcElement.__data__.data.SoortMisdrijfRaw}: ${d.srcElement.__data__.data.Total}`;
      let tooltipX = d.pageX + 10;
      const tooltipY = d.pageY - 28;
      const tooltipWidth = tooltip.node().offsetWidth;
      const rightBoundary = window.innerWidth - 5;
      if (tooltipX + tooltipWidth > rightBoundary) {
        tooltipX = rightBoundary - tooltipWidth;
      }
      tooltip
        .html(tooltipContent)
        .style("left", tooltipX + "px")
        .style("top", tooltipY + "px");
    })
    .on("mousemove", function (d) {
      const tooltip = d3.select("#tooltip");
      tooltip.transition().duration(150).style("opacity", 0.9);
      const tooltipContent = `Aantal ${d.srcElement.__data__.data.SoortMisdrijfRaw}: ${d.srcElement.__data__.data.Total}`;
      let tooltipX = d.pageX + 10;
      const tooltipY = d.pageY - 28;
      const tooltipWidth = tooltip.node().offsetWidth;
      const rightBoundary = window.innerWidth - 5;
      if (tooltipX + tooltipWidth > rightBoundary) {
        tooltipX = rightBoundary - tooltipWidth;
      }
      tooltip
        .html(tooltipContent)
        .style("left", tooltipX + "px")
        .style("top", tooltipY + "px");
    })
    .on("mouseout", function () {
      const tooltip = d3.select("#tooltip");
      tooltip.transition().duration(500).style("opacity", 0);
    });
}

function calculateCrimesByType(data) {
  const result = [];
  const groupedByCrime = {};
  for (const key in data) {
    const crimeType = data[key].SoortMisdrijfRaw;
    const totalCrimes = parseFloat(data[key].GeregistreerdeMisdrijven);
    if (!groupedByCrime[crimeType]) {
      groupedByCrime[crimeType] = 0;
    }
    groupedByCrime[crimeType] += totalCrimes;
  }
  for (const crimeType in groupedByCrime) {
    result.push({
      SoortMisdrijfRaw: crimeType,
      Total: groupedByCrime[crimeType],
    });
  }
  result.sort((a,b) => b.Total - a.Total)
  return result.slice(0,6);
}

function removePreviousGraph() {
  // Select the container and remove its content
  const container = d3.select("#frequentieMisdaden-svg");
  if (container.node()) {
    // If the container exists, remove its content
    container.node().parentNode.remove();
  }
}

// frequentieMisdaden(calculateCrimesByType(data));

// Every time there's an update, remove the previous graph and load the page
eventEmitter.on("updated", () => {
  removePreviousGraph();
  frequentieMisdaden(calculateCrimesByType(data));
});
