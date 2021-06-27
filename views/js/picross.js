var c = document.getElementById("myCanvas")
var ctx = c.getContext("2d")
// ctx.fillStyle = "#FF0000";
// ctx.fillRect(0, 0, c.width, c.height)
ctx.fillStyle = "#FFF"
let data =
  [
    [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
    [0,1,0,0,0,1,0,1,0,0,1,1,0,0,0],
    [1,0,1,0,1,0,1,0,0,0,1,1,1,0,0],
    [0,1,0,1,0,1,0,0,0,1,1,1,0,0,0],
    [0,0,1,0,1,0,0,0,1,1,1,0,0,0,0],
    [0,0,0,1,0,0,0,1,1,1,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
    [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ]
ctx.fillRect(100, 100, (data.length * 30) + 5, (data.length * 30) + 5)
let comp = [];
for (rr = 0; rr < data.length; rr++) {
  comp.push([])
  for (qq = 0; qq < data[rr].length; qq++) {
    if (data[rr][qq] == 1) {
      if (data[rr][qq - 1] != 1) {
        comp[rr].push(0)
        console.log("DBG POINT #1")
      }
      comp[rr][comp[rr].length - 1]++
    }
  }
}
console.log(comp)
let comp2 = [];
for (ss = 0; ss < data.length; ss++) {
  comp2.push([])
  for (tt = 0; tt < data.length; tt++) {
    if (data[tt][ss] == 1) {
      if (data[tt - 1] == undefined) {
        comp2[ss].push(0)
      }
      if (data[tt - 1] != undefined) {
        if (data[tt - 1][ss] != 1) {
          comp2[ss].push(0)
        }
      }
      comp2[ss][comp2[ss].length - 1]++
    }
  }
}
console.log(comp2)
ctx.fillStyle = "#FFF";
ctx.font = "20px Arial";
ctx.textAlign = "end";
ctx.lineWidth = 2
for (aa = 0; aa < data.length; aa++) {
  ctx.fillText(comp[aa].join(" "), 100, 120 + aa * 30);
}
for(bb = 0; bb < data.length; bb++){
  for(cc = 0; cc < comp2[bb].length; cc++){
      ctx.fillText(comp2[bb][cc], 123+bb*30,+(6.5-(comp2[bb].length-cc))*18); 
}
}
for (i = 0; i < data.length; i++) {
  for (j = 0; j < data.length; j++) {
    ctx.fillStyle = /*(data[i][j] == 1) ? "#EBB" :*/ "#800000"
    ctx.fillRect(105 + (j * 30), 105 + (i * 30), 25, 25);
    // if (data[i][j] == 0) {
    //   ctx.strokeStyle = "#EBB";
    //   ctx.beginPath();
    //   ctx.moveTo(105 + (j * 30), 105 + (i * 30));
    //   ctx.lineTo(105 + (j * 30) + 25, 105 + (i * 30) + 25);
    //   ctx.moveTo(105 + (j * 30) + 25, 105 + (i * 30));
    //   ctx.lineTo(105 + (j * 30), 105 + (i * 30) + 25);
    //   ctx.stroke();
    // }
  }
}
let userArray = new Array(data.length)
for (uu = 0; uu < userArray.length; uu++){
userArray[uu] = new Array(data.length).fill(0)
}
console.log(userArray)
function complete (){
  document.querySelector("#congrats").innerHTML = "You completed the puzzle! &#128077;"
}
function userArrayUpdate (inpX, inpY, val){
  console.log(Math.floor((inpY - 105) / 30))
  console.log(userArray[Math.floor((inpY - 105) / 30)][Math.floor((inpX - 105) / 30)])
  userArray[Math.floor((inpY - 105) / 30)] [Math.floor((inpX - 105) / 30)]  = val
  if(JSON.stringify(userArray) == JSON.stringify(data)){
    complete()
  }
}
c.addEventListener("click", function (e) {
  a = c.getBoundingClientRect();
  x = e.x - a.left
  y = e.y - a.top
  // console.log(x)
  if (x >= 105 && y >= 105 && x <= (30 * data.length + 100) && y <= (30 * data.length + 100)) {
    // console.log("POGGERS!")
    ctx.strokeStyle = "#EBB";
    ctx.fillStyle = "#EBB";
    ctx.fillRect(105 + 30 * Math.floor((x - 105) / 30), 105 + 30 * Math.floor((y - 105) / 30), 25, 25);
    userArrayUpdate(x, y, 1)
  }
})
c.addEventListener("dblclick", function (e) {
  a = c.getBoundingClientRect();
  x = e.x - a.left
  y = e.y - a.top
  // console.log(x)
  if (x >= 105 && y >= 105 && x <= (30 * data.length + 100) && y <= (30 * data.length + 100)) {
    // console.log("POGGERS!")
    ctx.fillStyle = "#800000";
    ctx.fillRect(105 + 30 * Math.floor((x - 105) / 30), 105 + 30 * Math.floor((y - 105) / 30), 25, 25);
    userArrayUpdate(x, y, 0)
  }
})
c.addEventListener("contextmenu", function (e) {
  e.preventDefault()
  a = c.getBoundingClientRect();
  x = e.x - a.left
  y = e.y - a.top
  if (x >= 105 && y >= 105 && x <= (30 * data.length + 100) && y <= (30 * data.length + 100)) {
    let j = 105 + 30 * Math.floor((x - 105) / 30)
    let i = 105 + 30 * Math.floor((y - 105) / 30)
    console.log(i)
    ctx.fillStyle = "#800000";
    ctx.fillRect(105 + 30 * Math.floor((x - 105) / 30), 105 + 30 * Math.floor((y - 105) / 30), 25, 25);
    ctx.strokeStyle = "#EBB";
    ctx.beginPath();
    ctx.moveTo(j, i);
    ctx.lineTo(j + 25, i + 25);
    ctx.moveTo(j + 25, i);
    ctx.lineTo(j, i + 25);
    ctx.stroke();
    userArrayUpdate(x, y, 0)
  }
})