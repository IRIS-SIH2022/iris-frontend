import "./style.css";
import createMap from "./utils/leaflet";

import {
  markerData,
  geoJSONLayer,
  mapFilter,
  markerFilter,
} from "./utils/data";

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

document.getElementById("filter-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  const { cctns, block, crime, act } = formProps;
  console.log(formProps);

  // make request to backend
  // get geoJSON of markers and boundaries
  // apply filter to map

  // temp code to check functionality
  if (cctns === "" && block === "all" && crime === "all") {
    map.applyFilter(geoJSONLayer, markerData);
  } else if (cctns === "" && block === "all" && crime !== "all") {
    map.applyFilter(geoJSONLayer, markerFilter);
  } else if (cctns === "" && block !== "all" && crime === "all") {
    map.applyFilter(mapFilter, markerFilter);
  } else if (cctns === "" && block !== "all" && crime !== "all") {
    map.applyFilter([], []);
  }
});
