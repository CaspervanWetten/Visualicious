import { data, focusArea } from "./index.js";
import { eventEmitter } from "./event-emitter.js";

function responsivefy(svg) {
  // get container + svg aspect ratio
  var container = d3.select(svg.node().parentNode),
    width = parseInt(svg.style("width")),
    height = parseInt(svg.style("height")),
    aspect = width / height;

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("perserveAspectRatio", "xMinYMid")
    .call(resize);

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on("resize." + container.attr("id"), resize);

  // get width of container and resize svg to fit it
  function resize() {
    var targetWidth = parseInt(container.style("width"));
    svg.attr("width", targetWidth);
    svg.attr("height", Math.round(targetWidth / aspect));
  }
}

function totaalMisdaden(data) {
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const svg = d3
    .select("#totaalMisdaden")
    .append("svg")
    .attr("viewBox", `0 0 600 300`)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .style("font", "40px times")
    .call(responsivefy)
    .attr("id", "totaalMisdaden-svg");

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Totale hoeveelheid misdrijven in " + focusArea);

  const periods = Object.keys(data); // Extracting the periods from the keys
  const x = d3.scaleBand().domain(periods).range([0, width]).padding(0.1);
  const y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(Object.values(data).map((d) => d.GeregistreerdeMisdrijven)),
    ])
    .nice()
    .range([height, 0]);

  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));

  svg
    .selectAll("rect")
    .data(Object.entries(data))
    .enter()
    .append("rect")
    .attr("x", (d) => x(d[0]))
    .attr("y", height)
    .attr("width", x.bandwidth())
    .attr("fill", "black")
    .attr("height", 0)
    .transition()
    .duration(1000)
    .attr("y", (d) => y(d[1].GeregistreerdeMisdrijven))
    .attr("height", (d) => height - y(d[1].GeregistreerdeMisdrijven))
    .on("end", function () {
      d3.select(this)
        .on("mouseover", function (event, d) {
          const bar = d3.select(this);
          const tooltip = d3.select("#tooltip");
          bar.transition().duration(150).attr("fill", "orange");
          tooltip.transition().duration(150).style("opacity", 0.9);
          const tooltipContent = `Totaal aantal misdaden: \n${d[1].GeregistreerdeMisdrijven}`;
          let tooltipX = event.pageX + 10;
          const tooltipY = event.pageY - 28;
          const tooltipWidth = tooltip.node().offsetWidth;
          const rightBoundary = window.innerWidth - 5;
          if (tooltipX + tooltipWidth > rightBoundary) {
            tooltipX = rightBoundary - tooltipWidth;
          }
          tooltip
            .html(tooltipContent)
            .style("left", tooltipX + "px")
            .style("top", tooltipY + "px");
        })
        .on("mousemove", function (event, d) {
          const bar = d3.select(this);
          const tooltip = d3.select("#tooltip");
          bar.transition().duration(50).attr("fill", "orange");
          tooltip.transition().duration(50).style("opacity", 0.9);
          const tooltipContent = `Totaal aantal misdaden: \n${d[1].GeregistreerdeMisdrijven}`;
          let tooltipX = event.pageX + 10;
          const tooltipY = event.pageY - 28;
          const tooltipWidth = tooltip.node().offsetWidth;
          const rightBoundary = window.innerWidth - 5;
          if (tooltipX + tooltipWidth > rightBoundary) {
            tooltipX = rightBoundary - tooltipWidth;
          }
          tooltip
            .html(tooltipContent)
            .style("left", tooltipX + "px")
            .style("top", tooltipY + "px");
        })
        .on("mouseout", function () {
          const bar = d3.select(this);
          const tooltip = d3.select("#tooltip");
          bar.transition().duration(200).attr("fill", "black");
          tooltip.transition().duration(500).style("opacity", 0);
        });
    });

  // Draw axes
  svg.append("g").attr("transform", "translate(0,300)").call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));
}

function combineYears(data) {
  const newData = {};
  if (Object.keys(data).length > 18) {
    const shortKeyDict = {};
    const freqDict = {};
    for (let key in data) {
      let shortKey = key.substring(0, 4);
      if (!(shortKey in shortKeyDict)) {
        shortKeyDict[shortKey] = data[key]["GeregistreerdeMisdrijven"];
      } else {
        shortKeyDict[shortKey] += data[key]["GeregistreerdeMisdrijven"];
      }
      if (!(shortKey in freqDict)) {
        freqDict[shortKey] = 1;
      } else {
        freqDict[shortKey] += 1;
      }
    }
    for (let key in shortKeyDict) {
      newData[key] = {
        GeregistreerdeMisdrijven: Math.round(shortKeyDict[key] / freqDict[key]),
        Periode: key,
      };
    }
    return newData;
  } else {
    return data;
  }
}

function removePreviousGraph() {
  // Select the container and remove its content
  d3.select("#totaalMisdaden-svg").node().parentNode.remove();
}

totaalMisdaden(combineYears(data));

// Every time there's an update, remove the previous graph and load the page
eventEmitter.on("update", () => {
  removePreviousGraph();
  totaalMisdaden(combineYears(data));
});
