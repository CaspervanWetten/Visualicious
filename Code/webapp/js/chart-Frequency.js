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

function createAreaChart(data) {
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  // SVG element
  const svg = d3
    .select("#square-area-chart")
    .append("svg")
    .attr("viewBox", `0 0 600 300`)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .call(responsivefy);

  // title
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .attr("fill", "black")
    .text("Meest voorkomende misdaden");

  const root = d3.hierarchy({ children: data }).sum((d) => d.aantal);
  const treemap = d3.treemap().size([width, height]).padding(1).round(true);
  treemap(root);

  // Create treemap cells
  const cells = svg
    .selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`);


  cells
    .append("rect")
    .attr("width", 0)
    .attr("height", 0)
    .transition()
    .duration(1500) // Duration of the rectangle growth effect
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("fill", "black");

  cells
    .append("text")
    .attr("x", 5)
    .attr("y", 15)
    .attr("fill", "white")
    .text((d) => d.data.misdrijf)
    .on("mousemove", function (event, d) {
        const cell = d3.select(this);
        const tooltip = d3.select("#tooltip");
  
        // Outline the hovered cell
        cell.transition().duration(150).attr("stroke", "white").attr("stroke-width", 5);
  
        // Fancy animation for the tooltip
        tooltip.transition().duration(150).style("opacity", 0.9);
  
        // Tooltip content
        const tooltipContent = `Hoeveelheid ${d.data.misdrijf}: \n${d.data.aantal}`;
  
        // Position the tooltip
        tooltip
          .html(tooltipContent)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        const cell = d3.select(this);
        const tooltip = d3.select("#tooltip");
  
        // Remove outline from the cell
        cell.transition().duration(200).attr("stroke", "none");
  
        // Fade out the tooltip
        tooltip.transition().duration(500).style("opacity", 0);
      });
}

const data2 = [
  { misdrijf: "Diefstal", aantal: 20 },
  { misdrijf: "Inbraak", aantal: 30 },
  { misdrijf: "Vandalisme", aantal: 15 },
  { misdrijf: "Fraude", aantal: 25 },
  { misdrijf: "Geweld", aantal: 18 },
  { misdrijf: "Drugsbezit", aantal: 12 },
  { misdrijf: "Verkeersovertreding", aantal: 28 },
  { misdrijf: "Stalking", aantal: 22 },
  { misdrijf: "Cybercriminaliteit", aantal: 17 },
  { misdrijf: "Moord", aantal: 35 },
];

createAreaChart(data2);
