var image = document.getElementById("img1")
var video = document.querySelector("#videoElement")
if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({
    
    video: {
      height: {min: 720, ideal: 1920},
      width: {min: 1280, ideal: 1080}
    }
  })
    .then(function(stream) {
      video.srcObject = stream
    })
    .catch(function(error) {
      console.log(error)
    })
}

function getImage() {
  var canvas = canvas = document.createElement("canvas")
  var rect = video.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height
  var ctx = canvas.getContext("2d")
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  const dataURL = canvas.toDataURL("image/png")
  if(document.getElementById("img2").getAttribute("src") !== null){
    document.getElementById("img3").setAttribute("src", document.getElementById("img2").getAttribute("src"))
    document.getElementById("img3").style.display = "initial"
  } else {
    document.getElementById("img3").style.display = "none"
  }
  if(document.getElementById("img1").getAttribute("src") !== null){
    document.getElementById("img2").setAttribute("src", document.getElementById("img1").getAttribute("src"))
    document.getElementById("img2").style.display = "initial"
  } else {
    document.getElementById("img2").style.display = "none"
  }
  image.setAttribute("src", dataURL)
}
// https://robkendal.co.uk/blog/2020-04-17-saving-text-to-client-side-file-using-vanilla-js
function download(img){
  var a = document.createElement("a")
  a.download = "myimage.png"
  a.href = document.getElementById(img).src
  a.click()
}
document.getElementById("img1").onclick= function(){download("img1")}
document.getElementById("img2").onclick= function(){download("img2")}
document.getElementById("img3").onclick= function(){download("img3")}
document.getElementById("download").onclick= function(){download("img1")}
document.getElementById("get-image").onclick = function(){getImage()}