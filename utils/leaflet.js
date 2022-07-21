import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "leaflet.heat";
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

var CartoDB_Voyager = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
  }
);

const CartoDB_Positron = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
  }
);

const baseMaps = {
  "Light Map": CartoDB_Positron,
  "Dark Map": CartoDB_DarkMatter,
  "Detailed Map": CartoDB_Voyager,
};

const createCustomMarker = (lat, lng, crime, crimeAge = 2, hoursDifference) => {
  const crimeColors = crimeJSON[crime];
  let HTMLdata = `<div  class='custom-pin'  style="height:${8}px; width:${8}px; background-color:${
    crimeColors["color"]
  };box-shadow: 0px 0px ${crimeAge + 1}px ${crimeAge}px ${
    crimeColors["color"]
  };"></div>`;

  let icon = L.divIcon({
    className: "custom-div-icon",
    html: HTMLdata,
  });

  //rings around latest crimes
  if (hoursDifference <= 44) {
    HTMLdata = `<div class='ring3' style="border: 1px solid ${
      crimeColors["color"]
    };">
      <div class='ring2' style="border: 1px solid ${crimeColors["color"]};">
        <div class='ring1' style="border: 1px solid ${crimeColors["color"]};">
          <div  class='custom-pin'  style="height:${8}px; width:${8}px; background-color:${
      crimeColors["color"]
    };box-shadow: 0px 0px ${crimeAge + 1}px ${crimeAge}px ${
      crimeColors["color"]
    };  position: absolute;
            top: 50%;
            left: 50%;
            margin-right: -50%;
            transform: translate(-50%, -50%) ">
          </div>
        </div>
      </div>
    </div>`;
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
    this.markers = [];
    this.boundaries = L.geoJSON([]);
    this.heatmapData = [];
    this.map = L.map("map", {
      attributionControl: false,
      layers: [CartoDB_DarkMatter],
      preferCanvas: true,
    }).setView(DEFAULT_LOCATION, DEFAULT_ZOOM);
    this.addControls();
    this.toggleControls();
    this.layerControl = L.control.layers(baseMaps).addTo(this.map);

    // add marker layer
    this.markerLayer = L.featureGroup().addTo(this.map);
    this.layerControl.addOverlay(this.markerLayer, "Markers");
    // add boundaries layer
    this.boundariesLayer = L.featureGroup().addTo(this.map);
    this.layerControl.addOverlay(this.boundariesLayer, "Boundaries");
    // add heatmap layer
    this.heatMapLayer = L.heatLayer(this.heatmapData, { radius: 20 });
    this.layerControl.addOverlay(this.heatMapLayer, "Heatmap");

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

    // listen overlay change event
    this.map.on("overlayadd", (e) => {
      console.log(e.name);
      if (e.name === "Heatmap" && this.heatmapData.length > 0) {
        this.addHeatmap();
      }
      if (e.name === "Markers" && this.markers.length > 0) {
        this.addMarkers();
      }
      if (e.name === "Boundaries") {
        this.addBoundaries();
      }
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
    L.control.scale({ imperial: false }).addTo(this.map);
  }

  toggleControls() {
    this.map.pm.toggleControls();
  }

  addBoundaries() {
    this.boundariesLayer.clearLayers();
    console.log("boundaries", this.boundaries);
    this.boundariesLayer.addLayer(this.boundaries);
    // this.changeView(this.boundaries.getBounds());
  }

  addMarkers() {
    this.markerLayer.clearLayers();
    this.markers.map((marker) => {
      this.markerLayer.addLayer(marker);
    });
  }

  addHeatmap() {
    this.heatMapLayer.setLatLngs(this.heatmapData);
  }

  changeView(bounds) {
    this.map.flyToBounds(bounds, {
      animation: true,
      duration: 1,
    });
  }

  clearMap() {
    this.boundaries = L.geoJSON();
    this.markers = [];
    this.heatmapData = [];
  }

  applyFilter(boundary, markers) {
    this.clearMap();

    if (boundary.length > 0) this.boundaries = L.geoJSON(boundary);
    else return;

    if (markers.length > 0)
      this.markers = markers.map((marker) => {
        let difference = Date.now() - marker.time * 1000;
        let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
        let crimeAge;
        if (hoursDifference <= 1) crimeAge = 3;
        else if (hoursDifference <= 24) crimeAge = 2;
        else crimeAge = 1;

        return createCustomMarker(
          marker.lat,
          marker.lng,
          marker.crime,
          crimeAge,
          hoursDifference
        );
      });

    // TODO - calculate heatmap data from markers or get it from the server
    // also add necessary checks for empty arrays
    this.heatmapData = heatmapData;

    if (this.map.hasLayer(this.heatMapLayer)) this.addHeatmap();
    if (this.map.hasLayer(this.markerLayer)) this.addMarkers();
    if (this.map.hasLayer(this.boundariesLayer)) this.addBoundaries();
    this.changeView(this.boundaries.getBounds());
  }
}

export default createMap;
