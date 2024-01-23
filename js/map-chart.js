function responsivefy(svg) {
  var container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style("width")),
      height = parseInt(svg.style("height")),
      aspect = width / height;

    svg.attr("viewBox", "0 0 " + width + " " + height)
     .attr("preserveAspectRatio", "xMinYMid")
     .call(resize);
    d3.select(window).on("resize." + container.attr("id"), resize);

function resize() {
    var targetWidth = parseInt(container.style("width"));
    svg.attr("width", targetWidth);
    svg.attr("height", Math.round(targetWidth / aspect));
  }
}

const mapDiv = d3.select("#map-chart-container");
const divWidth = mapDiv.node().clientWidth;
const divHeight = mapDiv.node().clientHeight;

const svg = mapDiv.append("svg")
              .attr("viewBox", `0 0 ${divWidth} ${divHeight}`)
              .attr("preserveAspectRatio", "xMidYMid meet")
              .attr("width", divWidth)
              .attr("height", 550)
              .call(responsivefy);

// Set a light blue background and a black border for the SVG map
svg.append("rect")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("fill", "#6dd3f7")

const projection = d3.geoMercator()
              .center([5.3, 53.6])
              .scale(divWidth * 9)
              .translate([divWidth / 2, divHeight / 2]);

const zoom = d3.zoom()
               .scaleExtent([1, 8])
               .on('zoom', (event) => {
                   svg.selectAll('path').attr('transform', event.transform);
               });

svg.call(zoom);

// Wrap your paths in a 'g' element
const mapLayer = svg.append("g").classed("map-layer", true);

d3.json("outline.geojson").then(function(data) {
  // Draw the land areas with borders
  svg.append("g")
    .selectAll("path.land")
    .data(data.features.filter(function(d) { return d.properties.type === "land"; })) // This filter assumes your features have a 'type' property
    .enter().append("path")
      .attr("class", "land")
      .attr("fill", "#6DD100")
      .attr("d", d3.geoPath().projection(projection))
      .style("stroke", "#fff")
      .style("stroke-width", 0.5);

  // Draw the water areas without borders
  svg.append("g")
    .selectAll("path.water")
    .data(data.features.filter(function(d) { return d.properties.type === "water"; })) // This filter assumes your features have a 'type' property
    .enter().append("path")
      .attr("class", "water")
      .attr("fill", "#00BFFF")
      .attr("d", d3.geoPath().projection(projection))
      .style("stroke", "none"); // No border for water
});

let crimeDataByMunicipality = {};

d3.csv("/scraper/dataset.csv").then(function(data) {
  data.forEach(function(d) {
    crimeDataByMunicipality[d["Wijken en buurten"]] = d;
  });
});

d3.json("new_municipalities.geojson").then(function(data) {
  svg.append("g")
     .selectAll("path")
     .data(data.features)
     .enter().append("path")
        // Add class for styling and interaction
        .attr("class", "municipality")
        .attr("fill", "#6DD100")
        .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "#fff")
        .style("stroke-width", 0.5)
        // Add click event listener for zoom
        .on('click', (event, d) => {
            zoomToArea(d);
        });
});

function zoomToArea(featureData) {
  const bounds = d3.geoPath().projection(projection).bounds(featureData);
  const dx = bounds[1][0] - bounds[0][0];
  const dy = bounds[1][1] - bounds[0][1];
  const x = (bounds[0][0] + bounds[1][0]) / 2;
  const y = (bounds[0][1] + bounds[1][1]) / 2;

  let scale = .9 / Math.max(dx / divWidth, dy / divHeight);
  let translate = [divWidth / 2 - scale * x, divHeight / 2 - scale * y];

  svg.transition()
    .duration(750)
    .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
}

const provinceLayer = svg.append("g").classed("province-layer", true);

d3.json("provinces.geojson").then(function(provinceData) {
    provinceLayer.selectAll("path.province")
      .data(provinceData.features)
      .enter().append("path")
        .attr("class", "province")
        .attr("fill", "none") // No fill for the province borders
        .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "#000000") // Black stroke for the province borders
        .style("stroke-width", 1)
        .on('click', function(event, d) {
          zoomToArea(d);
        });
});

const tooltip = d3.select("body").append("div")
                  .attr("class", "tooltip")
                  .style("opacity", 0);

provinceLayer.selectAll("path.province")
  .on('click', (event, d) => {
      zoomToArea(d, divWidth, divHeight);
  });

svg.selectAll("path.municipality")
  .on('click', (event, d) => {
      zoomToArea(d, divWidth, divHeight);
  });