// Set dimensions and margins for the graph
const width = 960, height = 600;

// Append the svg object to the body of the page
const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

// Map and projection
const projection = d3.geoMercator()
    .center([5.3, 52]) // GPS of location to zoom on (roughly center of the Netherlands)
    .scale(7000) // This is like the zoom
    .translate([ width/2, height/2 ])

// Load external data and boot
d3.json("netherlands.geojson").then(function(data){

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
            .attr("fill", "#69b3a2")
            .attr("d", d3.geoPath().projection(projection))
            .style("stroke", "#fff")
            .style("stroke-width", 1);
});
