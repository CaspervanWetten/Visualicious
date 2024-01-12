// Set dimensions and margins for the graph
    const width = 960, height = 700;

// Append the svg object to the body of the page
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

// Map and projection
    const projection = d3.geoMercator()
        .center([5.3, 52.5]) // GPS of location to zoom on (roughly center of the Netherlands)
        .scale(7000) // This is like the zoom
        .translate([ width/3, height/3 ]);

// Load external data and boot for the base map
    d3.json("outline.geojson").then(function(data){
        // Draw the base map
        svg.append("g")
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("fill", "#00BFFF") // Base map color = water blue
            .attr("d", d3.geoPath().projection(projection))
            .style("stroke", "#fff")
            .style("stroke-width", 0.5);
    });

let crimeDataByMunicipality = {};

d3.csv("scraper/dataset.csv").then(function(data) {
    data.forEach(d => {
        // Assuming the data is sorted by date for each municipality
        crimeDataByMunicipality[d["Wijken en buurten"]] = d;
    });
});

// Load external data and boot for the municipalities
    d3.json("new_municipalities.geojson").then(function(data){
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

        const tooltip = d3.select("#tooltip");

        // Hover interaction for municipalities
        municipalities
            .on("mouseover", function(event, d) {
                d3.select(this).attr("fill", "#006400"); // Dark green on hover

                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                console.log(this.__data__);
                
                const [x, y] = d3.pointer(event, svg.node()); // Get mouse position relative to the SVG

                let municipalityName = this.__data__.properties.name;
                let tooltipContent = municipalityName;

                let crimeData = crimeDataByMunicipality[municipalityName];
                console.log(crimeData);
                if (crimeData) {
                    tooltipContent += "<br>Misdrijven (" + crimeData['Perioden'] + "): " + crimeData['Geregistreerde misdrijven (aantal)'];
                }

                tooltip.html(tooltipContent)
                    .style("left", (x + 15) + "px") // Adjust these values as needed
                    .style("top", (y + 75) + "px");
            })
            .on("mouseout", function(event, d) {
                d3.select(this).attr("fill", "#6DD100"); // Reset to original color on mouseout

                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
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