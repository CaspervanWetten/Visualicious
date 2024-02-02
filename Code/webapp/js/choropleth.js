import { eventEmitter } from './event-emitter.js';
import { crimeCodeList } from './index.js';
import { municipalitiesGroup } from './map-chart2.js';

fetch('http://visualicious.bjornkoemans.nl/crimes_theft.tsv')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text(); // or response.json() if it's JSON data
  })
  .then(data => {
    // Process your data here
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });


// Assume you have a global variable to store the current type of crime selected by the user
var currentCrimeType = "Bicycle Theft"; // Example crime type

// Load the processed crime data
d3.tsv("http://visualicious.bjornkoemans.nl/crimes_theft.tsv").then(function(crimeData) {
    // Example structure of crimeData: {'Amsterdam': {'Bicycle Theft': 120, 'Burglary': 50, ...}, ...}

    // Define a color scale for your crime data
    var colorScale = d3.scaleSequential()
        .domain([0, d3.max(Object.values(crimeData), d => d[currentCrimeType])])
        .interpolator(d3.interpolateReds);

    // When creating paths for municipalities, use the crime data to set the fill color
    municipalitiesGroup.selectAll("path")
        .data(municipalities.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", function(d) {
            var municipalityName = d.properties.WijkenEnBuurtenRaw; // Adjust based on your GeoJSON structure
            var crimeCount = crimeData[municipalityName] ? crimeData[municipalityName][currentCrimeType] : 0;
            return colorScale(crimeCount);
        })
        .attr("stroke", "#FFFFFF")
        .attr("stroke-width", 0.3);

    // Update the color scale and map fill whenever the user selects a different type of crime
    function updateChoropleth(crimeType) {
        currentCrimeType = crimeType;
        var maxCrimeCount = d3.max(Object.values(crimeData), d => d[currentCrimeType]);
        colorScale.domain([0, maxCrimeCount]);

        municipalitiesGroup.selectAll("path")
            .transition()
            .duration(500)
            .attr("fill", function(d) {
                var municipalityName = d.properties.WijkenEnBuurtenRaw;
                var crimeCount = crimeData[municipalityName] ? crimeData[municipalityName][currentCrimeType] : 0;
                return colorScale(crimeCount);
            });
    }

    // Example usage: updating the map based on a new crime type selected by the user
    // updateChoropleth("Burglary");
});

// Assume crimeData is your fetched or preloaded crime data structured by municipality and crime type
let crimeData = {}; // Placeholder for actual crime data loading logic

// Adjust the function to accept municipalities data as well
export function updateChoroplethForSelectedCrimes(municipalitiesGroup, municipalities) {
    const selectedCrimeData = {};

    // Filter the crime data based on selected crime codes in crimeCodeList
    for (let municipality in crimeData) {
        selectedCrimeData[municipality] = crimeData[municipality].filter(crime => crimeCodeList.includes(crime.code));
    }

    // Recalculate color scale based on the filtered data...
    // Assume you do the necessary aggregation here

    // Ensure municipalities data is used to update the map's municipality colors
    municipalitiesGroup.selectAll("path")
        .data(municipalities.features) // Use municipalities data passed as an argument
        .join("path")
        .attr("fill", d => {
            const crimeStats = selectedCrimeData[d.properties.WijkenEnBuurtenRaw];
            return crimeStats ? colorScale(crimeStats.value) : "#ccc"; // Example, adjust according to your data structure
        });
}

// Listen for updates to the crime type selection and update the choropleth accordingly
eventEmitter.on('update', updateChoroplethForSelectedCrimes);