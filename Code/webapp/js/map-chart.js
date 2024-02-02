import { focusArea, setFocusArea, hoverArea, setHoverArea, setMapSize, regionData} from "./index.js";

const tooltip = d3.select("#tooltip");

var width = 800, height = 600;

var svg = d3.select("#map-chart-container").append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

var projection = d3.geoMercator()
    .center([5.05, 53.0])
    .scale(8250)
    .translate([width / 2, height / 2]);

var path = d3.geoPath()
    .projection(projection);

var municipalitiesGroup = svg.append("g");
var municipalitiesDataCache = null;

// Placeholder for municipality data
// This needs to be replaced or filled with actual data
var municipalityData = [{ GemeenteRaw : "Almere", GeregistreerdeMisdrijvenRaw: 120, MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz."},
                        { GemeenteRaw : "Almere", GeregistreerdeMisdrijvenRaw: 150, MisdaadNaamRaw: "Diefstal/inbraak woning"},
                        { GemeenteRaw : "Almere", GeregistreerdeMisdrijvenRaw: 180, MisdaadNaamRaw: "Overval"},
                        { GemeenteRaw : "Almere", GeregistreerdeMisdrijvenRaw: 80, MisdaadNaamRaw: "Diefstal/inbraak box/garage/schuur"},
                        { GemeenteRaw : "Utrecht", GeregistreerdeMisdrijvenRaw: 110, MisdaadNaamRaw: "Straatroof"},
                        { GemeenteRaw : "Utrecht", GeregistreerdeMisdrijvenRaw: 90, MisdaadNaamRaw: "Overval"},
                        { GemeenteRaw : "Utrecht", GeregistreerdeMisdrijvenRaw: 60, MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz."},
                        { GemeenteRaw : "Amsterdam", GeregistreerdeMisdrijvenRaw: 200, MisdaadNaamRaw: "Overval"},
                        { GemeenteRaw : "Amsterdam", GeregistreerdeMisdrijvenRaw: 110, MisdaadNaamRaw: "Straatroof"},
                        { GemeenteRaw : "Amsterdam", GeregistreerdeMisdrijvenRaw: 150, MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz."},
                      ]

// var municipalityData = {"Amsterdam": 100, "Rotterdam": 200}

// var municipalityData = {
//   "Amsterdam": {
//       value: 100,
//       label: "Hundred"
//   },
//   "Rotterdam": {
//       value: 200,
//       label: "Hundred"
//   }
// }

// Color scale setup
var colorScale = d3.scaleSequential()
    .domain([0, d3.max(Object.values(municipalityData))]) // Adjust the domain based on your data
    .interpolator(d3.interpolateBlues); // This can be changed to a different color scheme

svg.on("mousemove", function(event) {
    const [x, y] = d3.pointer(event, svg.node());
    tooltip.style("left", (x - 100) + "px").style("top", (y - 20) + "px");
});

var zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on("zoom", function(event) {
        municipalitiesGroup.attr("transform", event.transform);
    });

svg.call(zoom).on("dblclick.zoom", null);

async function loadDataAndRenderMap() {
    try {
        municipalitiesDataCache = municipalitiesDataCache || await d3.json("../../Data/newer_municipalities.geojson");

        municipalitiesGroup.selectAll("path")
            .data(municipalitiesDataCache.features)
            .enter().append("path")
            .attr("d", path)
            .attr("fill", d => {
              const municipalityName = d.properties.name; // Assuming the GeoJSON property name matches the data
              const dataEntry = municipalityData.find(entry => entry.GemeenteRaw === municipalityName);
              return dataEntry ? colorScale(dataEntry.GeregistreerdeMisdrijvenRaw) : "lime"; // Adjust the color scale as needed
          })      
            .attr("stroke", "#000000")
            .attr("stroke-width", 0.3)
            .style("cursor", "pointer")
            .on("click", function(event, d) {
                setFocusArea(d.properties.name);
            })
            .on("mouseover", function(event, d) {
              const municipalityName = d.properties.name;
              const dataEntry = municipalityData[municipalityName];
              if (dataEntry) {
                  tooltip.transition()
                         .duration(200)
                         .style("opacity", .9);
                  tooltip.html(`${municipalityName}: ${dataEntry.label}`)
                         .style("left", (event.pageX) + "px")
                         .style("top", (event.pageY - 28) + "px");
              }})
            .on("mouseout", function() {
                tooltip.transition()
                       .duration(500)
                       .style("opacity", 0);
            })
            .append("title")
            .text(d => d.properties.name);
    } catch (error) {
        console.error("Failed to load data or render map:", error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadDataAndRenderMap(); // Load and render the map
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

    municipalitiesGroup.selectAll("path")
        .data(municipalitiesDataCache.features)
        .join("path")
        .attr("d", path)
        .attr("fill", d => colorScale(municipalityData[d.properties.name] || 0)) // Reapply color scale for choropleth
        .attr("stroke", "#000000")
        .attr("stroke-width", 0.3)
        .style("cursor", "pointer");
}

d3.select("#resetButton").on("click", resetMapView);
d3.select("#sizeToggleButton").on("click", makeMapBiggerIfNeeded);

// Additional functionality to toggle choropleth visualization
d3.select("#choroplethButton").on("click", function() {
    // Assuming municipalityData is loaded and contains the values for the choropleth
    municipalitiesGroup.selectAll("path")
        .transition() // Optional: add a transition for smoother update
        .attr("fill", d => colorScale(municipalityData[d.properties.name] || 0));
});

function makeMapBiggerIfNeeded() {
    if (!hoverArea) {
        setMapSize(true);
    }
}

export { municipalitiesGroup };
