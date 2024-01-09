//test bar chart
const data = [10, 25, 5, 30, 15];

const svgWidth = 400;
const svgHeight = 200;

const barWidth = svgWidth / data.length;

const svg = d3.select("#bar-chart-container")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * barWidth)
    .attr("y", d => svgHeight - d)
    .attr("width", barWidth - 1)
    .attr("height", d => d)
    .attr("fill", "steelblue");
