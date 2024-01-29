// Global variables and settings

export var focusArea = "NL";
export var hoverArea = "";

export var startDate = "2012MM01";
export var endDate = "2023MM12";

export var typeCrime = [];

export var educationFactor = false;
export var housingFactor = false;

export function setEducationFactor(bool) {
  educationFactor = bool;
}
export function setHousingFactor(bool) {
  housingFactor = bool;
}

export function setTypeCrimes(dict) {
  typeCrime = dict;
  console.log(typeCrime);
}

const selectedAreaText = d3.select("#selectedAreaText");
export function setFocusArea(newFocusArea) {
  focusArea = newFocusArea;
  selectedAreaText.html(focusArea);
}

export function setHoverArea(newHoverArea) {
  hoverArea = newHoverArea;
}

// INDEX JS

function barChart2(data) {
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // SVG element
  const svg = d3
    .select("#chart")
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


export function setMapSize(big) {

  var mapColumn = document.getElementById('mapColumn');
  var contentColumn = document.getElementById('contentColumn');

  if (big == true) {
    // Toggle between col-5 and col-3 for the map section
    mapColumn.classList.add('col-6');
    mapColumn.classList.remove('col-4');

    // Adjust the right content section accordingly
    contentColumn.classList.add('col-6');
    contentColumn.classList.remove('col-8');

    // setZoomLevel(7500);

  }
  else {
    // Toggle between col-5 and col-3 for the map section
    mapColumn.classList.remove('col-6');
    mapColumn.classList.add('col-4');

    // Adjust the right content section accordingly
    contentColumn.classList.remove('col-6');
    contentColumn.classList.add('col-8');

    // setZoomLevel(7500);
  }

}

// Set isLoading to true or false based on your condition
var isLoading = false; // Change this based on your logic

// Function to toggle the loader overlay
function toggleLoader() {
  var loaderOverlay = document.getElementById("loader-overlay");

  if (isLoading) {
    loaderOverlay.style.display = "flex"; // Show overlay
    document.body.style.overflow = "hidden"; // Disable scrolling on the page
  } else {
    loaderOverlay.style.display = "none"; // Hide overlay
    document.body.style.overflow = "auto"; // Enable scrolling on the page
  }
}

// Call the function to toggle the loader based on isLoading
toggleLoader();
