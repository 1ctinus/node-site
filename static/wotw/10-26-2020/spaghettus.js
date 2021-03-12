document.body.addEventListener("keydown", function (event) {
    if (event.keyCode >= 65 && event.keyCode < 91) {
        window.location.replace(String.fromCharCode(event.keyCode).toLowerCase() + ".html");
    }
});