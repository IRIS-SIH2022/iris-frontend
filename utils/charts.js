import "../style.css";

document.getElementById("filter-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  const {
    case_number,
    StationID,
    act_type,
    primary_type,
    daterange,
    timerange,
  } = formProps;
  console.log(formProps);

  const requestBound = await fetch(
    `http://127.0.0.1:8000/station/${StationID}`
  );

  const boundaryData = await requestBound.json();

  const requestMarker = await fetch("http://127.0.0.1:8000/marker/request", {
    method: "POST",
    body: JSON.stringify(formProps),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const markerData = await requestMarker.json();
  console.log(markerData)
  // map.applyFilter(boundaryData, markerData, toggle);
});
const colorArray = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']

const jsonData = {
  'Murder': 10,
  'Rape': 12,
  'Chain Snatching': 44,
  'Kidnapping': 64
}

// const numberOfGraphs = 3;

// document.addEventListener("DOMContentLoaded", function (event) {
//   document.getElementById('nextGraphButton').onclick = nextGraph;
//   document.getElementById('prevGraphButton').onclick = prevGraph;
// });

function makeDoughnutChart(jsonData) {

  const categoryChartCTX = document.getElementById('doughnutChart');
  if(!categoryChartCTX)return;
  categoryChartCTX.getContext('2d');

  var xValues = Object.keys(jsonData);
  var yValues = Object.values(jsonData);
  var barColors = [];

  for (let i = 0; i < xValues.length; i++) {
    barColors.push(colorArray[i % 20]);
  }

  new Chart(categoryChartCTX, {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        borderColor: '#A9A9A9',
        fill: false,
        data: yValues
      }]
    },
    options: {
      elements: {
        line: {
          tension: 0
        }
      },
      legend: { display: false },
      title: {
        display: true,
        text: `Crime trend`
      }
    }
  });
}

function makePieChart(jsonData) {

const categoryChartCTX = document.getElementById('pieChart');
  if(!categoryChartCTX)return;
  categoryChartCTX.getContext('2d');
  
  if(!categoryChartCTX)return;
  var xValues = Object.keys(jsonData);
  var yValues = Object.values(jsonData);
  var barColors = [];

  for (let i = 0; i < xValues.length; i++) {
    barColors.push(colorArray[i % 20]);
  }

  new Chart(categoryChartCTX, {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        borderColor: '#A9A9A9',
        fill: false,
        data: yValues
      }]
    },
    options: {
      elements: {
        line: {
          tension: 0
        }
      },
      legend: { display: false },
      title: {
        display: true,
        text: `Crime trend`
      }
    }
  });
}

function makeLineChart(jsonData) {

  const categoryChartCTX = document.getElementById('lineChart');
  if(!categoryChartCTX)return;
  categoryChartCTX.getContext('2d');
  
  if(!categoryChartCTX)return;

  var xValues = Object.keys(jsonData);
  var yValues = Object.values(jsonData);
  var barColors = [];

  for (let i = 0; i < xValues.length; i++) {
    barColors.push(colorArray[i % 20]);
  }

  new Chart(categoryChartCTX, {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        borderColor: '#A9A9A9',
        fill: false,
        data: yValues
      }]
    },
    options: {
      elements: {
        line: {
          tension: 0
        }
      },
      legend: { display: false },
      title: {
        display: true,
        text: `Crime trend`
      }
    }
  });
}
// switch the graphs if no particular graph is selected

// if (flag == 1) {
//   setTimeout(() => {
//     nextGraph();
//   }, 7000)
// }

function makeGraph() {
  makeLineChart(jsonData);
  makePieChart(jsonData);
  makeDoughnutChart(jsonData)
}

makeGraph()


// const testChartData = { 'January': 200, 'Februrary': 300, 'March': 260, 'April': 800 }
// makeLineChart(testChartData)