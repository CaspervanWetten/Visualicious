import { mapData, setFocusArea, setMapSize } from "./index.js";
import { eventEmitter } from "./event-emitter.js";
let firstRun = true;
let svg;
let zoom;

const IconDictonary = {
  "Totaal misdrijven": "../../Data/icons/Icon-Misdrijven.png",
  "Diefstal/inbraak woning": "../../Data/icons/Icon-Home.png",
  "Diefstal/inbraak box/garage/schuur": "../../Data/icons/Icon-Garage.png",
  "Diefstal uit/vanaf motorvoertuigen": "../../Data/icons/Icon-Voertuig1.png",
  "Diefstal van motorvoertuigen": "../../Data/icons/Icon-Voertuig2.png",
  "Diefstal van brom": "../../Data/icons/Icon-Fietsen.png",
  "Zakkenrollerij": "../../Data/icons/Icon-Zakkenroller.png",
  "Diefstal af/uit/van ov. voertuigen": "../../Data/icons/Icon-OV.png",
  "Straatroof": "../../Data/icons/Icon-Straatroof.png",
  "Overval": "../../Data/icons/Icon-Overval.png",
  "Diefstallen (water)": "../../Data/icons/Icon-Boot.png",
  "Diefstal/inbraak bedrijven enz.": "../../Data/icons/Icon-Bedrijf.png",
  "Winkeldiefstal": "../../Data/icons/Icon-Winkel.png",
};

// Helper functions
function aggregateData(data) {
  const wijkCrimeDict = {};
  for (const i in data) {
    let gemeente = data[i].WijkenEnBuurtenRaw
    let misdaad = data[i].GeregistreerdeMisdrijven
    if (!(gemeente in wijkCrimeDict)) {
      wijkCrimeDict[gemeente] = parseInt(misdaad);
    } else {
      wijkCrimeDict[gemeente] = wijkCrimeDict[gemeente] + parseInt(misdaad);
    }
  }
  return wijkCrimeDict;
}

function findMostFrequentCrime(gemeente) {
    const freqDict = {}
    for (const entry in mapData){
        if(mapData[entry].WijkenEnBuurtenRaw === gemeente){
            let gem = mapData[entry].WijkenEnBuurtenRaw
            let soort = mapData[entry].SoortMisdrijfRaw.slice(6)
            let aantal = parseInt(mapData[entry].GeregistreerdeMisdrijven)
            if (gem === "Groningen"){console.log ("Groningen: " + soort + " : " + aantal)}
            freqDict[parseFloat(mapData[entry].GeregistreerdeMisdrijven)] = mapData[entry].SoortMisdrijfRaw.slice(6) 
        }
    }
    return freqDict[d3.max(Object.keys(freqDict))];
}

