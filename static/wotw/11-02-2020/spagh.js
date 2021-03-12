if (typeof localStorage.clickcount == 'undefined') localStorage.clickcount = 0
function clickCounter() {
    if (localStorage.clickcount) {
      localStorage.clickcount = Number(localStorage.clickcount)+1;
    } else {
      localStorage.clickcount = 1;
    }
    document.getElementById("b").innerHTML = localStorage.clickcount;
  }
  function clickCounter2() {
    if (localStorage.clickcount) {
      localStorage.clickcount = Number(localStorage.clickcount)-1;
    } else {
      localStorage.clickcount = 1;
    }
    document.getElementById("b").innerHTML = localStorage.clickcount;
  }
  function reset () {
      if (localStorage.clickcount) {
        localStorage.clickcount = 0;
      } 
   document.getElementById("b").innerHTML =  0;
    }
  
  document.onkeydown = function(e){
      e = e || window.event;
      var key = e.which || e.keyCode;
      if (localStorage.clickcount > -1) {
  if (key === 8 || key === 46) clickCounter2();
  else clickCounter();
  }}