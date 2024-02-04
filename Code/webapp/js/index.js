import { fetchDataAndMapData } from './data-fetch.js';
import { eventEmitter } from './event-emitter.js';
import { resetMapView, removeIcons } from './latest-map-chart.js';

function resetFilters() {
  resetMapView();
  focusArea = "Nederland";
  crimeCodeList = ['0.0.0'];
  startDate = "2012MM01";
  startDateText = "January 2012";
  endDate = "2023MM12";
  endDateText = "December 2023";

  update();
}

d3.select("#resetButton").on("click", resetFilters);

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
  // Fetch new data
  fetchDataAndMapData(startDate, endDate, focusArea, crimeCodeList, wait);
  // Update the UI displayed filters
  updateFilters();
  removeIcons();
  eventEmitter.emit('update');
}

// Global variables and settings
export var isLoading = false; // Change this based on your logic
export function setLoading(bool) {
  isLoading = bool;
  toggleLoader();

  console.log("Is loading: " + isLoading);
}

// Set the data dictionary
let firstLoad = true
export var data = {}; // Change this based on your logic
export var regionData = {};
export function setData(newData, newRegionData) {
  data = newData;
  regionData = newRegionData
  console.log("New data loaded");
  eventEmitter.emit('update')
  
}

export var mapData = {}; // Change this based on your logic
export function setMapData(newData) {
  mapData = newData;
  console.log("New map data loaded");
  eventEmitter.emit('map data updated');
}

// Set the crime types
export var crimeCodeList = ['0.0.0'];
export function setCrimeCodeList(list) {
  crimeCodeList = list;
  update();
}

export var hoverArea = "";
export var focusArea = "Nederland";
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
  if (focusArea !== "Nederland") {
    focusAreaDiv.append("span")
        .attr("class", "close-icon")
        .html(" &#10006;")
        .on("click", function() {
          focusArea = "Nederland";
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
