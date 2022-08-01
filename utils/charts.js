import Chart from 'chart.js';


function makeChartCategoryTrends(jsonData, categoryName) {
  document.getElementById('categoryCharts').style.height = '300px';
  document.getElementById('categoryCharts').innerHTML = `
  <div class="chartTrend">
    <canvas id="categoryChart" style="width: 85%; height: 300px;display: inline-block;"></canvas>
  </div>
  `
  const colorArray = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']

  categoryChartCTX = document.getElementById('categoryChart').getContext('2d');

  var xValues = Object.keys(jsonData);
  var yValues = Object.values(jsonData);
  var barColors = [];

  for (i = 0; i < xValues.length; i++) {
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
        text: `Monthly Trends for ${categoryName}`
      }
    }
  });
}
