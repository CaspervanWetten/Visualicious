import { filterTSVData } from './data-fetch.js';
import { eventEmitter } from './event-emitter.js';
import { resetMapView } from './map-chart2.js';

// import { generateCheckboxes, updateCheckboxStates } from './type-crime.js';

const crimeDictionary = {
  "0.0.0": "Totaal misdrijven",
  "1.1.1": "Diefstal/inbraak woning",
  "1.1.2": "Diefstal/inbraak box/garage/schuur",
  "1.2.1": "Diefstal uit/vanaf motorvoertuigen",
  "1.2.2": "Diefstal van motorvoertuigen",
  "1.2.3": "Diefstal van brom-, snor-, fietsen",
  "1.2.4": "Zakkenrollerij",
  "1.2.5": "Diefstal af/uit/van ov. voertuigen",
  "1.4.6": "Straatroof",
  "1.4.7": "Overval",
  "1.5.2": "Diefstallen (water)",
  "2.5.1": "Diefstal/inbraak bedrijven enz.",
  "2.5.2": "Winkeldiefstal"
}


function update(wait = 200) {
  eventEmitter.emit('update');
  // Fetch new data
  filterTSVData(startDate, endDate, focusArea,crimeCodeList, wait);
  // Update the UI displayed filters
  updateFilters();
}

// Global variables and settings
export var isLoading = false; // Change this based on your logic
export function setLoading(bool) {
  isLoading = bool;
  toggleLoader();

  console.log(isLoading);
}

// Set the data dictionary
export var data = {}; // Change this based on your logic
export function setData(data) {
  data = data;
  console.log("New data loaded");
}

// Set the crime types
export var crimeCodeList = ['0.0.0'];
export function setCrimeCodeList(list) {
  crimeCodeList = list;
  update();
}

export var hoverArea = "";
export var focusArea = "NL";
export function setFocusArea(newFocusArea) {
  focusArea = newFocusArea;
  update(1000);
}

function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}


const updateDebounced = debounce(update, 750);

export var startDate = "2012MM01";
export var startDateText = "January 2012";
export function setStartDate(date, dateText) {
  startDate = date;
  startDateText = dateText;
  updateDebounced();
}
export var endDate = "2023MM12";
export var endDateText = "December 2023";
export function setEndDate(date, dateText) {
  endDate = date;
  endDateText = dateText;
  updateDebounced();
}

export var educationFactor = false;
export function setEducationFactor(bool) {
  educationFactor = bool;
  update();
}

export var housingFactor = false;
export function setHousingFactor(bool) {
  housingFactor = bool;
  update();
}

export function setHoverArea(newHoverArea) {
  hoverArea = newHoverArea;
}



export function updateFilters() {
  const selectedAreaText = d3.selectAll("#selectedAreaText");
  // Update the D3 element
  selectedAreaText.html(focusArea);

  const setFactors = d3.select("#setFactors");

  // Update the focus area text
  const focusAreaDiv = setFactors.selectAll("#selectedAreaText");
  focusAreaDiv.html(focusArea);

  // Append or remove close icon for focus area
  focusAreaDiv.select(".close-icon").remove();
  if (focusArea !== "NL") {
    focusAreaDiv.append("span")
        .attr("class", "close-icon")
        .html(" &#10006;")
        .on("click", function() {
          focusArea = "NL";
          update(1000);
          resetMapView();
        });
  }

  // Update the start date text
  const startDateDiv = setFactors.select("#selectedStartDateText");
  startDateDiv.html(startDateText);

  // Append or remove close icon for start date
  startDateDiv.select(".close-icon").remove();
  if (startDateText !== "January 2012") {
    startDateDiv.append("span")
        .attr("class", "close-icon")
        .html(" &#10006;")
        .on("click", function() {
          startDate = "2012MM01"
          startDateText = "January 2012";
          update();
        });
  }

  // Update the end date text
  const endDateDiv = setFactors.select("#selectedEndDateText");
  endDateDiv.html(endDateText);

  // Append or remove close icon for end date
  endDateDiv.select(".close-icon").remove();
  if (endDateText !== "December 2023") {
    endDateDiv.append("span")
        .attr("class", "close-icon")
        .html(" &#10006;")
        .on("click", function() {
          endDate = "2023MM12"
          endDateText = "December 2023";
          update();
        });
  }



  // Bind crimeCodeList to the divs
  const crimeDivs = setFactors.selectAll(".crimeCode")
      .data(crimeCodeList, function(d) { return d; });

  // Enter selection: Create new divs for new data items
  const newCrimeDivs = crimeDivs.enter().append("div")
      .attr("class", "bg-menu rounded p-1-2 mr-2 mt-1 crimeCode");

  newCrimeDivs.append("small")
      .attr("class", "text-bg-dark m-0 menu-bar-label")
      .html(function(d) { return `${crimeDictionary[d]}`; });

  // Update existing divs
  crimeDivs.select(".text-bg-dark")
      .html(function(d) { return `${crimeDictionary[d]}`; });

  // Manage close icons
  setFactors.selectAll(".crimeCode").each(function(d, i) {
    const div = d3.select(this);
    div.selectAll(".close-icon").remove();

    if (crimeCodeList.length > 1) {
      div.append("small")
          .attr("class", "close-icon")
          .html(" &#10006;")
          .on("click", function(event, d) {
            // Remove the clicked item from crimeCodeList
            const index = crimeCodeList.indexOf(d);
            if (index > -1) {
              crimeCodeList.splice(index, 1);
              update(); // Call updateFilters to reflect the change
            }
          });
    }
  });

  // Exit selection: Remove divs for which there is no data
  crimeDivs.exit().remove();


  // Handle the addition of the education levels div
  setFactors.selectAll(".education-div, .education-divider").remove(); // Remove existing div and divider
  if (educationFactor) {
    // Add vertical divider
    setFactors.append("div")
        .attr("class", "vertical-divider mr-2 mt-1 education-divider");

    // Add education levels div
    const educationDiv = setFactors.append("div")
        .attr("class", "bg-menu rounded p-1-2 mr-2 mt-1 education-div");

    educationDiv.append("small")
        .attr("class", "text-bg-dark m-0 menu-bar-label")
        .html("Education levels");

    educationDiv.append("small")
        .attr("class", "close-icon")
        .html(" &#10006;")
        .on("click", function() {
          educationFactor = false;
          update();
        });
  }
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


// Function to toggle the loader overlay
function toggleLoader() {
  let loaderOverlay = document.getElementById("loader-overlay");
  if (isLoading) {
    loaderOverlay.style.display = "flex"; // Show overlay
    document.body.style.overflow = "hidden"; // Disable scrolling on the page
    document.body.classList.add('no-interaction');
    document.addEventListener('keydown', preventInteraction, true);
  } else {
    loaderOverlay.style.display = "none"; // Hide overlay
    document.body.style.overflow = "auto"; // Enable scrolling on the page
    document.body.classList.remove('no-interaction');
    document.removeEventListener('keydown', preventInteraction, true);
  }
}

function preventInteraction(e) {
  e.preventDefault();
}

window.addEventListener('load', function() {
  updateFilters();
  // generateCheckboxes();
  // updateCheckboxStates();
});
