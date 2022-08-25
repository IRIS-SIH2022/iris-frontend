import "./style.css";
import { getPoliceStationWiseCrimes } from "./utils/coloredStations";
import createMap from "./utils/leaflet";

let toggle = 0;
let boundaryData;
let markerData;

let map = new createMap();

document.getElementById("filter-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  const {
    case_number,
    StationID,
    act_type,
    primary_type,
    daterange,
    timerange,
  } = formProps;
  console.log(formProps);

  // make request to backend
  // get geoJSON of markers and boundaries
  // apply filter to map

  const requestBound = await fetch(
    `http://127.0.0.1:8000/station/${StationID}`
  );

  boundaryData = await requestBound.json();

  const requestMarker = await fetch("http://127.0.0.1:8000/marker/request", {
    method: "POST",
    body: JSON.stringify(formProps),
    headers: {
      "Content-Type": "application/json",
    },
  });
  markerData = await requestMarker.json();
  getPoliceStationWiseCrimes(markerData);

  map.applyFilter(boundaryData, markerData, toggle);
});

function switchColor() {
  if (toggle) {
    toggle = 0;
    map.applyFilter(boundaryData, markerData, toggle);
  } else {
    toggle = 1;
    map.applyFilter(boundaryData, markerData, toggle);
  }
}

function colorStation() {
  const element = document.getElementById("stationColorToggle");
  element.onclick = switchColor;
}

colorStation();
