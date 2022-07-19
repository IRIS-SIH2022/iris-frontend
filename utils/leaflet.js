import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

const DEFAULT_LOCATION = [22.629799, 80.212343];
const DEFAULT_ZOOM = 5;

// dark map
const CartoDB_DarkMatter = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 20,
  }
);

const createCustomMarker = (lat, lng, crime, time) => {
  const crimeColors = { Murder: "#c30b82", Assault: "#74D173" };
  const icon = L.divIcon({
    className: "custom-div-icon",
    html: `<div  class='custom-pin'  style="height:${8}px; width:${8}px; background-color:${
      crimeColors[crime]
    };box-shadow: 0px 0px 3px 2px ${crimeColors[crime]};"></div>`,
  });
  const newMarker = L.marker([lat, lng], {
    icon,
    crime,
  }).bindPopup("Some info");

  return newMarker;
};

class createMap {
  constructor() {
    this.setLoad = false;
    this.markers = [];
    this.boundaries = [];
    this.map = L.map("map");
    this.map.setView(DEFAULT_LOCATION, DEFAULT_ZOOM);
    CartoDB_DarkMatter.addTo(this.map);
    this.addControls();
    this.toggleControls();

    // get geoJSON of geoman
    this.map.on("pm:create", function (e) {
      let id = 12334; // generate uuid for the polygon
      let geoJSONLayer = e.layer.toGeoJSON();
      geoJSONLayer.properties.id = id;

      window.prompt(
        "Copy to clipboard: Ctrl+C, Enter",
        JSON.stringify(geoJSONLayer)
      );
    });
  }

  addControls() {
    this.map.pm.addControls({
      position: "topleft",
      drawCircleMarker: false,
      drawRectangle: false,
      drawCircle: false,
      drawPolyline: false,
      drawText: false,
      dragMode: false,
      rotateMode: false,
      cutPolygon: false,
    });
  }

  addCustomControls() {
    L.Control.CustomControl = L.Control.extend({
      options: {
        position: "topright",
      },
      onAdd: function (map) {
        var container = L.DomUtil.create("div", "leaflet-bar clear-map");
        container.innerHTML = `
          <button class="bg-white" onclick="loadData()">Load Data</button>
          <button class="bg-white" id="clear-map">Clear Map</button>
          <button class="bg-white" onclick="filterMap()">Filter Block</button>
          <button class="bg-white" onclick="filterMarker()">Filter Marker</button>
          <button class="bg-white" onclick="toggleGeoman()">Toggle Controls</button>`;
        return container;
      },
    });
    L.control.CustomControl = function (options) {
      return new L.Control.CustomControl(options);
    };
    L.control.CustomControl().addTo(this.map);
  }

  toggleControls() {
    this.map.pm.toggleControls();
  }

  addBoundaries(geoJSON) {
    if (!this.setLoad) {
      this.boundaries = L.geoJSON(geoJSON).addTo(this.map);
      this.changeView(this.boundaries.getBounds());
      this.setLoad = true;
    }
  }

  changeView(bounds) {
    this.map.flyToBounds(bounds, {
      animation: true,
      duration: 1,
    });
  }

  clearMap() {
    // clear markers
    this.markers.map((marker) => {
      marker.remove();
    });
    this.map.removeLayer(this.boundaries);
    this.setLoad = false;

    this.boundaries = [];
    this.markers = [];
  }

  addMarkers(markerData) {
    this.markers = markerData.map((marker) =>
      createCustomMarker(marker.lat, marker.lng, marker.crime, marker.time)
    );
    // add markers
    this.markers.map((marker) => {
      marker.addTo(this.map);
    });
  }
}

export default createMap;
