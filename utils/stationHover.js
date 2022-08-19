export function showPoliceStationData(feature){
  //get area somehow and show that to add brownie points
  // console.log(feature.name, feature.stationID)
  document.getElementById('stationData').innerHTML = `
  <table style="width:100%">
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
  <td>${feature.stationID}</td>
  </tr>
  </table>
  `
}
