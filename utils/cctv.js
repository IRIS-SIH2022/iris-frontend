async function getCCTVStreamFromID(cctvID){
  
  // something to get stream from the cctv using the cctv id
  const url = 'https://www.youtube.com/watch?v=JHu2YuadxKg'

  return url;
}

export async function activateCCTV(cctvID) {
  const url = await getCCTVStreamFromID(cctvID)

  document.getElementById('cctvArea').innerHTML = `      
  <iframe width="100%" height="80%" src="${url}" frameborder="0"></iframe>
  <div class = "text-left font-bold text-l text-black dark:text-white">Playing video from the cctvID: ${cctvID}</div>
`
}