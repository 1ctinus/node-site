var arr = "welcome\xa0to\xa0the\xa0bestest\xa0webzone\xa0on\xa0the\xa0internets!".split("")
var x = "", i
for (i = 0; i <= 47; i++) {
  x = x + `<span style="animation-delay:-${i * 100}ms">${arr[i]}</span>`
}
document.getElementById("welc").innerHTML = x
