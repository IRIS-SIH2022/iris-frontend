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
  map.flyTo([lat, lng], 15);
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

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

let media =
  "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png";

document.getElementById("report-form").addEventListener("submit", async (e) => {
  if (!allowGeo) {
    alert("Please enable location to submit form");
    return;
  }

  // e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  const now = new Date();
  formProps.date =
    now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear();
  formProps.time = now.getHours() + "" + now.getMinutes();
  formProps.image = media;
  formProps.primary_type = "";
  formProps.act_type = "";
  formProps.verified = 0;

  const request = await fetch("http://15.206.153.179:8000/crowd_post", {
    method: "POST",
    body: JSON.stringify(formProps),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await request.json();
  console.log(response);
  // clear form
  // alert("Sent successfully")
  document.getElementById("report-form").reset();
});

let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");

camera_button.addEventListener("click", async function () {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  video.srcObject = stream;
});

click_button.addEventListener("click", function () {
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  let image_data_url = canvas.toDataURL("image/jpeg");

  // data url of the image
  media = image_data_url;
});
