import {
    focusArea,
    setFocusArea,
    hoverArea,
    setHoverArea,
    setMapSize,
    mapData,
    data,
} from "./index.js";
import { eventEmitter } from "./event-emitter.js";

// Initialize zoom behavior
const zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on("zoom", function (event) {
        municipalitiesGroup.attr("transform", event.transform);
    });

// Select the container and append an SVG
const svg = d3.select("#map-chart-container")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");
svg.call(zoom).on("dblclick.zoom", null);

// Append a group element to the SVG
const municipalitiesGroup = svg.append("g");

// Ensure tooltip is properly selected and exists in the DOM
let tooltip = d3.select("#tooltip");
if (tooltip.empty()) {
    tooltip = d3.select("body").append("div")
        .attr("id", "tooltip")
        .style("position", "absolute")
        .style("text-align", "center")
        .style("width", "120px")
        .style("height", "28px")
        .style("padding", "2px")
        .style("font", "12px sans-serif")
        .style("background", "lightsteelblue")
        .style("border", "0px")
        .style("border-radius", "8px")
        .style("pointer-events", "none")
        .style("opacity", 0);
}

// Function to find the most frequent crime per municipality
function findMostFrequentCrime(data) {
    const result = {};
    data.forEach(entry => {
        try {
            const gemeente = entry["WijkenEnBuurten"] ? entry["WijkenEnBuurten"].trim() : '';
            const misdaadNaam = entry["SoortMisdrijf"] ? entry["SoortMisdrijf"].trim() : '';
            const misdrijven = parseInt(entry["GeregistreerdeMisdrijven"], 10) || 0;

            if (!gemeente || !misdaadNaam) {
                return;
            }

            if (!result[gemeente]) {
                result[gemeente] = { misdaad: misdaadNaam, totalMisdrijven: misdrijven };
            } else {
                if (result[gemeente].misdaad !== misdaadNaam) {
                    if (misdrijven > result[gemeente].totalMisdrijven) {
                        result[gemeente] = { misdaad: misdaadNaam, totalMisdrijven: misdrijven };
                    }
                } else {
                    result[gemeente].totalMisdrijven += misdrijven;
                }
            }
        } catch (error) {
            console.error("Error processing crime data", error);
        }
    });
    return result;
}

async function drawAndLoadMap() {
    const width = 800;
    const height = 600;

    // Define the color scale
    const colorScale = d3.scaleLinear()
        .domain([0, 10]) // Placeholder domain, adjust based on your data
        .range(["#ffffcc", "#800026"]);

    // Define the projection
    const projection = d3.geoMercator()
        .center([5.05, 53.0]) // Adjust the center based on your GeoJSON coordinates
        .scale(8250)
        .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    try {
        const municipalitiesDataCache = await d3.json("../../Data/newer_municipalities.geojson");

        municipalitiesGroup.selectAll("path")
            .data(municipalitiesDataCache.features)
            .enter().append("path")
            .attr("d", path)
            .attr("fill", function (d) {
                // Placeholder logic for assigning fill based on data
                // Replace with your actual logic to determine fill based on the municipality's data
                return colorScale(Math.random() * 10); // Example: random fill for demonstration
            })
            .attr("stroke", "black")
            .attr("stroke-width", 0.5)
            .on("mouseover", function(event, d) {
                tooltip.transition().duration(200).style("opacity", 0.9);
                tooltip.html(d.properties.name) // Adjust to display the information you want on hover
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition().duration(500).style("opacity", 0);
            });
    } catch (error) {
        console.error("Failed to load or draw map:", error);
    }
}

// Setup and event listeners remain unchanged
eventEmitter.on("map data updated", () => {
    drawAndLoadMap(mapData, svg, zoom, municipalitiesGroup);
});

d3.select("#sizeToggleButton").on("click", function() {
    // Implement the logic to toggle the map size
});

export async function resetMapView() {
    svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);
    setMapSize(true);
    setFocusArea("Nederland");
  if (!municipalitiesDataCache) {
        console.error("No municipalities data available for reset.");
        return;
      }
    
      municipalitiesGroup
        .selectAll("g")
        .data(municipalitiesDataCache.features)
        .enter()
        .append("g")
        .attr("class", "municipality-group")
        .on("click", function (event, d) {
          setFocusArea(d.properties.name);
        })
        .on("mouseover", function (event, d) {
          const tooltip = d3.select("#tooltip");
          const entry = aggregatedData.find(
            (entry) => entry["WijkenEnBuurtenRaw"] === d.properties.name
          );
          const value = entry ? entry["GeregistreerdeMisdrijven"] : 0;
          const y = event.pageY - 28;
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .html(d.properties.name + ": " + value + " misdaden")
            .style("left", event.pageX + "px")
            .style("top", y + "px");
        })
        .on("mouseout", function (d) {
          const tooltip = d3.select("#tooltip");
          tooltip.transition().duration(500).style("opacity", 0);
        })
        .each(function (d) {
          d3.select(this)
            .append("path")
            .attr("d", path)
            .attr("fill", function () {
              const entry = aggregatedData.find(
                (entry) => entry["WijkenEnBuurtenRaw"] === d.properties.name
              );
              const value = entry ? entry["GeregistreerdeMisdrijven"] : 0;
              return colorScale(value);
            })
            .attr("stroke", "#000000")
            .attr("stroke-width", 0.3)
            .style("cursor", "pointer")
            .append("title")
            .text((d) => d.properties.name);
        });
      svg.selectAll("image").remove();
    }
  
  function makeMapBiggerIfNeeded() {
    if (!hoverArea) {
        setMapSize(true);
    }
  }

drawAndLoadMap(); // Initial call to draw the map
