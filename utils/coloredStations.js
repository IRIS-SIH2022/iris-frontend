export const assignColor = (crimes) => {
  if (crimes > totalCrimes*0.3) {
    return 'red';
  }
  if (crimes > totalCrimes*0.25) { return 'orange'; }
  if (crimes > totalCrimes*0.2) { return 'yellow' }
  if (crimes > totalCrimes*0.1) { return '#90ee90' }
  return 'green';
}

let totalCrimes = 0;

export const stationDetails = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 0,
  14: 0,
  15: 0,
  16: 0,
  17: 0,
  18: 0,
  19: 0,
  20: 0,
  21: 0,
  22: 0
}

export const getPoliceStationWiseCrimes = (markersData) => {

  for (let i = 0; i < markersData.length; i++) {
    stationDetails[markersData[i]['StationID']]++;
    totalCrimes++;
  }

  // console.log(stationDetails)
}

// All this implemented in main.js
// function switchColor() {
//   if (toggle) {
//     toggle=0;
//     console.log('Checked')
//   }
//   else {
//     toggle=1
//     console.log('Unchecked')
//   }

// }

// let toggle=0;

// function colorStation() {
//   const element = document.getElementById('stationColorToggle');
//   element.onclick = switchColor;
// }



// colorStation();
