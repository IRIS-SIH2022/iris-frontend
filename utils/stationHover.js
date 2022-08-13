export function showPoliceStationData(feature){
  //get area somehow and show that to add brownie points
  console.log(feature.name, feature.stationID)
  document.getElementById('stationData').innerHTML = `
  Police Station Name: ${feature.name}
  Police District: ${feature.district}
  Police Station Id: ${feature.stationID}
  `
}

export function clearPoliceStationData(){
  document.getElementById('stationData').innerHTML = `
  HOVER OVER THE REGION TO GET MORE INFO
  `
}