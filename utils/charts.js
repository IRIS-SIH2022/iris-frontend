let position = 0;

const jsonData = {
  'Murder': 10,
  'Rape': 12,
  'Chain Snatching': 44,
  'Kidnapping': 64
}

const numberOfGraphs = 3;

document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById('nextGraphButton').onclick = nextGraph;
  document.getElementById('prevGraphButton').onclick = prevGraph;
});

function makeDoughnutChart(jsonData) {

  const colorArray = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']

  const categoryChartCTX = document.getElementById('chartArea').getContext('2d');

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

  const colorArray = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']

  const categoryChartCTX = document.getElementById('chartArea').getContext('2d');

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

  const colorArray = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']

  const categoryChartCTX = document.getElementById('chartArea').getContext('2d');

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

function nextGraph() {
  position = (position + 1) % numberOfGraphs;
  makeGraph();
  shuffleChart();
}
function prevGraph() {
  position = position - 1;
  if (position == -1)
    position = numberOfGraphs;
  makeGraph();
  shuffleChart();
}

let flag = 1;

function shuffleChart() {
  // hold the graph for 30 seconds before shuffling
  flag == 0;
  setTimeout(() => {
    flag == 1;
  }, 30000);
}
// switch the graphs if no particular graph is selected

  if (flag == 1) {
    setTimeout(() => {
      nextGraph();
    }, 7000)
  }

function makeGraph() {
  switch (position) {
    case 0:
      makeLineChart(jsonData);
      break;
    case 1:
      makePieChart(jsonData);
      break;
    case 2:
      makeDoughnutChart(jsonData)
      break;
    default:
      break;
  }
}


const testChartData = { 'January': 200, 'Februrary': 300, 'March': 260, 'April': 800 }
makeLineChart(testChartData)