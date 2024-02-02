import {
    focusArea,
    setFocusArea,
    hoverArea,
    setHoverArea,
    setMapSize,
    mapData, data,
} from "./index.js";
import { eventEmitter } from "./event-emitter.js";

const tooltip = d3.select("#tooltip");
var width = 800,
height = 600;
var svg = d3
.select("#map-chart-container")
.append("svg")
.attr("width", "100%")
.attr("height", "100%");

var projection = d3
.geoMercator()
.center([5.05, 53.0])
.scale(8250)
.translate([width / 2, height / 2]);
var path = d3.geoPath().projection(projection);

var municipalitiesGroup = svg.append("g");
var municipalitiesDataCache = null;
svg.on("mousemove", function (event) {
    const [x, y] = d3.pointer(event, svg.node());
    tooltip.style("left", x - 100 + "px").style("top", y - 20 + "px");
});

var zoom = d3
.zoom()
.scaleExtent([1, 8])
.on("zoom", function (event) {
    municipalitiesGroup.attr("transform", event.transform);
});
svg.call(zoom).on("dblclick.zoom", null);  

var municipalityData = [
    {
        GemeenteRaw: "Almere",
        GeregistreerdeMisdrijvenRaw: 120,
        MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz.",
    },
    {
        GemeenteRaw: "Almere",
        GeregistreerdeMisdrijvenRaw: 150,
        MisdaadNaamRaw: "Diefstal/inbraak woning",
    },
    {
        GemeenteRaw: "Almere",
        GeregistreerdeMisdrijvenRaw: 180,
        MisdaadNaamRaw: "Overval",
    },
    {
        GemeenteRaw: "Almere",
        GeregistreerdeMisdrijvenRaw: 80,
        MisdaadNaamRaw: "Diefstal/inbraak box/garage/schuur",
    },
    {
        GemeenteRaw: "Utrecht",
        GeregistreerdeMisdrijvenRaw: 110,
        MisdaadNaamRaw: "Straatroof",
  },
  {
    GemeenteRaw: "Utrecht",
    GeregistreerdeMisdrijvenRaw: 90,
    MisdaadNaamRaw: "Overval",
  },
  {
    GemeenteRaw: "Utrecht",
    GeregistreerdeMisdrijvenRaw: 60,
    MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz.",
  },
  {
    GemeenteRaw: "Amsterdam",
    GeregistreerdeMisdrijvenRaw: 200,
    MisdaadNaamRaw: "Overval",
  },
  {
    GemeenteRaw: "Amsterdam",
    GeregistreerdeMisdrijvenRaw: 110,
    MisdaadNaamRaw: "Straatroof",
  },
  {
    GemeenteRaw: "Amsterdam",
    GeregistreerdeMisdrijvenRaw: 150,
    MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz.",
  },
];

const sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
await sleep(500)
console.log(typeof mapData)

function findMostFrequentCrime(data) {
    const result = {};
  
    data.forEach(entry => {
      const gemeente = entry.GemeenteRaw;
      const misdaadNaam = entry.MisdaadNaamRaw;
      const misdrijven = entry.GeregistreerdeMisdrijvenRaw;
  
      if (!result[gemeente]) {
        result[gemeente] = { misdaad: misdaadNaam, totalMisdrijven: misdrijven };
      } else {
        if (result[gemeente].misdaad !== misdaadNaam) {
          // If the current crime type has more occurrences than the stored one, update
          if (misdrijven > result[gemeente].totalMisdrijven) {
            result[gemeente] = { misdaad: misdaadNaam, totalMisdrijven: misdrijven };
          }
        } else {
          // If the current crime type is the same, accumulate the total
          result[gemeente].totalMisdrijven += misdrijven;
        }
      }
    });
  
    return result;
  }

