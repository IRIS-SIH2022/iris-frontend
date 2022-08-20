import "./style.css";
import createMap from "./utils/leaflet";

import { geoJSONLayer, mapFilter, markerFilter } from "./utils/data";

import { delhiCrimeDataset } from "./utils/delhiCrimeData";

// import { allIndia } from "./utils/data.js";
// |
// |
// ---- uncomment this for the ditrict-wise visualization

let map = new createMap();

// render blocks from geoJSONLayer
const blocks = geoJSONLayer
  .map((item) => {
    const opt = document.createElement("option");
    opt.value = item.name;
    opt.innerText = item.name;
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
    map.applyFilter(geoJSONLayer, delhiCrimeDataset);
  } else if (cctns === "" && block === "all" && crime !== "all") {
    map.applyFilter(geoJSONLayer, markerFilter);
  } else if (cctns === "" && block !== "all" && crime === "all") {
    map.applyFilter(mapFilter, markerFilter);
  } else if (cctns === "" && block !== "all" && crime !== "all") {
    map.applyFilter([], []);
  }
});


function switchColor() {
  if (toggle) {
    toggle=0;
    map.applyFilter(geoJSONLayer,delhiCrimeDataset,toggle)
  }
  else {
    toggle=1
    map.applyFilter(geoJSONLayer,delhiCrimeDataset,toggle)
  }

}

let toggle=0;

function colorStation() {
  const element = document.getElementById('stationColorToggle');
  element.onclick = switchColor;
}

colorStation();

