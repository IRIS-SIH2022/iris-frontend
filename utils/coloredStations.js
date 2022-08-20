export const assignColor = (crimes) => {
  if (crimes > 15000) {
    return 'red';
  }
  if (crimes > 8000) { return 'orange'; }
  if (crimes > 5000) { return 'yellow' }
  if (crimes > 2000) { return '#90ee90' }
  return 'green';
}

export const stationDetails = {
  1: 1000,
  2: 3000,
  3: 11000,
  4: 7000,
  5: 14000,
  6: 21000,
  7: 31000,
  8: 11000,
  9: 8000,
  10: 7000,
  11: 6000,
  12: 5000,
  13: 4000,
  14: 2000,
  15: 3000,
  16: 100,
  17: 9000,
  18: 11000,
  19: 13000,
  20: 16000,
  21: 17000,
  22: 1000,
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
