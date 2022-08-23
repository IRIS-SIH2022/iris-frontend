import { stationDetails } from "./coloredStations";

export function showPoliceStationData(feature){
  //get area somehow and show that to add brownie points
  document.getElementById('stationData').innerHTML = `
  <table style="width:100%; padding:10px; margin:10px">
  <tr>
  <th>Property</th>
  <th>Value</th>
  </tr>
  <tr>
  <td>Police Station Name</td>
  <td>${feature.name}</td>
  </tr>
  <tr>
  <td>Police District</td>
  <td>${feature.district}</td>
  </tr>
  <tr>
  <td>Police Station Id</td>
  <td>${feature.StationID}</td>
  </tr>
  <tr>
  <td>SHO</td>
  <td>${feature.sho}</td>
  </tr>
  <tr>
  <td>Total Crimes</td>
  <td>${stationDetails[feature.StationID]}</td>
  </tr>
  
  </table>
  `
}
