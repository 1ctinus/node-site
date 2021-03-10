function generator(){
  var rand1 = Math.random();
  var alphabet = "abcdefghijklmnopqrstuvwxyz"
  var letter = document.getElementById("letter");
  var rot = (Math.round(Math.random()) * 2 - 1)* 
  Math.pow((Math.random()+1) * Math.pow(2, 1/5),5)
var randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
var bgcolorstring = Math.floor(Math.random()*16777215)
var bgcolor = bgcolorstring.toString(16);
if (bgcolorstring>8388607.5){var textcolor = (bgcolorstring/2).toString(16)}
else {var textcolor = (bgcolorstring+838860).toString(16)}
var textsize = (Math.random()*350) + 50;
var left = (Math.random()*80)+10;
var top = (Math.random()*50);
letter.innerHTML= randomCharacter;
switch (true){
  case rand1<=1 && rand1>0.85:
  letter.style.color = bgcolor;
  letter.style.textShadow = "#fff 12px 12px";
  break;case rand1<=0.5 && rand1>0:
    letter.style.textShadow = "#0072FF 16px 16px, #FF0072 32px 32px, #FFC200 48px 48px";
  break;case rand1<=0.3 && rand1>0:
    letter.style.color = "white"
    letter.style.textShadow = "none";
    break;default:
    letter.style.color = textcolor;
    letter.style.textShadow = "none";
    letter.style.transform = "rotate("+ rot +"deg)"
}
switch (true){
    case rand1<=0.8 && rand1>0.75:
      letter.style.transform = "ScaleX(1.8)"
      break;case rand1<=0.75 && rand1>0.7:
      letter.style.transform = "ScaleY(1.8)"
      break;case rand1<=0.7 && rand1>0.6:
      letter.style.transform = "SkewX(20deg)"
    break;default:
    letter.style.transform = "rotate("+ rot +"deg)"
}
if (textsize > 200){
  letter.style.top = "10vh";
}
document.body.style.backgroundColor = bgcolor;
letter.style.fontSize = textsize + "px";
letter.style.bottom = top + "vh";
letter.style.left = left + "vw";
}
