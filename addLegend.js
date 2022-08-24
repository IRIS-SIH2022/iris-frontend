import { markerColors } from "./utils/markerColoring";

export const addLegend =  (map) => {
  console.log('adding legends')
  var legend = L.control({ position: 'bottomleft' });
  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    let labels = ['<strong>Categories</strong>'];

    for (let i in markerColors) {

      div.innerHTML +=
        labels.push(
          '<i class="circle" style="background:' + markerColors[i] + '"></i> ' +
          (markerColors[i]));

    }
    div.innerHTML = labels.join('<br>');
    return div;
  };
  legend.addTo(map);
}