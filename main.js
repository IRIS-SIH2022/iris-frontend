import "./style.css";
import createMap from "./utils/leaflet";

import {
  markerData,
  geoJSONLayer,
  mapFilter,
  markerFilter,
} from "./utils/data";

import {allIndia } from "./utils/india_taluk"

// import { allIndia } from "./utils/data.js";
// |
// |
// ---- uncomment this for the ditrict-wise visualization

let map = new createMap();

// render blocks from geoJSONLayer
const blocks = geoJSONLayer
  .map((item) => {
    const opt = document.createElement("option");
    opt.value = item.properties.block;
    opt.innerText = item.properties.block;
    return opt;
  })
  .sort((a, b) => a.value.localeCompare(b.value));

blocks.forEach((item) => {
  document.getElementById("block").appendChild(item);
});

document.getElementById("filter-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  const { cctns, block, crime, act } = formProps;
  console.log(formProps);

  // make request to backend
  // get geoJSON of markers and boundaries
  // apply filter to map

  // const request = await fetch(
  //   `/api/v1/filter?cctns=${cctns}&block=${block}&crime=${crime}&act=${act}`
  // );
  // const data = await request.json();
  // map.applyFilter(data.boundaryData, data.markerData);

  // temp code to check functionality
  if (cctns === "" && block === "all" && crime === "all") {
    map.applyFilter(allIndia.features, markerData);
  } else if (cctns === "" && block === "all" && crime !== "all") {
    map.applyFilter(geoJSONLayer, markerFilter);
  } else if (cctns === "" && block !== "all" && crime === "all") {
    map.applyFilter(mapFilter, markerFilter);
  } else if (cctns === "" && block !== "all" && crime !== "all") {
    map.applyFilter([], []);
  }
});
