export function activateCCTV(cctvID) {
  document.getElementById('cctvArea').innerHTML = `      
  <iframe width="200" height="200" src="https://www.youtube.com/embed/y881t8ilMyc" frameborder="0"></iframe>
  <h3>Playing video from the cctvID: ${cctvID}</h3>
`

}