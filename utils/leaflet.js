import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "leaflet.heat";
import { crimeJSON } from "./data";
import { activateCCTV } from "./cctv";
import { showPoliceStationData } from "./stationHover";
import { assignColor, stationDetails } from "./coloredStations";
import { intensities, markerColors } from "./markerColoring";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const DEFAULT_LOCATION = [22.629799, 80.212343];
const DEFAULT_ZOOM = 5;
const BOUNDS = new L.latLngBounds(
  // new L.latLng(23.63936, 68.14712),
  // new L.latLng(28.20453, 97.34466)
  new L.latLng(37.148033, 74.577971),
  new L.latLng(8.086831, 77.513296)
);
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
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
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

const OpenStreetMap = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);

const baseMaps = {
  "Dark Map": CartoDB_DarkMatter,
  "Light Map": CartoDB_Positron,
  "Detailed Map": CartoDB_Voyager,
};

const createCustomMarker = (
  markerData,
  crimeAge = 2,
  hoursDifference,
  cctvId
) => {
  const crimeColors = markerColors[markerData['primary_type']];
  let HTMLdata = `<div  class='custom-pin'  style="height:${8}px; width:${8}px; background-color:${crimeColors
    };box-shadow: 0px 0px ${crimeAge + 1}px ${crimeAge}px ${crimeColors
    };"></div>`;

  let icon = L.divIcon({
    className: "custom-div-icon",
    html: HTMLdata,
  });

  //rings around latest crimes
  if (hoursDifference <= 44) {
    HTMLdata = `<div class='ring3' style="border: 1px solid ${crimeColors
      };">
      <div class='ring2' style="border: 1px solid ${crimeColors};">
        <div class='ring1' style="border: 1px solid ${crimeColors};">
          <div  class='custom-pin'  style="height:${8}px; width:${8}px; background-color:${crimeColors
      };box-shadow: 0px 0px ${crimeAge + 1}px ${crimeAge}px ${crimeColors
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

  const crime = markerData.crime;
  const newMarker = L.marker([markerData.lat, markerData.lng], {
    icon,
    crime,
  })
    .bindPopup(
      `<div><h3><strong>Case Number: </strong>${markerData["case_number"]}</h3><br><strong>Crime Type (Primary Type): </strong>${markerData["primary_type"]}<br><strong>Description: </strong>${markerData["description"]}<br><strong>Crime Date and Time: </strong>${markerData["date"]} and ${markerData['time']}</div>`
    )
    .on("click", function () {
      activateCCTV(cctvId);
    });

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
      minZoom: 5,
      maxBounds: BOUNDS,
    }).setView(DEFAULT_LOCATION, DEFAULT_ZOOM);
    this.addControls();
    this.toggleControls();
    this.layerControl = L.control.layers(baseMaps).addTo(this.map);

    // add marker layer
    this.markerLayer = L.featureGroup();
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
      geoJSONLayer.stationID = id;

      window.prompt(
        "Copy to clipboard: Ctrl+C, Enter",
        JSON.stringify(geoJSONLayer)
      );
    });

    // listen overlay change event
    this.map.on("overlayadd", (e) => {
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
    this.boundariesLayer.addLayer(this.boundaries);
  }

  addMarkers() {
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
    try {
      this.boundaries = L.geoJSON();
      this.markers = [];
      this.heatmapData = [];
      this.boundariesLayer.clearLayers();
      this.markerLayer.clearLayers();
      this.heatMapLayer.setLatLngs([]);
    } catch {
      console.log("error");
    }
  }

  applyFilter(boundary, markers, toggle) {
    this.clearMap();
console.log(markers.length);
    if (boundary.length > 0) {
      if (toggle) {
        this.boundaries = L.geoJSON(null, {
          style: function (feature) {
            return {
              color:assignColor(stationDetails[feature.StationID]) ,
              fill: true,
              opacity: 0.8,
            };
          },
          onEachFeature(feature, layer) {
            const currentColor = assignColor(stationDetails[feature.StationID]);
            layer.on("mouseover", function () {
              this.setStyle({
                fillColor: "grey",
                fill: true,
                opacity: 0.5
              });
              showPoliceStationData(feature);
            });
            layer.on("mouseout", function () {
              this.setStyle({
                fillColor: currentColor,
              });

            });
          },
        });
        this.boundaries.addData(boundary);
           }
      else {

        this.boundaries = L.geoJSON(null, {
          style: function (feature) {
            return {
              color: "blue",
              fill: true,
              opacity: 0.8,
            };
          },
          onEachFeature(feature, layer) {
            layer.on("mouseover", function () {
              this.setStyle({
                fillColor: "green",
                fill: true,
                opacity: 0.5
              });
              showPoliceStationData(feature);
            });
            layer.on("mouseout", function () {
              this.setStyle({
                fillColor: "blue",
              });

            });
          },
        });
        this.boundaries.addData(boundary);
      }
    } else {
      // if boundary not present then set default bounds
      this.changeView(BOUNDS);
      return;
    }

    if (markers.length > 0)
      this.markers = markers.map((marker) => {
        let difference = Date.now() - marker.time * 1000;
        let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
        let crimeAge;
        if (hoursDifference <= 1) crimeAge = 3;
        else if (hoursDifference <= 24) crimeAge = 2;
        else crimeAge = 1;
        return createCustomMarker(
          marker,
          crimeAge,
          hoursDifference,
          "#1234" // cctv id
        );
      });

    this.heatmapData = markers.map((item) => {
      let tmp = [];
      tmp.push(item["lat"]);
      tmp.push(item["lng"]);
      tmp.push(intensities[item['primary_type']])
      return tmp;
    });

    if (this.map.hasLayer(this.heatMapLayer)) this.addHeatmap();
    if (this.map.hasLayer(this.markerLayer)) this.addMarkers();
    if (this.map.hasLayer(this.boundariesLayer)) this.addBoundaries();
    this.changeView(this.boundaries.getBounds());
  }
}


export default createMap;
