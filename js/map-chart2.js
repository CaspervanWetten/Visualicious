// Width and height for the SVG
var width = 800, height = 600;

// Create the SVG container and set the origin
var svg = d3.select("#map-chart-container").append("svg")
    .attr("width", width)
    .attr("height", height);

// Define map projection
var projection = d3.geoMercator()
                   .center([5.2913, 52.1326]) // Approximate center of the Netherlands
                   .scale(7000) // Scale to suit your map
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
    }
}

// Zoom and pan settings
var zoom = d3.zoom()
             .scaleExtent([1, 8])
             .on("zoom", zoomed);

svg.call(zoom)
    .on("dblclick.zoom", null)

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
          // Append a title element to each path
          d3.select(this)
            .append("title")
            .text(d.properties.name)})
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
          // Append a title element to each path
          d3.select(this)
            .append("title")
            .text(d.properties.name)})
});

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
}

d3.select("#resetButton").on("click", resetMapView);