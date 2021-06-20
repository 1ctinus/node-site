var canvas = document.getElementById("myCanvas")
let width = canvas.getAttribute("width") / 2
var dataURL = ""
var ctx = canvas.getContext("2d");
document.fonts.load('16px "myFont"').then(function () {
  function refresh(conflict) {
    if (conflict.startsWith("http")) {
      let tempImg = document.createElement("img");
      tempImg.setAttribute("src", conflict)
      // console.log((800/this.height)*this.width)
      tempImg.onload = function () {
        canvas.width = (800 / this.height) * this.width
        ctx.drawImage(tempImg, 0, 0, (800 / this.height) * this.width, 800)
        text()
      }
    } else {
      if (conflict === "")
        conflict = "https://files.1ctinus.me/site/penguin.png"
      var myImage = new Image();
      myImage.crossOrigin = "Anonymous"
      myImage.src = conflict
      myImage.onload = function () {
        canvas.width = (800 / this.height) * this.width
        // console.log((800/this.height)*this.width)
        ctx.drawImage(myImage, 0, 0, (800 / this.height) * this.width, 800)
        text()
      }
    }
  }
  function getImage(file) {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      dataURL = reader.result;
      refresh(dataURL)
    }
  }
  // console.log("Font loaded");
  function text() {
    let fontSize = document.getElementById("font-size").value
    ctx.shadowColor = "black"
    ctx.fillStyle = "white"
    ctx.shadowBlur = 7 / 50 * fontSize;
    ctx.font = `${fontSize}px myFont`
    ctx.strokeStyle = "black"
    ctx.lineWidth = 4 / 50 * fontSize;
    ctx.textAlign = "center"
    let toptext = ((document.getElementById("top-text").value)).split("\n")
    let bottomtext = (document.getElementById("bottom-text").value).split("\n")
    width = canvas.getAttribute("width") / 2
    for (var j = 0; j < toptext.length; j++) {
      let value = document.getElementById("caps").checked ?
        toptext[j].toUpperCase() :
        toptext[j]
      ctx.strokeText(value, width, (j + 1) * fontSize);
      ctx.fillText(value, width, (j + 1) * fontSize);
    }
    for (var j = 0; j < bottomtext.length; j++) {
      let value = document.getElementById("caps").checked ?
        bottomtext[j].toUpperCase() :
        bottomtext[j]
      ctx.strokeText(value, width, (825 - bottomtext.length * fontSize) + j * fontSize);
      ctx.fillText(value, width, (825 - bottomtext.length * fontSize) + j * fontSize);
    }
  }
  refresh(dataURL)
  const inputElement = document.getElementById("file")
  inputElement.addEventListener("change", handleFiles, false)
  function handleFiles() {
    // console.log("f***")
    getImage(document.querySelector('input[type=file]').files[0])
    // myImage.onload = function () {
    // ctx.drawImage(myImage, 10, 10);
    // text()
    // }
  }
  window.addEventListener("paste", e => {
    let file = e.clipboardData.items[e.clipboardData.items.length - 1];
    if (file.kind === "file") { getImage(file.getAsFile()) }
  })
  let elems = ["top-text", "bottom-text", "font-size", "caps"]
  elems.forEach((item) =>
    document.getElementById(item).addEventListener('input', () => refresh(dataURL)
    )
  )
  document.getElementById("url-submit").addEventListener('click', function () {
    dataURL = document.getElementById("url").value
    refresh(document.getElementById("url").value)
  })
})
document.getElementById("save").addEventListener("click",
  function () {
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'meme.png');
    let dataURL = canvas.toDataURL('image/png');
    let url = dataURL
    downloadLink.setAttribute('href', url);
    downloadLink.click();
  }
)