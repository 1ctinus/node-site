var c = document.querySelector("canvas")
var ctx = c.getContext("2d");
document.fonts.load('30px "inter"').then(function () {
ctx.font = "30px inter";
function init() {
  ctx.fillStyle = "#FFF"
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = document.querySelector("#color").value
  ctx.strokeStyle = document.querySelector("#color").value
  ctx.beginPath();
  ctx.lineWidth = 30
  ctx.arc(250, 250, 230, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.lineWidth = 15
  ctx.lineCap = "round";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle"; 
  for (i = 0; i < Math.PI * 2; i += Math.PI / 6) {
    ctx.beginPath()
    if (document.querySelector("#digits").checked) {
      ctx.fillText(
        (Math.round(i * (6 / Math.PI)) === 0) ? 12 : Math.round(i * (6 / Math.PI)),
        500 - (250 + 190 * - Math.sin(i)),
        250 + 190 * -  Math.cos(i));
    } else {
      ctx.moveTo(250 + 200 * Math.sin(i), 250 + 200 * Math.cos(i));
      ctx.lineTo(250 + 170 * Math.sin(i), 250 + 170 * Math.cos(i));
      ctx.stroke()
    }

  }
  let minLength = (document.querySelector("#digits").checked) ? 160 : 200
  ctx.lineWidth = 20
  let d = new Date()
  let hours = !(document.querySelector("#snap").checked) ? (d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600) * (Math.PI / 6) : (d.getHours()) * (Math.PI / 6)
  //let hours = (d.getHours()+d.getMinutes()/60+d.getSeconds()/3600)*(Math.PI/6)
  let minutes = !(document.querySelector("#snap").checked) ? (d.getMinutes() / 5 + d.getSeconds() / 300) * (Math.PI / 6) : (Math.floor(d.getMinutes() / 5)) * (Math.PI / 6)
  //let minutes = (d.getMinutes()/5+d.getSeconds()/300)*(Math.PI/6)
  console.log(Math.floor(d.getMinutes() / 5))
  ctx.beginPath()
  ctx.moveTo(250, 250);
  ctx.lineTo(250 + 100 * Math.sin(-1 * hours + Math.PI), 250 + 100 * Math.cos(-hours + Math.PI));
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(250, 250);
  ctx.lineTo(250 + minLength * Math.sin(-1 * minutes + Math.PI), 250 + minLength * Math.cos(-1 * minutes + Math.PI));
  ctx.stroke()
  ctx.lineWidth = 8
  if ((document.querySelector("#seconds").checked)) {
    let seconds = (document.querySelector("#snap").checked) ? (Math.floor(d.getSeconds() / 5)) * (Math.PI / 6) : (d.getSeconds() / 5) * (Math.PI / 6)
    ctx.beginPath()
    ctx.moveTo(250, 250);
    ctx.lineTo(250 + 200 * Math.sin(-1 * seconds + Math.PI), 250 + 200 * Math.cos(-1 * seconds + Math.PI));
    ctx.stroke()
  }
}
init()
document.querySelector("#snap").addEventListener("input", () => init())
setInterval(function () { init() }, 1000);
})