/* eslint-disable no-unused-vars */
// https://robkendal.co.uk/blog/2020-04-17-saving-text-to-client-side-file-using-vanilla-js
const downloadToFile = (content, filename, contentType) => {
  const a = document.createElement("a")
  const file = new Blob([content], { type: contentType })

  a.href = URL.createObjectURL(file)
  a.download = filename
  a.click()

  URL.revokeObjectURL(a.href)
}
document.querySelector("#btnSave").addEventListener("click", () => {
  const textArea = document.querySelector("textarea")

  downloadToFile(textArea.value, "note.txt", "text/plain")
})
var observe
if (window.attachEvent) {
  observe = function (element, event, handler) {
    element.attachEvent("on" + event, handler)
  }
}
else {
  observe = function (element, event, handler) {
    element.addEventListener(event, handler, false)
  }
}
var text = document.getElementById("text")
function resize() {
  text.style.height = "auto"
  text.style.height = text.scrollHeight + "px"
}
/* 0-timeout to get the already changed text */
function delayedResize() {
  window.setTimeout(resize, 0)
}
observe(text, "change", resize)
observe(text, "cut", delayedResize)
observe(text, "paste", delayedResize)
observe(text, "drop", delayedResize)
observe(text, "keydown", delayedResize)

text.focus()
text.select()
resize()
if (window.localStorage) {
  const input = document.getElementById("text")
  input.value = localStorage.value || ""
  input.addEventListener("input", function () {
    localStorage.setItem("value", input.value)
    if (input.value == "camel"){
      document.body.style.backgroundImage = "url(https://upload.wikimedia.org/wikipedia/commons/c/c0/Wild_Bactrian_camel_on_road_east_of_Yarkand.jpg)"
      input.value = "Happy Hump Day!"
    } else {
      document.body.style.backgroundImage = "none"
    }
  }
  )
}
// document.querySelector("textarea").style.fontSize = "20px"
// document.querySelector("textarea").style.backgroundSize = "24px 24px, 24px 24px"
function toggleSpellCheck() {
  const value = document.getElementById("text").getAttribute("spellcheck")
  document.getElementById("text").setAttribute("spellcheck", value == false ? "true" : "false")
}
const inputElement = document.getElementById("file")
inputElement.addEventListener("change", handleFiles, false)
function handleFiles() {
  // const fileList = this.files
  const file = document.getElementById("file").files[0]
  if (file) {
    var reader = new FileReader()
    reader.readAsText(file, "UTF-8")
    reader.onload = function (evt) {
      document.querySelector("textarea").value = evt.target.result
    }
    reader.onerror = function (evt) {
      document.querySelector("textarea").value = "error reading file"
    }
  }
}
function copyToClipboard() {
  var copyText = document.getElementById("text")
  copyText.select()
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy")
}