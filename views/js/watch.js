/* eslint-disable no-unused-vars */
var myVar, time
var pausedTime = 0
var resumedTime = 0
var pressedTime = (new Date).getTime()
function reset() {
  pressedTime = (new Date).getTime()
  resumedTime = 0
  pausedTime = 0
  document.getElementById("demo").innerHTML = "0:00:00.000"
}
function resume() {
  resumedTime = (new Date).getTime()
  myVar = setInterval(alertFunc, 1)
  document.getElementById("toggle").setAttribute("onclick", "pause()")
  document.getElementById("toggle").innerText = "󰏥"

}
function pause() {
  document.getElementById("toggle").setAttribute("onclick", "resume()")
  document.getElementById("toggle").innerText = "󰐌"
  clearInterval(myVar)
  pausedTime = (new Date).getTime()
}
// function myFunction() {
//   myVar = setInterval(alertFunc, 1)
//   pressedTime = (new Date).getTime()
// }
function alertFunc() {
  if (pausedTime !== 0 && resumedTime !== 0) {
    time = (new Date).getTime() - pressedTime + (pausedTime - resumedTime)
  } else {
    time = (new Date).getTime() - pressedTime
  }
  document.getElementById("demo").innerHTML = + String(Math.floor(time / 360000)).padStart(2, "0") + ":" + String(Math.floor(time / 60000)).padStart(2, "0") + ":" + String(Math.floor(time / 1000) % 60).padStart(2, "0") + "." + String(Math.floor(time) % 1000).padStart(3, "0")
}
