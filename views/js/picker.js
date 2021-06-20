/*
If you are seeing this in the future, i would like to 
apologize. this code is an unreadable disaster.
I wrote in two days, one of which i had a fever late at night. 
 This includes:
 - Nonsense functions
 - Nonsense variables
 - Repetitive code
 - Copied Code
*/
let canvas = document.querySelector('#example')
let ctx = canvas.getContext("2d")
// set up some sample squares with random colors
var context = canvas.getContext('2d');
let glass = document.createElement("DIV");
let zoom = 8
glass.setAttribute("class", "img-magnifier-glass");
/*insert magnifier glass:*/
canvas.parentElement.insertBefore(glass, canvas);
function findPos(obj) {
  var curleft = 0, curtop = 0;
  do {
    curleft += obj.offsetLeft;
    curtop += obj.offsetTop;
  } while (obj = obj.offsetParent);
  return { x: curleft, y: curtop };
  // return undefined;
}
function pickColor(mouse) {
  var pos = findPos(mouse);
  let offset = canvas.getBoundingClientRect()
  var x = mouse.clientX - offset.left
  var y = mouse.clientY - offset.top
  var c = canvas.getContext('2d');
  var p = c.getImageData(x, y, 1, 1).data;
  var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
  document.querySelector('#hex').innerHTML = hex
  document.querySelector('#rgb').innerHTML = `rgb(${p[0]},${p[1]},${p[2]})`
  document.querySelector('#color-pre').style.backgroundColor = hex
  // let color = document.querySelector("#color")
  // let left = mouse.offsetX;
  // let top = mouse.offsetY;
}
canvas.addEventListener('mousemove', e => {
  pickColor(e)
})
function copyColor(e, f) {
  navigator.clipboard.writeText(e.parentElement.parentElement.children[f].innerText)
}
glass.addEventListener('click', e => {
  let offset = canvas.getBoundingClientRect()
  let newTR = document.createElement("TR")
  let data = canvas.getContext('2d').getImageData(e.clientX - offset.left, e.clientY - offset.top, 1, 1).data
  let hex = "#" + ("000000" + rgbToHex(data[0], data[1], data[2])).slice(-6)
  newTR.innerHTML = `<td class="color" style="--i:${hex}"></td><td>${hex}</td>
<td><button onclick="copyColor(event.target, 1)">Copy</button></td>
<td>rgb(${data[0]},${data[1]},${data[2]})</td>
<td><button onclick="copyColor(event.target, 3)">Copy</button><td>`
  document.getElementById("saved").appendChild(newTR);
})
function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255)
    throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}

function refresh(conflict) {
  if (conflict.startsWith("http")) {
    let tempImg = document.createElement("img");
    tempImg.setAttribute("src", conflict)
    tempImg.setAttribute("crossorigin", "anonymous");
    // console.log((800/this.height)*this.width)
    tempImg.onload = function () {
      canvas.width = (800 / this.height) * this.width
      ctx.drawImage(tempImg, 0, 0, (800 / this.height) * this.width, 800)
      glass.style.backgroundSize = (canvas.width * zoom) + "px " + (canvas.height * zoom) + "px";
    }
  } else {
    if (conflict === "")
      conflict = "https://cdn.pixabay.com/photo/2011/12/13/14/31/earth-11015_960_720.jpg"
    var myImage = new Image();
    myImage.setAttribute("crossorigin", "anonymous");
    myImage.crossOrigin = "anonymous";
    myImage.src = conflict
    myImage.onload = function () {
      canvas.width = (800 / this.height) * this.width
      // console.log((800/this.height)*this.width)
      ctx.drawImage(myImage, 0, 0, (800 / this.height) * this.width, 800)
      glass.style.backgroundSize = (canvas.width * zoom) + "px " + (canvas.height * zoom) + "px";

    }
  }
  glass.style.backgroundImage = `url("${conflict}")`
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;
}
function getImage(file) {
  var reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    dataURL = reader.result;
    refresh(dataURL)
  }
}
document.getElementById("url-submit").addEventListener('click', function () {
  dataURL = document.getElementById("url").value
  refresh(document.getElementById("url").value)
})
window.addEventListener("paste", e => {
  let file = e.clipboardData.items[e.clipboardData.items.length - 1];
  if (file.kind === "file") { getImage(file.getAsFile()) }
})
refresh("")
var w, h, bw;
/*create magnifier glass:*/
/*set background properties for the magnifier glass:*/
glass.style.backgroundImage = "url(https://cdn.pixabay.com/photo/2011/12/13/14/31/earth-11015_960_720.jpg)"
glass.style.backgroundRepeat = "no-repeat";
glass.style.backgroundSize = (canvas.width * zoom) + "px " + (canvas.height * zoom) + "px";
bw = 3;
w = glass.offsetWidth / 2;
h = glass.offsetHeight / 2;
/*execute a function when someone moves the magnifier glass over the image:*/
glass.addEventListener("mousemove", moveMagnifier);
glass.addEventListener("mousemove", (e) => { pickColor(e) });
canvas.addEventListener("mousemove", moveMagnifier);
/*and also for touch screens:*/
glass.addEventListener("touchmove", moveMagnifier);
canvas.addEventListener("touchmove", moveMagnifier);
function moveMagnifier(e) {
  var pos, x, y;
  /*prevent any other actions that may occur when moving over the image*/
  // e.preventDefault();
  /*get the cursor's x and y positions:*/
  pos = getCursorPos(e);
  x = pos.x;
  y = pos.y;
  /*prevent the magnifier glass from being positioned outside the image:*/
  if (x > canvas.width - (w / zoom)) { x = canvas.width - (w / zoom); }
  if (x < w / zoom) { x = w / zoom; }
  if (y > canvas.height - (h / zoom)) { y = canvas.height - (h / zoom); }
  if (y < h / zoom) { y = h / zoom; }
  /*set the position of the magnifier glass:*/
  glass.style.left = (x - w) + "px";
  glass.style.top = (y - h) + "px";
  // console.log([x,y,w,h])
  /*display what the magnifier glass "sees":*/
  glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
}
function getCursorPos(e) {
  var a, x = 0, y = 0;
  e = e || window.event;
  /*get the x and y positions of the image:*/
  a = canvas.getBoundingClientRect();
  /*calculate the cursor's x and y coordinates, relative to the image:*/
  x = e.pageX - a.left;
  y = e.pageY - a.top;
  /*consider any page scrolling:*/
  x = x - window.pageXOffset;
  y = y - window.pageYOffset;
  return { x: x, y: y };
}
document.querySelector("#size").addEventListener("input", ()=>{
  size = document.querySelector("#size").value
  glass.style.width = size + "px"
  glass.style.height = size + "px"
  w = glass.offsetWidth / 2;
h = glass.offsetHeight / 2;
  
})