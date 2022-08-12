export function showPoliceStationData(feature){
  //get area somehow and show that to add brownie points
  console.log(feature.properties.name, feature.properties.stationID)
  document.getElementById('stationData').innerHTML = `
  Police Station Name: ${feature.properties.name}
  Police District: ${feature.properties.district}
  Police Station Id: ${feature.properties.stationID}
  `
}

export function clearPoliceStationData(){
  document.getElementById('stationData').innerHTML = `
  HOVER OVER THE REGION TO GET MORE INFO
  `
}