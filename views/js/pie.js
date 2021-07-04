var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
let colors = ["#F32","#36F","#7F8","#F32","#36F","#7F8"]
function init(){
    let sum = 0;
    for (let k = 0; k < document.querySelector("tbody").children.length; k++) {
        sum += parseInt(document.querySelector("tbody").children[k].children[1].children[0].value)
        // console.log(document.querySelector("tbody").children[k].children[1].children[0].value)
    }
function getStart(len) {
    let val = 0;
    for (let i = 0; i <= len; i++) {
        val +=parseInt(document.querySelector("tbody").children[i].children[1].children[0].value)
    }
    // console.log(-1 * (Math.PI / 50 * val) + 3 * Math.PI / 2)
    // console.log(-1 * (Math.PI / 50 * ((val / sum) * 100)) + 3 * Math.PI / 2)
    //  console.log(val)
    return (-1*(Math.PI/50 * (val * 100/sum))+ 3*Math.PI/2)
}
ctx.fillStyle = "#121014"
ctx.fillRect(0, 0, c.width, c.height);
ctx.font = "60px sans-serif";
ctx.textAlign = "center"; 
ctx.fillStyle = "indigo"
ctx.fillText(document.querySelector("#title").value, c.width/2 +3,53);
ctx.fillStyle = "aliceblue"
ctx.fillText(document.querySelector("#title").value, c.width/2,50); 
for (let j = 0; j < document.querySelector("tbody").children.length; j++){
    ctx.strokeStyle = "#dce"
    ctx.lineWidth = 3;
    ctx.beginPath();
ctx.arc(400, 300, 200, getStart(j), (j === 0) ? 3 * Math.PI / 2 : getStart(j-1));
ctx.lineTo(400, 300)
ctx.closePath();
ctx.fillStyle = document.querySelector("tbody").children[j].children[2].children[0].value
ctx.fill();
ctx.stroke();
ctx.lineWidth = 2;
ctx.strokeStyle = "aliceblue"
ctx.beginPath();
ctx.rect(625, 200 + j*25, 20, 20);
ctx.fill();
ctx.stroke();
ctx.font = "20px sans-serif";
ctx.fillStyle = "aliceblue"
ctx.textAlign = "left"; 
ctx.fillText(document.querySelector("tbody").children[j].children[0].children[0].value, 650, 217 + j*25); 
}
}
init()
document.querySelectorAll("input").forEach(e => {
e.addEventListener("input",i => init())
});
document.querySelector("#add").addEventListener("click",e => {
    let newTR = document.createElement("tr")
    newTR.innerHTML = '<td> <input value="New Row" oninput="init()"/></td><td> <input value="1" oninput="init()"/></td><td> <input value="#555" oninput="init()"/></td>'
    document.querySelector("tbody").appendChild(newTR);
    init()
})
document.getElementById("save").addEventListener("click",
  function () {
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'pie.png');
    let dataURL = c.toDataURL('image/png');
    let url = dataURL
    downloadLink.setAttribute('href', url);
    downloadLink.click();
  }
)