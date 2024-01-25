import {focusArea, setFocusArea, hoverArea, setHoverArea, setMapSize} from "./index.js";

const tooltip = d3.select("#tooltip");


// Width and height for the SVG
var width = 800, height = 600;

// Create the SVG container and set the origin
var svg = d3.select("#map-chart-container").append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

// Define map projection
var projection = d3.geoMercator()
    .center([6.05, 52.8]) // Approximate center of the Netherlands
    .scale(8250) // Scale to suit your map
    .translate([width / 2, height / 2]);

// Define path generator
var path = d3.geoPath()
    .projection(projection);

// Flag to determine if a province was clicked
var provinceClicked = false;

// Two groups
var municipalitiesGroup = svg.append("g");
var provincesGroup = svg.append("g");

// Initially hide the municipalities
municipalitiesGroup.style("display", "none");





// Click handler for provinces
function onProvinceClick(event, d) {
    var bounds = path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = Math.max(1, Math.min(6, 0.9 / Math.max(dx / width, dy / height))),
        translate = [width / 2 - scale * x, height / 2 - scale * y];

    svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));

    provinceClicked = true;
    provincesGroup.selectAll("path").attr("fill", "none");
    municipalitiesGroup.style("display", "block");

    setFocusArea(d.properties.name)

    setMapSize(false);
}

// Click handler for municipalities
function onMunicipalityClick(event, d) {
    if (provinceClicked) {
        var bounds = path.bounds(d),
            dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            scale = Math.max(1, Math.min(18, 0.9 / Math.max(dx / width, dy / height))),
            translate = [width / 2 - scale * x, height / 2 - scale * y];

        svg.transition()
            .duration(750)
            .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));

        setFocusArea(d.properties.name)
    }

    setMapSize(false);
}




svg.on("mousemove", function(event) {
    const [x, y] = d3.pointer(event, svg.node());
    d3.select("#tooltip")
        .style("left", (x - 100) + "px") // Adjust these values as needed
        .style("top", (y - 20) + "px");
});


// Zoom and pan settings
var zoom = d3.zoom()
    .scaleExtent([1, 2])
    .on("zoom", zoomed);

svg.call(zoom)
    .on("dblclick.zoom", null);

function zoomed({transform}) {
    municipalitiesGroup.selectAll("path").attr("transform", transform);
    provincesGroup.selectAll("path").attr("transform", transform);
}






// Load GeoJSON data for municipalities
d3.json("newer_municipalities.geojson").then(function(municipalities) {
    municipalitiesGroup.selectAll("path")
        .data(municipalities.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#6DD100")
        .attr("stroke", "#FFFFFF")
        .attr("stroke-width", 0.3)
        .on("click", onMunicipalityClick)
        .each(function(d) {
            // Add tooltip on hover for provinces
            d3.select(this)
                .on("mouseover", function () {
                    // d3.select(this).attr("fill", "#006400");
                    const [x, y] = d3.pointer(event, svg.node());
                    setHoverArea(d.properties.name);

                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 1);
                    tooltip.html(d.properties.name)
                        .style("left", (x + 1020) + "px") // Adjust these values as needed
                        .style("top", (y - 50) + "px");
                })
                .on("mouseout", function () {
                    // d3.select(this).attr("fill", null);
                    setHoverArea(null);
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
            // Append a title element to each path
            d3.select(this)
                .append("title")
                .text(d.properties.name);
        });
});

// Load GeoJSON data for provinces
d3.json("provinces.geojson").then(function(provinces) {
    provincesGroup.selectAll("path")
        .data(provinces.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#6DD100")
        .attr("stroke", "#000000")
        .attr("stroke-width", 0.8)
        .on("click", onProvinceClick)
        .each(function(d) {
            // Add tooltip on hover for provinces
            d3.select(this)
                .on("mouseover", function () {
                    // d3.select(this).attr("fill", "#006400");
                    const [x, y] = d3.pointer(event, svg.node());
                    setHoverArea(d.properties.name);

                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 1);
                    tooltip.html(d.properties.name)
                        .style("left", (x + 1020) + "px") // Adjust these values as needed
                        .style("top", (y - 50) + "px");
                })
                .on("mouseout", function () {
                    // d3.select(this).attr("fill", null);
                    setHoverArea(null);
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
            // Append a title element to each path
            d3.select(this)
                .append("title")
                .text(d.properties.name);
        });
});

function setZoomLevel(scale) {
    // // Get the current center coordinates
    // var center = projection.center();
    //
    // console.log(center);
    //
    // // Update the projection's scale
    // projection.scale(scale);
    //
    // // Apply the same center coordinates to maintain the center
    // projection.center(center);
    //
    // // Update the path generator with the new projection
    // path.projection(projection);
    //
    // // Redraw the map
    // svg.selectAll("path")
    //     .attr("d", path);
}

function resetMapView() {
    // Reset to initial zoom and translate
    svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);

    // Reset the flag
    provinceClicked = false;

    // Show provinces and hide municipalities
    provincesGroup.selectAll("path").attr("fill", "#6DD100");
    municipalitiesGroup.style("display", "none");

    setMapSize(true);
}

d3.select("#resetButton").on("click", resetMapView);

function makeMapBiggerIfNeeded() {
    if (!hoverArea) {
        setMapSize(true);
    }
}

// Click handler for the map container
d3.select("#map-chart-container").on("click", makeMapBiggerIfNeeded);
