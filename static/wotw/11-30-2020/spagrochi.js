function genNumber(){
  var td =7*Math.round(6*Math.pow(Math.random(),2.5)+0.4);
  var fg =3*Math.round(6*Math.pow(Math.random(),3)+0.4);
  var s = 2*Math.round(Math.random()/1.9);
  var pt = Math.round(Math.random()*2 - 1)* Math.round((Math.random()-0.4) * td/35);
  return td + fg +s + pt;
  }
  
  function gen() {
    document.getElementById("d").innerHTML = genNumber()
    document.getElementById("c").innerHTML = genNumber()
  }
