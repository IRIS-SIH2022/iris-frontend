import "./style.css";
import createMap from "./utils/leaflet";

import {
  markerData,
  geoJSONLayer,
  mapFilter,
  markerFilter,
} from "./utils/data";

let map = new createMap();

function clearMapBtn() {
  map.clearMap();
}

function filterMapBtn() {
  map.applyFilter(mapFilter, markerFilter);
}

function filterMarkerBtn() {
  map.applyFilter(geoJSONLayer, markerFilter);
}

function loadDataBtn() {
  map.applyFilter(geoJSONLayer, markerData);
}

document
  .getElementById("filter-marker")
  .addEventListener("click", filterMapBtn);
document
  .getElementById("filter-map")
  .addEventListener("click", filterMarkerBtn);
document.getElementById("clear-map").addEventListener("click", clearMapBtn);
document.getElementById("load-data").addEventListener("click", loadDataBtn);
