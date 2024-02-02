import { focusArea, setFocusArea, hoverArea, setHoverArea, setMapSize } from "./index.js";

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
            .attr("fill", "#6DD100")
            .attr("stroke", "#000000")
            .attr("stroke-width", 0.3)
            .style("cursor", "pointer")
            .on("click", function(event, d) {
                setFocusArea(d.properties.name);
            })
            .on("mouseover", function(event, d) {
                tooltip.transition()
                       .duration(200)
                       .style("opacity", .9);
                tooltip.html(d.properties.name)
                       .style("left", (event.pageX) + "px")
                       .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
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
    setFocusArea("NL");

    if (!municipalitiesDataCache) {
        console.error("No municipalities data available for reset.");
        return;
    }

    municipalitiesGroup.selectAll("path")
        .data(municipalitiesDataCache.features)
        .join("path")
        .attr("d", path)
        .attr("fill", "#6DD100")
        .attr("stroke", "#000000")
        .attr("stroke-width", 0.3)
        .style("cursor", "pointer");
}

d3.select("#resetButton").on("click", resetMapView);
d3.select("#sizeToggleButton").on("click", makeMapBiggerIfNeeded);

function makeMapBiggerIfNeeded() {
    if (!hoverArea) {
        setMapSize(true);
    }
}

export { municipalitiesGroup };