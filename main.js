import "./style.css";
import createMap from "./utils/leaflet";
import { markerData, geoJSONLayer } from "./utils/data";

let map = new createMap();
map.addBoundaries(geoJSONLayer);
map.addMarkers(markerData);
// map.clearMap();

function clearMapBtn() {
  map.clearMap();
}

document.getElementById("clear-map").addEventListener("click", clearMapBtn);

function filterMap() {
  clearMap();
  // filter data to add to map - polygon
  let filteredData = L.geoJSON(geoJSONLayer, {
    filter: function (feature, layer) {
      return feature.properties.block === "Block 1";
    },
  });
  // add polygon to map
  filteredData.addTo(map);

  changeView(filteredData.getBounds());

  filteredData = filteredData.toGeoJSON().features[0];

  // find points inside polygon
  let points = markers.filter((marker) => {
    return turf.booleanPointInPolygon(
      Object.values(marker.getLatLng()).reverse(),
      filteredData
    );
  });

  // add markers to map
  points.map((marker) => {
    marker.addTo(map);
  });
}

function filterMarker() {
  clearMap();
  let boundaries = loadBoundaries();
  let filteredData = markers.filter(
    (marker) => marker.options.crime == "Assault"
  );
  filteredData.map((marker) => {
    marker.addTo(map);
  });
  changeView(boundaries.getBounds());
}

function toggleGeoman() {
  map.pm.toggleControls();
}
