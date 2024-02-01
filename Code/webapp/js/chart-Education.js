const width = 500,
  height = 500,
  start = 0,
  end = 2.25,
  numSpirals = 4;

const theta = function (r) {
  return numSpirals * Math.PI * r;
};

const r = d3.min([width, height]) / 2 - 40;
const radius = d3.scaleLinear().domain([start, end]).range([40, r]);

const svg = d3
  .select("#spiral-chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create the spiral, borrowed from http://bl.ocks.org/syntagmatic/3543186
const points = d3.range(start, end + 0.001, (end - start) / 1000);

const spiral = d3
  .radialLine()
  .curve(d3.curveCardinal)
  .angle(theta)
  .radius(radius);

const path = svg
  .append("path")
  .datum(points)
  .attr("id", "spiral")
  .attr("d", spiral)
  .style("fill", "none")
  .style("stroke", "steelblue");

// Parse CSV data
const csvData = `ID,WijkenEnBuurten,OpleidingsniveauLaag_64,OpleidingsniveauMiddelbaar_65,OpleidingsniveauHoog_66,OpleidingsniveauLaag,OpleidingsniveauMiddelbaar,OpleidingsniveauHoog
0,NL00      , 3565510, 5520240, 4215660,26.8,31.7,41.5
1,GM1680    ,    4300,    8860,    5970,22.5,31.2,46.3
77,GM0358    ,    6690,   10430,    6820,27.9,28.5,43.6
90,GM0197    ,    5840,    9900,    4380,29.0,21.8,49.2
124,GM0059    ,    7190,   10170,    3350,34.7,16.2,49.1
152,GM0482    ,    4450,    6730,    3150,31.1,22.0,47.0
188,GM0613    ,    4640,    8430,    6320,23.9,32.6,43.5
222,GM0361    ,   21710,   35760,   26620,25.8,31.7,42.5
300,GM0141    ,   18510,   24710,   12040,33.5,21.8,44.7
384,GM0034    ,   45730,   73890,   48380,27.2,28.8,44.0`;

const data = d3.csvParse(csvData);

// Stack the data
const stackedData = d3.stack().keys(["OpleidingsniveauLaag", "OpleidingsniveauMiddelbaar", "OpleidingsniveauHoog"])(data);

// Create groups for each stack
const stackGroup = svg
  .selectAll(".stack-group")
  .data(stackedData)
  .enter()
  .append("g")
  .attr("class", "stack-group")
  .style("fill", (d, i) => d3.schemeCategory10[i]);

// Add stacked bars to the chart
stackGroup
  .selectAll("rect")
  .data((d) => d)
  .enter()
  .append("rect")
  .attr("x", function (d, i) {
    const linePer = timeScale(d.date);
    const posOnLine = path.node().getPointAtLength(linePer);
    const angleOnLine = path.node().getPointAtLength(linePer - barWidth);

    d.linePer = linePer; // % distance on the spiral
    d.x = posOnLine.x; // x position on the spiral
    d.y = posOnLine.y; // y position on the spiral

    d.a = (Math.atan2(angleOnLine.y, angleOnLine.x) * 180) / Math.PI - 90; // angle at the spiral position

    return d.x;
  })
  .attr("y", function (d) {
    return d.y;
  })
  .attr("width", function (d) {
    return barWidth;
  })
  .attr("height", function (d) {
    return yScale(d.value);
  })
  .style("fill", (d, i) => d3.schemeCategory10[i])
  .style("stroke", "none")
  .attr("transform", function (d) {
    return "rotate(" + d.a + "," + d.x + "," + d.y + ")"; // rotate the bar
  });
