import {
  focusArea,
  setFocusArea,
  hoverArea,
  setHoverArea,
  setMapSize,
  mapData
} from "./index.js";

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

const IconDictonary = {
    "../../Data/Icon-Misdrijven.png": "Totaal misdrijven",
    "../../Data/Icon-Home.png": "Diefstal/inbraak woning",
    "../../Data/Icon-Garage.png": "Diefstal/inbraak box/garage/schuur",
    "../../Data/Icon-Voertuig1.png": "Diefstal uit/vanaf motorvoertuigen",
    "../../Data/Icon-Voertuig2.png": "Diefstal van motorvoertuigen",
    "../../Data/Icon-Fietsen.png": "Diefstal van brom-, snor-, fietsen",
    "../../Data/Icon-Zakkenrollerij.png": "Zakkenrollerij",
    "../../Data/Icon-OV.png": "Diefstal af/uit/van ov. voertuigen",
    "../../Data/Icon-Straatroof.png": "Straatroof",
    "../../Data/Icon-Overval.png": "Overval",
    "../../Data/Icon-Boot.png": "Diefstallen (water)",
    "../../Data/Icon-Bedrijf.png": "Diefstal/inbraak bedrijven enz.",
    "../../Data/Icon-Winkel.png": "Winkeldiefstal"
  }

// Flag to determine if a municipality was clicked
var municipalityClicked = false;

var municipalitiesGroup = svg.append("g");
var municipalitiesDataCache = null;

svg.on("mousemove", function (event) {
  const [x, y] = d3.pointer(event, svg.node());
  tooltip.style("left", x - 100 + "px").style("top", y - 20 + "px");
});

// Click handler for municipalities
function onMunicipalityClick(event, d) {
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

    municipalityClicked = true;

    // Add your logic for handling the clicked municipality here

    setMapSize(false);
}

// Click handler for the map container
d3.select("#map-chart-container").on("click", function () {
    if (municipalityClicked) {
        resetMapView();
    }
});

// Zoom and pan settings
var zoom = d3
  .zoom()
  .scaleExtent([1, 8])
  .on("zoom", function (event) {
    municipalitiesGroup.attr("transform", event.transform);
  });

svg.call(zoom).on("dblclick.zoom", null);
  
