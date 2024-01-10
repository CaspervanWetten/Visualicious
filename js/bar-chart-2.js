function barChart2(data) {
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // SVG element
  const svg = d3
    .select("#bar-chart-2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // X and Y scales
  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.periode))
    .range([0, width])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => +d.aantal)])
    .nice()
    .range([height, 0]);

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis)
    .append("text")
    .attr("x", width / 2)
    .attr("y", margin.bottom - 10)
    .attr("fill", "#000")
    .attr("text-anchor", "middle")
    .text("Tijdsperiode");

  // Append y-axis to SVG and add label
  svg
    .append("g")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -25)
    .attr("x", -(height / 2))
    .attr("dy", "-1em")
    .attr("fill", "#000")
    .attr("text-anchor", "middle")
    .text("Aantal misdrijven");

  svg.append("g").attr("transform", `translate(0,${height})`).call(xAxis);
  svg.append("g").call(yAxis);

  // Create bars
  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => x(d.periode))
    .attr("width", x.bandwidth())
    .attr("y", (d) => y(+d.aantal))
    .attr("height", (d) => height - y(+d.aantal))
    .attr("fill", "steelblue");
}

d3.csv("scraper/test.csv").then((data) => {
  barChart2(data);
});
