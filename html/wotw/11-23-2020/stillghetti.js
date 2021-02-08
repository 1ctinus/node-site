function print(){
  var text = "<br>"+ document.getElementById("input").value;
var x = 1
var y = 1
if (text === "<br>pelican"){
  location.assign("noiwontstopnamingitspaghettipleasestopannoyingmeondicsord.html")
}
  setInterval(function(){ 

    document.getElementById("b").insertAdjacentHTML("afterend", text.repeat(x));
}, 100)
}


document.body.addEventListener("keydown", function (event) {
  if (event.keyCode ==13 ) {        
      print();
  }

})
