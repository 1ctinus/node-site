var arr = "welcome\xa0to\xa0the\xa0bestest\xa0webzone\xa0on\xa0the\xa0internets!".split('');
var x = "", i;
for (i = 1; i <= 48; i++) {
  x = x + '<span style="animation-delay:-' + (i - 1) * 100 + 'ms">' + arr[i - 1] + "</span>";
}
document.getElementById("welc").innerHTML = x;