async function loadDataAndRenderMap(municipalityData) {
    const IconDictonary = {
        "Totaal misdrijven": "../../Data/icons/Icon-Misdrijven.png",
        "Diefstal/inbraak woning": "../../Data/icons/Icon-Home.png",
        "Diefstal/inbraak box/garage/schuur": "../../Data/icons/Icon-Garage.png",
        "Diefstal uit/vanaf motorvoertuigen": "../../Data/icons/Icon-Voertuig1.png",
        "Diefstal van motorvoertuigen": "../../Data/icons/Icon-Voertuig2.png",
        "Diefstal van brom-, snor-, fietsen": "../../Data/icons/Icon-Fietsen.png",
        "Zakkenrollerij": "../../Data/icons/Icon-Zakkenrollerij.png",
        "Diefstal af/uit/van ov. voertuigen": "../../Data/icons/Icon-OV.png",
        "Straatroof": "../../Data/icons/Icon-Straatroof.png",
        "Overval": "../../Data/icons/Icon-Overval.png",
        "Diefstallen (water)": "../../Data/icons/Icon-Boot.png",
        "Diefstal/inbraak bedrijven enz.": "../../Data/icons/Icon-Bedrijf.png",
        "Winkeldiefstal": "../../Data/icons/Icon-Winkel.png"
      }

      const mostFrequentCrimes = findMostFrequentCrime(municipalityData);
  const aggregatedData = Array.from(d3.rollup(municipalityData,(v) => ({GemeenteRaw: v[0].GemeenteRaw,GeregistreerdeMisdrijvenRaw: d3.sum(v,(d) => d.GeregistreerdeMisdrijvenRaw),}),(d) => d.GemeenteRaw).values()
  );
  const [minValue, maxValue] = d3.extent(
    aggregatedData,
    (entry) => entry.GeregistreerdeMisdrijvenRaw
  );

  const colorScale = d3
    .scaleLinear()
    .domain([minValue, maxValue])
    .range(d3.schemeBlues[3]); // Specify your desired color range

  try {
    municipalitiesDataCache =
      municipalitiesDataCache ||
      (await d3.json("../../Data/newer_municipalities.geojson"));

    municipalitiesGroup
      .selectAll("g")
      .data(municipalitiesDataCache.features)
      .enter()
      .append("g")
      .attr("class", "municipality-group")
      .on("click", function (event, d) {
        setFocusArea(d.properties.name);
      })
      .on("mouseover", function (event, d) {
        const tooltip = d3.select("#tooltip");
        const entry = aggregatedData.find(
          (entry) => entry.GemeenteRaw === d.properties.name
        );
        const value = entry ? entry.GeregistreerdeMisdrijvenRaw : 0;
        const y = event.pageY - 28;
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(d.properties.name + ": " + value + " misdaden")
          .style("left", event.pageX + "px")
          .style("top", y + "px");
      })
      .on("mouseout", function (d) {
        const tooltip = d3.select("#tooltip");
        tooltip.transition().duration(500).style("opacity", 0);
      })
      .each(function (d) {
        d3.select(this)
          .append("path")
          .attr("d", path)
          .attr("fill", function () {
            const entry = aggregatedData.find(
              (entry) => entry.GemeenteRaw === d.properties.name
            );
            const value = entry ? entry.GeregistreerdeMisdrijvenRaw : 0;
            return colorScale(value);
          })
          .attr("stroke", "#000000")
          .attr("stroke-width", 0.3)
          .style("cursor", "pointer")
          .append("title")
          .text((d) => d.properties.name);
      })
      .on("click", function(event, d) {
        setFocusArea(d.properties.name);
        const bounds = path.bounds(d);
        const dx = bounds[1][0] - bounds[0][0];
        const dy = bounds[1][1] - bounds[0][1];
        const x = (bounds[0][0] + bounds[1][0]) / 2;
        const y = (bounds[0][1] + bounds[1][1]) / 2;
        const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height)));
        const translate = [width / 2 - scale * x, height / 2 - scale * y];
        svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale))
        municipalitiesGroup.selectAll('path').each(function (d,i){
            const frequentCrime = mostFrequentCrimes[d.properties.name]
            if(frequentCrime !== undefined){
                const imageUrl = IconDictonary[mostFrequentCrimes[d.properties.name].misdaad]
                if (imageUrl !== undefined){
                    console.log(imageUrl)
                    d3.select(this.parentNode)
                    .append("image")
                    .attr("xlink:href", imageUrl)
                    .attr("height", 5)
                    .attr("width", 5)
                    .attr("x", path.centroid(d)[0] - 2) // Adjust positioning based on the size of the image
                    .attr("y", path.centroid(d)[1] - 2); // Adjust positioning based on the size of the image;
                } 
            }
        })
        setMapSize(false)
    });
  } catch (error) {
    console.error("Failed to load data or render map:", error);
  }
}

// document.addEventListener("DOMContentLoaded", async () => {
//   await loadDataAndRenderMap(); // Load and render the map
// });

eventEmitter.on("map data updated", async () => {
    // @ CASPER HIER MOET JE DUS DAN DE VAR mapData inknallen
    console.log(mapData)
    await loadDataAndRenderMap(mapData);
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

  municipalitiesGroup
    .selectAll("g")
    .data(municipalitiesDataCache.features)
    .enter()
    .append("g")
    .attr("class", "municipality-group")
    .on("click", function (event, d) {
      setFocusArea(d.properties.name);
    })
    .on("mouseover", function (event, d) {
      const tooltip = d3.select("#tooltip");
      const entry = aggregatedData.find(
        (entry) => entry.GemeenteRaw === d.properties.name
      );
      const value = entry ? entry.GeregistreerdeMisdrijvenRaw : 0;
      const y = event.pageY - 28;
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .html(d.properties.name + ": " + value + " misdaden")
        .style("left", event.pageX + "px")
        .style("top", y + "px");
    })
    .on("mouseout", function (d) {
      const tooltip = d3.select("#tooltip");
      tooltip.transition().duration(500).style("opacity", 0);
    })
    .each(function (d) {
      d3.select(this)
        .append("path")
        .attr("d", path)
        .attr("fill", function () {
          const entry = aggregatedData.find(
            (entry) => entry.GemeenteRaw === d.properties.name
          );
          const value = entry ? entry.GeregistreerdeMisdrijvenRaw : 0;
          return colorScale(value);
        })
        .attr("stroke", "#000000")
        .attr("stroke-width", 0.3)
        .style("cursor", "pointer")
        .append("title")
        .text((d) => d.properties.name);
    });
  svg.selectAll("image").remove();
}

d3.select("#sizeToggleButton").on("click", makeMapBiggerIfNeeded);

function makeMapBiggerIfNeeded() {
  if (!hoverArea) {
    setMapSize(true);
  }
}



export { municipalitiesGroup };