async function drawMap(data) {
  let municipalitiesGroup;
  let colorScale;
  let path;


  const width = 800;
  const height = 600;
  if (firstRun) {
    zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .on("zoom", function (event) {
        municipalitiesGroup.attr("transform", event.transform);
      });

    svg = d3
      .select("#map-chart-container")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%");
    svg.call(zoom).on("dblclick.zoom", null);

    municipalitiesGroup = svg.append("g");
    let tooltip = d3.select("#tooltip");
    if (tooltip.empty()) {
      tooltip = d3
        .select("body")
        .append("div")
        .attr("id", "tooltip")
        .style("position", "absolute")
        .style("text-align", "center")
        .style("width", "120px")
        .style("height", "28px")
        .style("padding", "2px")
        .style("font", "12px sans-serif")
        .style("background", "lightsteelblue")
        .style("border", "0px")
        .style("border-radius", "8px")
        .style("pointer-events", "none")
        .style("opacity", 0);
    }
    colorScale = d3
      .scaleThreshold()
      .domain([0, 250, 750, 1500, 2000, 2500, 3000, 3500, 4000])
      .range(d3.schemeReds[9]);

    const projection = d3
      .geoMercator()
      .center([5.05, 53.0]) // Adjust the center based on your GeoJSON coordinates
      .scale(8250)
      .translate([width / 2, height / 2]);

    path = d3.geoPath().projection(projection);

    try {
      const municipalitiesDataCache = await d3.json(
        "../../Data/newer_municipalities.geojson"
      );

      municipalitiesGroup
        .selectAll("path")
        .data(municipalitiesDataCache.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "black")
        .attr("stroke-width", 0.5)
        .on("mouseover", function (event, d) {
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .html(d.properties.name + ": \n" + data[d.properties.name]) // Adjust to display the information you want on hover
            .style("left", event.pageX + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", function (d) {
          tooltip.transition().duration(500).style("opacity", 0);
        });
    } catch (error) {
      console.error("Failed to load or draw map:", error);
    }
    firstRun = false;
  }

  try {
    municipalitiesGroup
    .selectAll("path")
    .attr("fill", function (d) {
      return colorScale(data[d.properties.name]) ?? "rgb(255,255,255)";
    })
    .on("click", function (event, d) {
        // Change the focus area for the charts
        setFocusArea(d.properties.name);
        // Decrease the map size
        setMapSize()
        // Zoom in
        const bounds = path.bounds(d);
        const dx = bounds[1][0] - bounds[0][0];
        const dy = bounds[1][1] - bounds[0][1];
        const x = (bounds[0][0] + bounds[1][0]) / 2;
        const y = (bounds[0][1] + bounds[1][1]) / 2;
        const scale = Math.max(1,Math.min(8, 0.9 / Math.max(dx / width, dy / height)));
        const translate = [width / 2 - scale * x, height / 2 - scale * y];
        svg.transition().duration(750).call(zoom.transform,d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));

        // add Icons to all munincipalities
        municipalitiesGroup.selectAll("path").each(function (d) {
            let iconPath = IconDictonary[findMostFrequentCrime(d.properties.name)]
            if (iconPath === undefined) {
                return
            } else {
                d3.select(this.parentNode)
                .append("image")
                .attr("xlink:href", iconPath)
                .attr("height", 5)
                .attr("width", 5)
                .attr("x", function () {
                    if (d.properties.name === "Rotterdam"){return path.centroid(d)[0]+20}
                    if (d.properties.name === "Land van Cuijk"){return path.centroid(d)[0]+4}
                    if (d.properties.name === "Schiermonnikoog"){return path.centroid(d)[0]-7}
                    if (d.properties.name === "Ameland"){return path.centroid(d)[0]-10}
                    if (d.properties.name === "Vlieland"){return path.centroid(d)[0]-13}
                    else {return path.centroid(d)[0] - 2} 
                }) 
                .attr("y",function () {
                    if(d.properties.name === "Reimerswaal"){return path.centroid(d)[1]+3}
                    else if(d.properties.name === "Eemsdelta"){return path.centroid(d)[1]}
                    else if(d.properties.name === "Westerkwartier"){return path.centroid(d)[1]-4}
                    else if(d.properties.name === "Heerenveen"){return path.centroid(d)[1]+4}
                    else if(d.properties.name === "Venlo"){return path.centroid(d)[1]+6}
                    else if(d.properties.name === "Vlieland"){return path.centroid(d)[1]+6}
                    else {return path.centroid(d)[1] - 2}
                } );
            }
        })
    });
  } catch (error) {console.log(error)}
  

}

export async function removeIcons(){
    svg.select("g").selectAll("image").remove();
}

export async function resetMapView() {
    svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
    removeIcons();
    setMapSize(true);
    setFocusArea("Nederland");
}


eventEmitter.on("map data updated", () => {
  if(firstRun){
    const aggragated = aggregateData(mapData);
    drawMap(aggragated);
  }
});

eventEmitter.on("update", () => {
  if(!firstRun){
    const aggragated = aggregateData(mapData);
    drawMap(aggragated);
  }
});
