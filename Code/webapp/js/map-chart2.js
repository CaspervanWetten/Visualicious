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

async function loadDataAndRenderMap(crimeType) {
    // Filter the data based on the selected crime type
    const filteredData = municipalityData.filter(entry => entry.MisdaadNaamRaw === crimeType);

    // Aggregate the filtered data
    const aggregatedData = Array.from(d3.rollup(filteredData, 
        v => ({ GemeenteRaw: v[0].GemeenteRaw, GeregistreerdeMisdrijvenRaw: d3.sum(v, d => d.GeregistreerdeMisdrijvenRaw) }),
        d => d.GemeenteRaw
    ).values());

    // Specify your desired color range
    const colorScale = d3.scaleLinear()
        .domain([0, d3.max(aggregatedData, entry => entry.GeregistreerdeMisdrijvenRaw)])
        .range(d3.schemeBlues[3]);

    try {
        municipalitiesDataCache = municipalitiesDataCache || await d3.json("../../Data/newer_municipalities.geojson");

        municipalitiesGroup.selectAll("path")
            .data(municipalitiesDataCache.features)
            .enter().append("path")
            .attr("d", path)
            .attr("fill", function (d) {
                const entry = aggregatedData.find(entry => entry.GemeenteRaw === d.properties.name);
                const value = entry ? entry.GeregistreerdeMisdrijvenRaw : 0;
                return colorScale(value);
            })
            .attr("stroke", "#000000")
            .attr("stroke-width", 0.3)
            .style("cursor", "pointer")
            .on("click", function(event, d) {
                setFocusArea(d.properties.name);
                const bounds = path.bounds(d);
                const dx = bounds[1][0] - bounds[0][0];
                const dy = bounds[1][1] - bounds[0][1];
                const x = (bounds[0][0] + bounds[1][0]) / 2;
                const y = (bounds[0][1] + bounds[1][1]) / 2;
                const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height)));
                const translate = [width / 2 - scale * x, height / 2 - scale * y];
                svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
            })
            .on("mouseover", function(event, d) {
                const tooltip = d3.select("#tooltip");
                const entry = aggregatedData.find(entry => entry.GemeenteRaw === d.properties.name);
                const value = entry ? entry.GeregistreerdeMisdrijvenRaw : 0;
                const y = event.pageY - 28;
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(d.properties.name + ": " + value + " misdaden")
                    .style("left", (event.pageX) + "px")
                    .style("top: ", y + "px");
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
    // Load and render the map for "Straatroof" crime type (you can change the crime type as needed)
    await loadDataAndRenderMap("Totaal misdrijven");
});

export async function resetMapView() {
    svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);
    setMapSize(true);

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

d3.select("#sizeToggleButton").on("click", makeMapBiggerIfNeeded);

function makeMapBiggerIfNeeded() {
    if (!hoverArea) {
        setMapSize(true);
    }
}

export { municipalitiesGroup };
