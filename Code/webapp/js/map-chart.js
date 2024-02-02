import {
  focusArea,
  setFocusArea,
  hoverArea,
  setHoverArea,
  setMapSize,
  data,
} from "./index.js";
// import { updateChoroplethForSelectedCrimes } from '.js/choropleth.js';

const tooltip = d3.select("#tooltip");

// Width and height for the SVG
var width = 800,
  height = 600;

// Create the SVG container and set the origin
var svg = d3
  .select("#map-chart-container")
  .append("svg")
  .attr("width", "100%")
  .attr("height", "100%");

// Define map projection
var projection = d3
  .geoMercator()
  .center([5.05, 53.0]) // Approximate center of the Netherlands
  .scale(8250) // Scale to suit your map
  .translate([width / 2, height / 2]);

// Define path generator
var path = d3.geoPath().projection(projection);

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

  var adjustY = -40; // Adjust this value as needed to get the desired centering
  translate[1] -= adjustY * scale; // Adjust translate based on scale to maintain consistency at different zoom levels

  svg
    .transition()
    .duration(750)
    .call(
      zoom.transform,
      d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
    );

  provinceClicked = true;
  provincesGroup.selectAll("path").attr("fill", "none");
  municipalitiesGroup.style("display", "block");
  provincesGroup.selectAll(".province-name").style("display", "none");

  setFocusArea(d.properties.name);

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
      scale = Math.max(1, Math.min(6, 0.9 / Math.max(dx / width, dy / height))),
      translate = [width / 2 - scale * x, height / 2 - scale * y];

    svg
      .transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
      );

    setFocusArea(d.properties.name);
  }

  setMapSize(false);
}

svg.on("mousemove", function (event) {
  const [x, y] = d3.pointer(event, svg.node());
  d3.select("#tooltip")
    .style("left", x - 100 + "px") // Adjust these values as needed
    .style("top", y - 20 + "px");
});

// Zoom and pan settings
var zoom = d3
  .zoom()
  .scaleExtent([1, 8]) // Adjust according to your needs
  .on("zoom", zoomed);

svg.call(zoom).on("dblclick.zoom", null);

function zoomed(event) {
  const { transform } = event;

  // Apply the transform directly to the group elements
  provincesGroup.attr("transform", transform);
  municipalitiesGroup.attr("transform", transform);

  // If you want to keep the text size consistent during zoom,
  // you might adjust the font-size dynamically here based on `transform.k` (the scale factor)
  // This is optional and depends on your desired behavior
  provincesGroup.selectAll("text").style("font-size", 12 / transform.k + "px");
}

// Load GeoJSON data for municipalities
d3.json("../../Data/newer_municipalities.geojson").then(function (
  municipalities
) {
  municipalitiesGroup
    .selectAll("path")
    .data(municipalities.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "#6DD100")
    .attr("stroke", "#FFFFFF")
    .attr("stroke-width", 0.3)
    .style("cursor", "pointer") // Set cursor to pointer
    .on("click", onMunicipalityClick)
    .each(function (d) {
      // Add tooltip on hover for provinces
      d3.select(this)
        .on("mouseover", function () {
          // d3.select(this).attr("fill", "#006400");
          const [x, y] = d3.pointer(event, svg.node());
          setHoverArea(d.properties.name);

          tooltip.transition().duration(200).style("opacity", 1);
          tooltip
            .html(d.properties.name)
            .style("left", x + 1020 + "px") // Adjust these values as needed
            .style("top", y - 50 + "px");
        })
        .on("mouseout", function () {
          // d3.select(this).attr("fill", null);
          setHoverArea(null);
          tooltip.transition().duration(500).style("opacity", 0);
        });
      // Append a title element to each path
      d3.select(this).append("title").text(d.properties.name);
    });
});

// Load GeoJSON data for provinces
d3.json("../../Data/provinces.geojson").then(function (provinces) {
  provinces.features.forEach(function (feature) {
    feature.properties.centroid = d3.geoCentroid(feature);
  });
  provincesGroup
    .selectAll("path")
    .data(provinces.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "#6DD100")
    .attr("stroke", "#000000")
    .attr("stroke-width", 0.8)
    .on("click", onProvinceClick)
    .style("cursor", "pointer") // Set cursor to pointer
    .each(function (d) {
      // Append a title element to each path
      d3.select(this).append("title").text(d.properties.name);
    });

  var bubbleSizeScale = d3
    .scaleLinear()
    .domain([0, d3.max(Object.values(data))]) // Assuming data is an object with province names as keys and bubble sizes as values
    .range([5, 30]); // Adjust the range based on your desired bubble size range

  provincesGroup
    .selectAll(".bubble")
    .data(provinces.features)
    .enter()
    .append("circle")
    .attr("class", "bubble")
    .attr("cx", function (d) {
      return path.centroid(d)[0];
    })
    .attr("cy", function (d) {
      return path.centroid(d)[1];
    })
    .attr("r", function (d) {
      return bubbleSizeScale(data[d.properties.name]);
    })
    .attr("fill", "rgba(255, 0, 0, 0.7)") // Adjust color as needed
    .attr("stroke", "#FFFFFF")
    .attr("stroke-width", 1);

  // Append text elements for each province
  provincesGroup
    .selectAll("text")
    .data(provinces.features)
    .enter()
    .append("text")
    .attr("class", "province-name")
    .attr("x", function (d) {
      // Adjust x-coordinate for specific provinces
      if (d.properties.name === "Noord-Holland") {
        return path.centroid(d)[0] + 10;
      } else if (d.properties.name === "Flevoland") {
        return path.centroid(d)[0] + 7;
      } else if (d.properties.name === "Zeeland") {
        return path.centroid(d)[0] + 6;
      } else if (d.properties.name === "Limburg") {
        return path.centroid(d)[0] - 6;
      }
      return path.centroid(d)[0];
    })
    .attr("y", function (d) {
      // Adjust y-coordinate for specific provinces
      if (d.properties.name === "Noord-Holland") {
        return path.centroid(d)[1] - 21; // adjust as needed
      } else if (d.properties.name === "Flevoland") {
        return path.centroid(d)[1] + 10;
      } else if (d.properties.name === "Zeeland") {
        return path.centroid(d)[1] - 3;
      } else if (d.properties.name === "Limburg") {
        return path.centroid(d)[1] - 6;
      }
      // Add more conditions as needed
      return path.centroid(d)[1];
    })
    .attr("text-anchor", "middle")
    .style("font-size", "12px") // Adjust the font size as needed
    .text(function (d) {
      return d.properties.name;
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

export function resetMapView() {
  // Reset to initial zoom and translate
  svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);

  // Reset the flag
  provinceClicked = false;

  // Show provinces and hide municipalities
  provincesGroup.selectAll("path").attr("fill", "#6DD100");
  municipalitiesGroup.style("display", "none");

  provincesGroup
    .selectAll(".province-name")
    .style("display", "inline")
    .style("opacity", 1);

  setMapSize(true);
  setFocusArea("NL");
  provincesGroup.selectAll(".province-name").style("display", null);
}

d3.select("#resetButton").on("click", resetMapView);
d3.select("#sizeToggleButton").on("click", makeMapBiggerIfNeeded);

function makeMapBiggerIfNeeded() {
  if (!hoverArea) {
    setMapSize(true);
  }
}

// Click handler for the map container
d3.select("#map-chart-container").on("click", makeMapBiggerIfNeeded);

$(function () {
  setInterval(oneSecondFunction, 1000);
});

function oneSecondFunction() {
  // stuff you want to do every second
}
