// trash code down here. what the hell is this
function deleteRow(e) {
  console.log(e)
  e.parentNode.parentNode.removeChild(e.parentNode)
}
function addRow() {
  var node = document.createElement("span")
  node.setAttribute("class", "container-l")
  node.innerHTML = "<li contenteditable=\"true\"></li><button class=\"del\" >X</button></div>"
  document.getElementById("list").appendChild(node)
  console.log(node.childNodes[1])
  node.childNodes[1].addEventListener("click", function () {
    deleteRow(event.target || event.srcElement)
    localStorage.setItem("innerHTML", getObj())
  })
  node.childNodes[0].addEventListener("input", function (){
    if (node.childNodes[0].innerHTML == "<br>") {
      node.childNodes[0].innerHTML = ""
    }
    localStorage.setItem("innerHTML", getObj())
  })
}
function getObj() {
  return document.getElementById("list").innerHTML
}
if (window.localStorage) {
  const input = document.getElementById("list")
  if (localStorage.innerHTML) {
    input.innerHTML = localStorage.innerHTML
  }
  document.querySelectorAll("li").forEach(item => {
    item.addEventListener("input", function () {
      if (item.innerHTML == "<br>") {
        item.innerHTML = ""
      }
      localStorage.setItem("innerHTML", getObj())
    }
    )
  })
  document.querySelectorAll(".del").forEach(item => {
    item.addEventListener("click", function () {
      deleteRow(event.target || event.srcElement)
      localStorage.setItem("innerHTML", getObj())
    }
    )
  })
  document.getElementById("new").addEventListener("click", function () { addRow(); localStorage.setItem("innerHTML", getObj()) })
}