import "./style.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

let map = L.map("map", {
  attributionControl: false,
  center: new L.LatLng(22.6297, 80.2123),
  zoom: 4,
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 20,
}).addTo(map);

const addSingleMarker = (lat, lng) => {
  const marker = new L.Marker([lat, lng]);
  marker.addTo(map);
  console.log(lat, lng);
  map.flyTo([lat, lng], 15);
};

const photoUpload = document.getElementById("photo-upload");

const sendPic = () => {
  const file = photoUpload.files[0];
  console.log(file);
};

let allowGeo = false;

const getLocationConstant = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
  } else {
    alert("Your browser or device doesn't support Geolocation");
  }
};

const onGeoSuccess = (event) => {
  document.getElementById("lat").value = event.coords.latitude;
  document.getElementById("long").value = event.coords.longitude;
  document.getElementById("location").value =
    event.coords.latitude + ", " + event.coords.longitude;
  allowGeo = true;
  addSingleMarker(event.coords.latitude, event.coords.longitude);
};

// If something has gone wrong with the geolocation request
const onGeoError = (event) => {
  alert("Please enable location services");
};

getLocationConstant();

photoUpload.addEventListener("change", sendPic, false);

document.getElementById("report-form").addEventListener("submit", (e) => {
  if (!allowGeo) {
    alert("Please enable location to submit form");
    return;
  }

  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  console.log(formProps);
});
