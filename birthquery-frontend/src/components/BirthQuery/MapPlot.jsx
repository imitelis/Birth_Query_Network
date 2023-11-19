import React, { useEffect } from "react";

import * as d3 from "d3";
import * as topojson from "topojson-client";

const MapPlot = ({ loading, data }) => {
  const countyUrl =
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countyRes] = await Promise.all([d3.json(countyUrl)]);

        const geoData = countyRes;
        const countyData = topojson.feature(
          geoData,
          geoData.objects.counties,
        ).features;
        const canvas = d3.select("#canvas");

        const drawMap = () => {
          const path = d3.geoPath();

          canvas.selectAll("*").remove();
          // console.log("queryData", data);
          // console.log("countyData", countyData);

          let tooltip = d3
            .select("body")
            .append("div")
            .attr("id", "tooltip")
            .style("visibility", "hidden")
            .style("position", "absolute")
            .style("width", "auto")
            .style("height", "auto")
            .style("box-shadow", "2px 2px 4px rgba(0, 0, 0, 0.2)")
            .style("border-radius", "2.5px")
            .style("padding", "12px")
            .style("text-align", "left")
            .style("vertical-align", "middle")
            .style("font-size", "14px")
            .style("background", "rgba(250, 250, 250, 0.9)")
            .style("color", "#374151");

          canvas
            .append("path")
            .classed("stateBorder", true)
            .attr("fill", "none")
            .attr("stroke", "#374151")
            .attr(
              "d",
              path(
                topojson.mesh(geoData, geoData.objects.states),
                (a, b) => a !== b,
              ),
            );

          const queryData = data?.data;

          if (queryData) {
            canvas
              .selectAll("path")
              .data(countyData)
              .enter()
              .append("path")
              .attr("d", d3.geoPath())
              .attr("class", "county")
              .attr("fill", (countyDataItem) => {
                let id = countyDataItem["id"];
                let county = queryData.find((item) => {
                  return item["County_of_Residence_FIPS"] == id;
                });
                if (county) {
                  let births = county["Births"];
                  if (births <= 250) {
                    return "#5eead4";
                  } else if (births <= 500) {
                    return "#2dd4bf";
                  } else if (births <= 1000) {
                    return "#14b8a6";
                  } else if (births <= 2500) {
                    return "#0d9488";
                  } else if (births <= 5000) {
                    return "#0f766e";
                  }
                } else {
                  return "#fff";
                }
              })
              .attr("data-fips", (countyDataItem) => {
                return countyDataItem["id"];
              })
              .attr("data-births", (countyDataItem) => {
                let id = countyDataItem["id"];
                let county = queryData.find((item) => {
                  return item["County_of_Residence_FIPS"] == id;
                });
                if (county) {
                  let births = county["Births"];
                  return births;
                }
                return null;
              })
              .on("mouseover", (event, countyDataItem) => {
                tooltip.transition().style("visibility", "visible");

                let id = countyDataItem["id"];

                let county = queryData.find((item) => {
                  return item["County_of_Residence_FIPS"] == id;
                });

                const tooltipText = county
                  ? `County of residence: ${county["County_of_Residence"]} <br/> Births: ${county["Births"]} <br/> Average age of mother: ${county["Ave_Age_of_Mother"]} yrs <br/> Average birth weight: ${county["Ave_Birth_Weight_gms"]} gms`
                  : "No birth data from this county";
                tooltip
                  .attr("data-births", "text")
                  .html(() => {
                    return `${tooltipText}`;
                  })
                  .style("left", event.clientX + 20 + "px")
                  .style("top", event.clientY - 40 + "px");
              })
              .on("mouseout", (event, countyDataItem) => {
                tooltip.transition().style("visibility", "hidden");
              });
          }
        };

        loading == false ? drawMap() : null;
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data, loading]);

  return (
    <div id="container">
      <svg id="canvas"></svg>
      <svg id="legend">
        <g>
          <rect
            x="10"
            y="40"
            width="10"
            height="60"
            fill="#0f766e"
            className="legend-rect"
          ></rect>
          <text x="30" y="75" className="legend-text">
            &ge;5000
          </text>
        </g>
        <g>
          <rect
            x="10"
            y="100"
            width="10"
            height="60"
            fill="#0d9488"
            className="legend-rect"
          ></rect>
          <text x="30" y="135" className="legend-text">
            2500
          </text>
        </g>
        <g>
          <rect
            x="10"
            y="160"
            width="10"
            height="60"
            fill="#14b8a6"
            className="legend-rect"
          ></rect>
          <text x="30" y="195" className="legend-text">
            1000
          </text>
        </g>
        <g>
          <rect
            x="10"
            y="220"
            width="10"
            height="60"
            fill="#2dd4bf"
            className="legend-rect"
          ></rect>
          <text x="30" y="255" className="legend-text">
            500
          </text>
        </g>
        <g>
          <rect
            x="10"
            y="280"
            width="10"
            height="60"
            fill="#5eead4"
            className="legend-rect"
          ></rect>
          <text x="30" y="315" className="legend-text">
            &le;250
          </text>
        </g>
      </svg>
      {loading == true ? <div id="spinner"></div> : <div></div>}
    </div>
  );
};

export default MapPlot;