//@Casper, this needs to be grayed out, if you manage to load in the data from Björn' API
var municipalityData = [
    {
      GemeenteRaw: "Almere",
      GeregistreerdeMisdrijvenRaw: 120,
      MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz.",
    },
    {
      GemeenteRaw: "Rotterdam",
      GeregistreerdeMisdrijvenRaw: 150,
      MisdaadNaamRaw: "Diefstal/inbraak woning",
    },
    {
      GemeenteRaw: "Rotterdam",
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
        GemeenteRaw: "Den Haag",
        GeregistreerdeMisdrijvenRaw: 200,
        MisdaadNaamRaw: "Overval",
      },
      {
        GemeenteRaw: "Den Haag",
        GeregistreerdeMisdrijvenRaw: 110,
        MisdaadNaamRaw: "Straatroof",
      },
      {
        GemeenteRaw: "Hilversum",
        GeregistreerdeMisdrijvenRaw: 200,
        MisdaadNaamRaw: "Overval",
      },
      {
        GemeenteRaw: "Breda",
        GeregistreerdeMisdrijvenRaw: 110,
        MisdaadNaamRaw: "Straatroof",
      },
    {
      GemeenteRaw: "Amsterdam",
      GeregistreerdeMisdrijvenRaw: 150,
      MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz.",
    },
    {
      GemeenteRaw: "Rotterdam",
      GeregistreerdeMisdrijvenRaw: 90,
      MisdaadNaamRaw: "Diefstal/inbraak woning",
    },
    {
      GemeenteRaw: "Rotterdam",
      GeregistreerdeMisdrijvenRaw: 120,
      MisdaadNaamRaw: "Straatroof",
    },
    {
      GemeenteRaw: "Rotterdam",
      GeregistreerdeMisdrijvenRaw: 70,
      MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz.",
    },
    {
      GemeenteRaw: "Den Haag",
      GeregistreerdeMisdrijvenRaw: 85,
      MisdaadNaamRaw: "Overval",
    },
    {
      GemeenteRaw: "Den Haag",
      GeregistreerdeMisdrijvenRaw: 50,
      MisdaadNaamRaw: "Diefstal/inbraak woning",
    },
    {
      GemeenteRaw: "Eindhoven",
      GeregistreerdeMisdrijvenRaw: 75,
      MisdaadNaamRaw: "Straatroof",
    },
    {
      GemeenteRaw: "Eindhoven",
      GeregistreerdeMisdrijvenRaw: 110,
      MisdaadNaamRaw: "Overval",
    },
    {
      GemeenteRaw: "Groningen",
      GeregistreerdeMisdrijvenRaw: 65,
      MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz.",
    },
    {
      GemeenteRaw: "Haarlem",
      GeregistreerdeMisdrijvenRaw: 75,
      MisdaadNaamRaw: "Straatroof",
    },
    {
      GemeenteRaw: "Haarlem",
      GeregistreerdeMisdrijvenRaw: 90,
      MisdaadNaamRaw: "Overval",
    },
    {
        GemeenteRaw: "Eindhoven",
        GeregistreerdeMisdrijvenRaw: 75,
        MisdaadNaamRaw: "Straatroof",
      },
      {
        GemeenteRaw: "Eindhoven",
        GeregistreerdeMisdrijvenRaw: 110,
        MisdaadNaamRaw: "Overval",
      },
      {
        GemeenteRaw: "Groningen",
        GeregistreerdeMisdrijvenRaw: 65,
        MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz.",
      },
      {
        GemeenteRaw: "Haarlem",
        GeregistreerdeMisdrijvenRaw: 75,
        MisdaadNaamRaw: "Straatroof",
      },
      {
        GemeenteRaw: "Haarlem",
        GeregistreerdeMisdrijvenRaw: 90,
        MisdaadNaamRaw: "Overval",
      },
      {
        GemeenteRaw: "Tilburg",
        GeregistreerdeMisdrijvenRaw: 60,
        MisdaadNaamRaw: "Diefstal/inbraak woning",
      },
      {
        GemeenteRaw: "Tilburg",
        GeregistreerdeMisdrijvenRaw: 70,
        MisdaadNaamRaw: "Overval",
      },
      {
        GemeenteRaw: "Nijmegen",
        GeregistreerdeMisdrijvenRaw: 40,
        MisdaadNaamRaw: "Straatroof",
      },
      {
        GemeenteRaw: "Nijmegen",
        GeregistreerdeMisdrijvenRaw: 55,
        MisdaadNaamRaw: "Diefstal/inbraak woning",
      },
      {
        GemeenteRaw: "Nijmegen",
        GeregistreerdeMisdrijvenRaw: 45,
        MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz.",
      },
      {
        GemeenteRaw: "Enschede",
        GeregistreerdeMisdrijvenRaw: 30,
        MisdaadNaamRaw: "Straatroof",
      },
      {
        GemeenteRaw: "Enschede",
        GeregistreerdeMisdrijvenRaw: 40,
        MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz.",
      },
      {
        GemeenteRaw: "Rotterdam",
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
        GemeenteRaw: "Maastricht",
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
      {
        GemeenteRaw: "Zundert",
        GeregistreerdeMisdrijvenRaw: 35,
        MisdaadNaamRaw: "Overval",
      },
      {
        GemeenteRaw: "Zutphen",
        GeregistreerdeMisdrijvenRaw: 65,
        MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz.",
      },
      {
        GemeenteRaw: "Zwijndrecht",
        GeregistreerdeMisdrijvenRaw: 42,
        MisdaadNaamRaw: "Straatroof",
      },
      {
        GemeenteRaw: "Zwolle",
        GeregistreerdeMisdrijvenRaw: 120,
        MisdaadNaamRaw: "Diefstal/inbraak woning",
      },
      {
        GemeenteRaw: "Bunschoten",
        GeregistreerdeMisdrijvenRaw: 28,
        MisdaadNaamRaw: "Diefstal/inbraak woning",
      },
      {
        GemeenteRaw: "Buren",
        GeregistreerdeMisdrijvenRaw: 19,
        MisdaadNaamRaw: "Overval",
      },
      {
        GemeenteRaw: "Bussum",
        GeregistreerdeMisdrijvenRaw: 37,
        MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz.",
      },
      {
        GemeenteRaw: "Capelle aan den IJssel",
        GeregistreerdeMisdrijvenRaw: 68,
        MisdaadNaamRaw: "Straatroof",
      },
      {
          GemeenteRaw: "Almere",
          GeregistreerdeMisdrijvenRaw: 76,
          MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz.",
        },
        {
          GemeenteRaw: "Rotterdam",
          GeregistreerdeMisdrijvenRaw: 110,
          MisdaadNaamRaw: "Diefstal/inbraak woning",
        },
        {
          GemeenteRaw: "Almere",
          GeregistreerdeMisdrijvenRaw: 18,
          MisdaadNaamRaw: "Overval",
        },
        {
          GemeenteRaw: "Lelystad",
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
        {
          GemeenteRaw: "Zwolle",
          GeregistreerdeMisdrijvenRaw: 85,
          MisdaadNaamRaw: "Overval",
        },
        {
          GemeenteRaw: "Zwolle",
          GeregistreerdeMisdrijvenRaw: 67,
          MisdaadNaamRaw: "Diefstal/inbraak woning",
        },
        {
          GemeenteRaw: "Zwolle",
          GeregistreerdeMisdrijvenRaw: 42,
          MisdaadNaamRaw: "Straatroof",
        },
        {
          GemeenteRaw: "Zwolle",
          GeregistreerdeMisdrijvenRaw: 31,
          MisdaadNaamRaw: "Diefstal/inbraak box/garage/schuur",
        },
        {
            GemeenteRaw: "Huizen",
            GeregistreerdeMisdrijvenRaw: 188,
            MisdaadNaamRaw: "Straatroof",
          },
          {
            GemeenteRaw: "Bilthoven",
            GeregistreerdeMisdrijvenRaw: 103,
            MisdaadNaamRaw: "Overval",
          },
          {
            GemeenteRaw: "Nijmegen",
            GeregistreerdeMisdrijvenRaw: 155,
            MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz.",
          },
          {
            GemeenteRaw: "Katwijk",
            GeregistreerdeMisdrijvenRaw: 44,
            MisdaadNaamRaw: "Overval",
          },
          {
            GemeenteRaw: "Leeuwarden",
            GeregistreerdeMisdrijvenRaw: 110,
            MisdaadNaamRaw: "Straatroof",
          },
          {
            GemeenteRaw: "Delft",
            GeregistreerdeMisdrijvenRaw: 99,
            MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz.",
          },
          {
            GemeenteRaw: "Arnhem",
            GeregistreerdeMisdrijvenRaw: 199,
            MisdaadNaamRaw: "Overval",
          },
          {
            GemeenteRaw: "Nieuwegein",
            GeregistreerdeMisdrijvenRaw: 67,
            MisdaadNaamRaw: "Diefstal/inbraak woning",
          },
          {
            GemeenteRaw: "Apeldoorn",
            GeregistreerdeMisdrijvenRaw: 101,
            MisdaadNaamRaw: "Straatroof",
          },
          {
            GemeenteRaw: "Zwolle",
            GeregistreerdeMisdrijvenRaw: 31,
            MisdaadNaamRaw: "Diefstal/inbraak box/garage/schuur",
          },
        {
          GemeenteRaw: "Zwijndrecht",
          GeregistreerdeMisdrijvenRaw: 24,
          MisdaadNaamRaw: "Diefstal/inbraak bedrijven enz.",
        },
        {
          GemeenteRaw: "Zwijndrecht",
          GeregistreerdeMisdrijvenRaw: 19,
          MisdaadNaamRaw: "Overval",
        },
        {
          GemeenteRaw: "Zwijndrecht",
          GeregistreerdeMisdrijvenRaw: 38,
          MisdaadNaamRaw: "Diefstal/inbraak woning",
        },
        {
          GemeenteRaw: "Zwijndrecht",
          GeregistreerdeMisdrijvenRaw: 12,
          MisdaadNaamRaw: "Diefstal/inbraak box/garage/schuur",
        },
  ];

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
  
const mostFrequentCrimes = findMostFrequentCrime(municipalityData);

async function loadDataAndRenderMap() {
  const aggregatedData = Array.from(d3.rollup(municipalityData,(v) => ({GemeenteRaw: v[0].GemeenteRaw,GeregistreerdeMisdrijvenRaw: d3.sum(v,(d) => d.GeregistreerdeMisdrijvenRaw),}),(d) => d.GemeenteRaw).values()
  );
  const [minValue, maxValue] = d3.extent(
    aggregatedData,
    (entry) => entry.GeregistreerdeMisdrijvenRaw
  );

  const colorScale = d3
    .scaleLinear()
    .domain([0, 250])
    .range(d3.schemeGreens[3]); // Specify your desired color range

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

        d3.select(this)
          .append("image")
          .attr("xlink:href", function (d) {
            console.log(mostFrequentCrimes[d.properties.name])
          })
          .attr("height", 5)
          .attr("width", 5)
          .attr("x", path.centroid(d)[0] - 2) // Adjust positioning based on the size of the image
          .attr("y", path.centroid(d)[1] - 2); // Adjust positioning based on the size of the image
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
        svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
    });
  } catch (error) {
    console.error("Failed to load data or render map:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadDataAndRenderMap(); // Load and render the map
});

export async function resetMapView() {
    svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);
    setMapSize(true);
    setFocusArea("Nederland");
    // Reset the flag
    municipalityClicked = false;

    // Hide municipalities
    municipalitiesGroup.style("display", "none");
    
    setMapSize(true);

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
