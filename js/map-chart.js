// Set dimensions and margins for the graph
const width = 960, height = 700;

// Append the svg object to the body of the page
const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

// Map and projection
const projection = d3.geoMercator()
    .center([5.3, 52]) // GPS of location to zoom on (roughly center of the Netherlands)
    .scale(7000) // This is like the zoom
    .translate([ width/2, height/2 ]);

// Load external data and boot for the base map
d3.json("netherlands.geojson").then(function(data){
    // Draw the base map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
            .attr("fill", "#00BFFF") // Base map color
            .attr("d", d3.geoPath().projection(projection))
            .style("stroke", "#fff")
            .style("stroke-width", 0.5);
});

// Load external data and boot for the municipalities
d3.json("netherlands2.geojson").then(function(data){
    // Draw the municipalities
    const municipalities = svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
            .attr("fill", "#6DD100") // Municipalities color
            .attr("d", d3.geoPath().projection(projection))
            .style("stroke", "#fff")
            .style("stroke-width", 0.5);

    // Hover interaction for municipalities
    municipalities
        .on("mouseover", function(event, d) {
            d3.select(this).attr("fill", "#006400"); // Dark green on hover
        })
        .on("mouseout", function(event, d) {
            d3.select(this).attr("fill", "#6DD100"); // Reset to original color on mouseout
        });

    // Load and overlay provinces
    d3.json("provinces.geojson").then(function(provinceData){
        svg.append("g")
            .selectAll("path")
            .data(provinceData.features)
            .enter()
            .append("path")
                .attr("fill", "none") // Set fill to none to make it an overlay
                .attr("stroke", "#999999") // Stroke color for the provinces
                .attr("stroke-width", 1.5) // Stroke width
                .attr("d", d3.geoPath().projection(projection));
    });
});