// Specify the chart’s dimensions.
const width = 640;
const height = 400;
const marginTop = 20;
const marginRight = 0;
const marginBottom = 30;
const marginLeft = 40;

// Bar chart itself
const svg = d3.select("#bar-chart-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const createBarChart = (data) => {
  // Declare the x (horizontal position) scale and the corresponding axis generator
  const x = d3.scaleBand()
    .domain(data.map(d => d.letter))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  const xAxis = d3.axisBottom(x).tickSizeOuter(0);

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.frequency)]).nice()
    .range([height - marginBottom, marginTop]);

  // Create a bar for each letter.
  const bar = svg.append("g")
    .attr("fill", "steelblue")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .style("mix-blend-mode", "multiply") // Darker color when bars overlap during the transition
    .attr("x", d => x(d.letter))
    .attr("y", d => y(d.frequency))
    .attr("height", d => y(0) - y(d.frequency))
    .attr("width", x.bandwidth());

  // Create the axes.
  const gx = svg.append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(xAxis);

  const gy = svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
    .call(g => g.select(".domain").remove());

  // Add labels to the x-axis and y-axis.
  gx.append("text")
    .attr("x", width - marginRight)
    .attr("y", marginBottom - 10)
    .attr("fill", "#000")
    .attr("text-anchor", "end")
    .text("Letters");

  gy.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -marginLeft + 10)
    .attr("x", -height / 2)
    .attr("dy", "0.71em")
    .attr("fill", "#000")
    .attr("text-anchor", "end")
    .text("Frequency");

  // Chart title
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", marginTop / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("Bar chart example");

  // Function to update the chart based on the selected order
  function updateChart(orderFunction) {
    data.sort(orderFunction); // Sort the data based on the order function
    x.domain(data.map(d => d.letter)); // Update the x-scale domain

    const t = svg.transition()
      .duration(750);

    bar.data(data, d => d.letter)
      .order()
      .transition(t)
      .delay((d, i) => i * 20)
      .attr("x", d => x(d.letter))
      .attr("y", d => y(d.frequency))
      .attr("height", d => y(0) - y(d.frequency))
      .attr("width", x.bandwidth());

    gx.transition(t)
      .call(xAxis)
      .selectAll(".tick")
      .delay((d, i) => i * 20);
  }

  // Add an event listener for changes in the dropdown selection
  document.getElementById("order-select").addEventListener("change", function () {
    const selectedValue = this.value; // Get the selected value

    // Update the chart based on the selected value
    if (selectedValue === "ascending-letter") {
      updateChart((a, b) => d3.ascending(a.letter, b.letter));
    } else if (selectedValue === "descending-letter") {
      updateChart((a, b) => d3.descending(a.letter, b.letter));
    } else if (selectedValue === "ascending-frequency") {
      updateChart((a, b) => d3.ascending(a.frequency, b.frequency));
    } else if (selectedValue === "descending-frequency") {
      updateChart((a, b) => d3.descending(a.frequency, b.frequency));
    }
  });

  // Initial chart rendering
  updateChart((a, b) => d3.ascending(a.letter, b.letter));

  // Return the SVG container directly
  return svg;
};

// Data example
const data = [
    { letter: "A", frequency: 0.08167 },
    { letter: "B", frequency: 0.01492 },
    { letter: "C", frequency: 0.02782 },
    { letter: "D", frequency: 0.04253 },
    { letter: "E", frequency: 0.12702 },
    { letter: "F", frequency: 0.02288 },
    { letter: "G", frequency: 0.02015 },
    { letter: "H", frequency: 0.06094 },
    { letter: "I", frequency: 0.06966 },
    { letter: "J", frequency: 0.00153 },
    { letter: "K", frequency: 0.00772 },
    { letter: "L", frequency: 0.04025 },
    { letter: "M", frequency: 0.02406 },
    { letter: "N", frequency: 0.06749 },
    { letter: "O", frequency: 0.07507 },
    { letter: "P", frequency: 0.01929 },
    { letter: "Q", frequency: 0.00095 },
    { letter: "R", frequency: 0.05987 },
    { letter: "S", frequency: 0.06327 },
    { letter: "T", frequency: 0.09056 },
    { letter: "U", frequency: 0.02758 },
    { letter: "V", frequency: 0.00978 },
    { letter: "W", frequency: 0.02360 },
    { letter: "X", frequency: 0.00150 },
    { letter: "Y", frequency: 0.01974 },
    { letter: "Z", frequency: 0.00074 }
  ];

const myBarChart = createBarChart(data);
