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

// function barChart2(data) {
//   const margin = { top: 20, right: 20, bottom: 50, left: 50 };
//   const width = 600 - margin.left - margin.right;
//   const height = 300 - margin.top - margin.bottom;

//   // SVG element
//   const svg = d3
//     .select("#bar-chart-2")
//     .append("svg")
//     .attr("viewBox", `0 0 600 300`)
//     .append("g")
//     .attr("transform", `translate(${margin.left},${margin.top})`)
//     .call(responsivefy);

//   // Title
//   svg
//     .append("text")
//     .attr("x", width / 2)
//     .attr("y", 15)
//     .attr("text-anchor", "middle")
//     .style("font-size", "16px")
//     .style("font-weight", "bold")
//     .text("Huizen-prijsindex for the last 6 months");

//   // X and Y scales
//   const x = d3
//     .scaleBand()
//     .domain(data.map((d) => d.Periode))
//     .range([0, width])
//     .padding(0.1);

//   const y = d3
//     .scaleLinear()
//     .domain([0, d3.max(data, (d) => +d["Prijsindex ((2015=100))"])])
//     .nice()
//     .range([height, 0]);

//   const xAxis = d3.axisBottom(x);
//   const yAxis = d3.axisLeft(y);

//   svg
//     .append("g")
//     .attr("transform", `translate(0,${height})`)
//     .call(xAxis)
//     .append("text")
//     .attr("x", width / 2)
//     .attr("y", margin.bottom - 10)
//     .attr("fill", "#000")
//     .attr("text-anchor", "middle")
//     .text("Tijdsperiode");

//   // Append y-axis to SVG and add label
//   svg
//     .append("g")
//     .call(yAxis)
//     .append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", -25)
//     .attr("x", -(height / 2))
//     .attr("dy", "-1em")
//     .attr("fill", "#000")
//     .attr("text-anchor", "middle")
//     .text("Huizen-prijsindex");

//   svg.append("g").attr("transform", `translate(0,${height})`).call(xAxis);
//   svg.append("g").call(yAxis);

//   // Create bars
//   svg
//     .selectAll(".bar")
//     .data(data)
//     .enter()
//     .append("rect")
//     .attr("class", "bar")
//     .attr("x", (d) => x(d.Periode))
//     .attr("width", x.bandwidth())
//     .attr("y", (d) => y(+d["Prijsindex ((2015=100))"]))
//     .attr("height", (d) => height - y(+d["Prijsindex ((2015=100))"]))
//     .on("mouseover", function (event, d) {
//       const tooltip = d3.select("#tooltip");
//       tooltip.transition().duration(200).style("opacity", 0.9);
//       tooltip
//         .html(`Prijsindex: ${d["Prijsindex ((2015=100))"]}`)
//         .style("left", event.pageX + "px")
//         .style("top", event.pageY - 28 + "px");
//     })
//     .on("mousemove", function (event, d) {
//       const bar = d3.select(this);
//       const tooltip = d3.select("#tooltip");

//       // Outline the hovered bar
//       bar
//         .transition()
//         .duration(200)
//         .attr("stroke", "white")
//         .attr("stroke-width", 5);

//       // Fancy animation for the tooltip
//       tooltip.transition().duration(200).style("opacity", 0.9);

//       // Tooltip content
//       const tooltipContent = `Prijsindex: ${d["Prijsindex ((2015=100))"]}`;

//       // Position the tooltip
//       tooltip
//         .html(tooltipContent)
//         .style("left", event.pageX + "px")
//         .style("top", event.pageY - 28 + "px");
//     })
//     .on("mouseout", function () {
//       const bar = d3.select(this);
//       const tooltip = d3.select("#tooltip");

//       // Remove outline from the bar
//       bar.transition().duration(200).attr("stroke", "none");

//       // Fade out the tooltip
//       tooltip.transition().duration(500).style("opacity", 0);
//     });
// }

function streamGraph(data) {
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // Create SVG container
  const svg = d3
    .select("#stream-graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Set up scales
  const x = d3
    .scaleLinear()
    .domain([0, data.length - 1])
    .range([0, width]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.aantal)])
    .range([height, 0]);

  // Generate stack data
  const stack = d3.stack().keys(data.columns.slice(1)); // Assuming your data has 'misdrijf' and 'aantal' columns
  const layers = stack(data);

  // Update the y scale domain based on the layers
  y.domain([0, d3.max(layers[layers.length - 1], (d) => d[1])]);

  // Update the area function
  const area = d3
    .area()
    .x((d, i) => x(i))
    .y0((d) => y(d[0]))
    .y1((d) => y(d[1]));

  // Append streamgraph layers
  svg
    .selectAll(".layer")
    .data(layers)
    .enter()
    .append("path")
    .attr("class", "layer")
    .attr("d", area)
    .style("fill", (_, i) => color(i));

  // Add x-axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  // Add y-axis
  svg.append("g").call(d3.axisLeft(y));

  // Add labels
  svg
    .append("g")
    .attr("transform", `translate(${width / 2},${height + margin.top + 10})`)
    .append("text")
    .attr("text-anchor", "middle")
    .text("Misdrijven zonder tijd");
}

// d3.csv("scraper/huizenprijzenupdated.csv").then((data) => {
//   const filteredData = data.filter((d) => d.regio === "Nieuwegein");

//   const bottomRows = data.slice(-6);
//   barChart2(bottomRows);
// });

const data3 = [
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

streamGraph(data3)