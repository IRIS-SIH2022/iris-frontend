import "./style.css";
import createMap from "./utils/leaflet";

// import { geoJSONLayer, mapFilter, markerFilter } from "./utils/data";

// import { delhiCrimeDataset } from "./utils/finalData";

// console.log(delhiCrimeDataset.length)

// import { allIndia } from "./utils/data.js";
// |
// |
// ---- uncomment this for the ditrict-wise visualization

let toggle = 0;

let map = new createMap();

// render blocks from geoJSONLayer
// const blocks = geoJSONLayer
//   .map((item) => {
//     const opt = document.createElement("option");
//     opt.value = item.name;
//     opt.innerText = item.name;
//     return opt;
//   })
//   .sort((a, b) => a.value.localeCompare(b.value));

// blocks.forEach((item) => {
//   document.getElementById("block").appendChild(item);
// });

document.getElementById("filter-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  const {case_number, StationID, act_type, primary_type, daterange, timerange } = formProps;
  console.log(formProps);

  // make request to backend
  // get geoJSON of markers and boundaries
  // apply filter to map

  const requestBound = await fetch(`http://127.0.0.1:8000/station/${StationID}`);

  const boundaryData = await requestBound.json();

  const requestMarker = await fetch("http://127.0.0.1:8000/marker/request", { 
    method: "POST",
    body: JSON.stringify(formProps), 
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const markerData = await requestMarker.json();
  
  map.applyFilter(boundaryData, markerData, toggle);
});

// function switchColor() {
//   if (toggle) {
//     toggle = 0;
//     map.applyFilter(geoJSONLayer, delhiCrimeDataset, toggle);
//   } else {
//     toggle = 1;
//     map.applyFilter(geoJSONLayer, delhiCrimeDataset, toggle);
//   }
// }

// function colorStation() {
//   const element = document.getElementById("stationColorToggle");
//   element.onclick = switchColor;
// }

// colorStation();
