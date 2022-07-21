import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "https://leaflet.github.io/Leaflet.heat/dist/leaflet-heat.js"
import { crimeJSON, heatmapData, markerData } from "./data";
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

const createCustomMarker = (lat, lng, crime, crimeAge = 2, hoursDifference) => {
  const crimeColors = crimeJSON[crime]
  let HTMLdata = `<div  class='custom-pin'  style="height:${8}px; width:${8}px; background-color:${crimeColors["color"]
    };box-shadow: 0px 0px ${crimeAge + 1}px ${crimeAge}px ${crimeColors["color"]};"></div>`

  let icon = L.divIcon({
    className: "custom-div-icon",
    html: HTMLdata,
  });

  //rings around latest crimes
  if (hoursDifference <= 24) {
    HTMLdata = 
    `<div class='ring3' style="border: 1px solid ${crimeColors["color"]};">
      <div class='ring2' style="border: 1px solid ${crimeColors["color"]};">
        <div class='ring1' style="border: 1px solid ${crimeColors["color"]};">
          <div  class='custom-pin'  style="height:${8}px; width:${8}px; background-color:${crimeColors["color"]
            };box-shadow: 0px 0px ${crimeAge + 1}px ${crimeAge}px ${crimeColors["color"]};  position: absolute;
            top: 50%;
            left: 50%;
            margin-right: -50%;
            transform: translate(-50%, -50%) ">
          </div>
        </div>
      </div>
    </div>`
    icon = L.divIcon({
      className: "custom-div-icon",
      html: HTMLdata,
    });
  }

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
    this.map = L.map("map", { attributionControl: false }).setView(
      DEFAULT_LOCATION,
      DEFAULT_ZOOM
    );
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

    //to show heatmap
    let heat = L.heatLayer(heatmapData, {radius: 20}).addTo(this.map);

    L.control.scale({ imperial: false }).addTo(this.map);
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

  toggleControls() {
    this.map.pm.toggleControls();
  }

  addBoundaries(geoJSON) {
    this.boundaries = L.geoJSON(geoJSON).addTo(this.map);
    this.changeView(this.boundaries.getBounds());
    this.setLoad = true;
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
    this.markers = markerData.map((marker) => {
      let difference = Date.now() - marker.time * 1000;
      let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
      let crimeAge;
      if (hoursDifference <= 1)
        crimeAge = 3;
      else if (hoursDifference <= 24)
        crimeAge = 2;
      else
        crimeAge = 1;

      console.log(crimeAge, hoursDifference)
      return createCustomMarker(marker.lat, marker.lng, marker.crime, crimeAge, hoursDifference)
    }
    );
    // add markers
    this.markers.map((marker) => {
      marker.addTo(this.map);
    });
  }

  applyFilter(boundary, markers) {
    this.clearMap();
    this.addMarkers(markers);
    this.addBoundaries(boundary);
  }
}

export default createMap;
