export const markerData = [
  {
    lat: 28.6139,
    lng: 77.209,
    crime: "Murder",
    time: 1658300783,
    intensity: "",
  },
  {
    lat: 28.6148,
    lng: 77.211,
    crime: "Murder",
    time: 1658201783,
    intensity: "",
  },
  {
    lat: 28.615,
    lng: 77.207,
    crime: "Assault",
    time: 1658302632,
    intensity: "",
  },
  {
    lat: 28.620799,
    lng: 77.212343,
    crime: "Assault",
    time: 1658101083,
    intensity: "",
  },
  {
    lat: 28.625,
    lng: 77.22,
    crime: "Murder",
    time: 1658000783,
    intensity: "",
  },
  {
    lat: 28.614,
    lng: 77.203,
    crime: "Assault",
    time: 1658130003,
    intensity: "",
  },
  {
    lat: 28.624,
    lng: 77.213,
    crime: "Drugs",
    time: 1658130003,
    intensity: "",
  },
  {
    lat: 28.629,
    lng: 77.213,
    crime: "Drugs",
    time: 1658130203,
    intensity: "",
  },
  {
    lat: 28.624,
    lng: 77.218,
    crime: "Other",
    time: 1658130003,
    intensity: "",
  },
  {
    lat: 28.609,
    lng: 77.218,
    crime: "Other",
    time: 1658130003,
    intensity: "",
  },

  {
    lat: 28.629,
    lng: 77.218,
    crime: "Burglary",
    time: 1658130003,
    intensity: "",
  },
  {
    lat: 28.617,
    lng: 77.22,
    crime: "Burglary",
    time: 1658302632,
    intensity: "",
  },
  {
    lat: 28.6139,
    lng: 77.219,
    crime: "Theft",
    time: 1658301783,
    intensity: "",
  },
];

export const geoJSONLayer = [
  {
    type: "Feature",
    properties: {
      id: "1",
      state: "Delhi",
      distict: "North Delhi",
      block: "Block 1",
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [77.206421, 28.627088],
          [77.218437, 28.61985],
          [77.212601, 28.61706],
          [77.212086, 28.610425],
          [77.208481, 28.612385],
          [77.205391, 28.610877],
          [77.201529, 28.611103],
          [77.201786, 28.617437],
          [77.199554, 28.617663],
          [77.199812, 28.623695],
          [77.206421, 28.627088],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "2",
      state: "Uttar Pradesh",
      distict: "Ghaziabad",
      block: "Block 2",
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [77.206421, 28.627088],
          [77.19861, 28.631762],
          [77.201872, 28.635908],
          [77.20582, 28.633646],
          [77.216463, 28.633043],
          [77.217836, 28.63048],
          [77.212697, 28.623308],
          [77.206421, 28.627088],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "3",
      state: "Delhi",
      distict: "CP",
      block: "Block 4",
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [77.218437, 28.61985],
          [77.227964, 28.615024],
          [77.227492, 28.611414],
          [77.217965, 28.60689],
          [77.212086, 28.610425],
          [77.212601, 28.61706],
          [77.218437, 28.61985],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: {
      id: "4",
      state: "Uttar Pradesh",
      distict: "Dadri",
      block: "Block 3",
    },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [77.217836, 28.63048],
          [77.222407, 28.631165],
          [77.22657, 28.628753],
          [77.223372, 28.626378],
          [77.225282, 28.622816],
          [77.218437, 28.61985],
          [77.212753, 28.623274],
          [77.217836, 28.63048],
        ],
      ],
    },
  },
];

export const mapFilter = geoJSONLayer.filter((item) => {
  return item.properties.block === "Block 1";
});

export const markerFilter = markerData.filter((item) => {
  return item.crime === "Assault";
});

export const crimeJSON = {
  Murder: {
    color: "#c30b82",
    intensity: 70,
  },
  Assault: {
    color: "#74D173",
    intensity: 40,
  },
  Theft: {
    color: "#00b5b9",
    intensity: 30,
  },
  Burglary: {
    color: "#f5df62",
    intensity: 30,
  },
  Drugs: {
    color: "#eb7953",
    intensity: 80,
  },
  Other: {
    color: "#a393d1",
    intensity: 50,
  },
};

let crimeHeatData = [];
for (let i = 0; i < markerData.length; i++) {
  let heatValue = [];
  heatValue.push(markerData[i]["lat"]);
  heatValue.push(markerData[i]["lng"]);
  heatValue.push(crimeJSON[markerData[i]["crime"]]["intensity"]);
  crimeHeatData.push(heatValue);
}

export const heatmapData = crimeHeatData;
