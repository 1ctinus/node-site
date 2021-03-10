function a(input) {
  document.getElementById("output").innerHTML = input;
}
function search() {
  var op = document.getElementById("output");
  var link = window.location;
  var bg = document.body.style;
  var delyeet = document.getElementById("css");
  var delyeet2 = document.getElementById("Dave");
  var xy = ["X", "Y"]
  var xyp = parseInt(Math.random() * xy.length);
  var skew = 20 * Math.random() - 10
  var date = new Date();
  var x = document.getElementById("Dave").value;
  var punctuationless = x.replace(/[.,\/#!?$'%\^&\*;:{}=\-_`~()]/g, "");
  var finalString = punctuationless.replace(/\s{2,}/g, " ");
  var res = finalString.split(" ");
  switch (finalString) {
    // let's start out with the hrefs...
    case "haiku": case "haikus":
      link.href = "haikus.html"
      break; case "changelog":
      link.href = "changelog.html"
      break; case "json": case "videos": case "about":
      link.href = "coming-soon.html"
      break; case "self": case "doxx":
      link.href = "self.html"
      break; case "pics":
      link.href = "pics"
      break; case "plans":
      link.href = "plans.html"
      break; case "wotw": case "monday":
      link.href = "wotw"
      break; case "news": case "bad news": case "bad news site":
      link.href = "wotw/10-19-2020"
      break; case "count": case "counter": case "counting":
      link.href = "wotw/11-02-2020"
      break; case "yo mama": case "yo mama generator":
      link.href = "wotw/11-09-2020"
      break; case "alphabet": case "alphabet shuffle":
      link.href = "wotw/10-26-2020"
      break; case "politics":
      link.href = "politics.html"
      break; case "discord":
      link.href = "discord.html"
    case "youtube":
      link.href = "https://www.youtube.com/channel/UCm4Ptfu96iahGA0SOHq84VA"
      //debugging 
      break; case "test": case "debug":
      a("test or debug");
      //now the fun stuff...
      break; case "white":
      bg.backgroundColor = "#ffffff";
      a("this webzone was not made for white you smoothbrain")
      break; case "groove": case "groovy":
      link.href = "https://en.wikipedia.org/wiki/Pelican"
      break; case "self destruct":
      delyeet2.remove();
      break; case "dark":
      bg.backgroundColor = "#111";
      break; case "amoled": case "black":
      bg.backgroundColor = "#000000";
      break; case "red":
      bg.backgroundColor = "#330000";
      break; case "blue":
      bg.backgroundColor = "#000033";
      break; case "green":
      bg.backgroundColor = "#003300";
      break; case "purple":
      bg.backgroundColor = "#330033";
      break; case "yellow":
      bg.backgroundColor = "#333300";
      break; case "cyan":
      bg.backgroundColor = "#003333";
      break; case "grey": case "gray":
      bg.backgroundColor = "#333333";
      break; case "blur":
      bg.setProperty("filter", "blur(3px)", null)
      break; case "invert": case "grayscale": case "sepia":
      bg.setProperty("filter", res[0] + "(100%)", null)
      break; case "saturate":
      bg.setProperty("filter", "saturate(10)", null)
      break; case "left":
      bg.setProperty("-webkit-transform", "translate(-50%, 0px)", null)
      break; case "right":
      bg.setProperty("-webkit-transform", "translate(50%, 0px)", null)
      break; case "stretch":
      bg.setProperty("-webkit-transform", "scaleX(1.2)", null)
      break; case "squeeze":
      bg.setProperty("-webkit-transform", "scaleX(0.5)", null)
      break; case "rotate": case "askew":
      bg.setProperty("-webkit-transform", "rotate(" + skew + "deg)", null)
      break; case "skew":
      bg.setProperty("-webkit-transform", "skewY(20deg)", null)
      break; case "reflect": case "flip":
      bg.setProperty("-webkit-transform", "Scale" + xy[xyp] + "(-1)", null)
      break; case "refresh": case "refresh":
      location.reload();
      break; case "fuck css": case "anti css":
      delyeet.remove();
      break; case "js": case "javascript": case "help":
      link.href = "search/spasearchi.js"
      break; case "css": case "style": case "styles": case "stylesheet":
      link.href = "indexstyle.css"
      break; case "flip a coin":
      var coin = Math.random();
      if (coin > 0.5) {
        a("heads")
      } else (a("tails"))
      break; case "egg": case "eggs":
      link.href = "search/egg.html"
      break; case "delete":
      while (document.firstChild) {
        document.removeChild(document.firstChild);
      }
      //q&a
      break; case "are you bill wurtz": case "wurtz soon":
      link.href = "https://www.youtube.com/watch?v=qWwb8S02f_c"
      break; case "who won the election":
      a("i think the old guy won")
      break; case "what":
      a("ask some questions, search for eggs, and have some shortcuts too")
      break; case "you suck":
      a(":(")
      break; case "ping":
      a("pong")
      break; case "what is your gender": case "what is your sex": case "are you male or female":
      a("male")
      break; case "who are you": case "who":
      a("a program made and run by 1ctinus.")
      break; case "where": case "where am i": case "what is your favorite website": case "what is the best website":
      a("https://1ctinus.me")
      break; case "when":
      a("now, or you could wait 2pm est on monday for the wotw")
      break; case "who made you":
      a("either 1ctinus or George Washington. But it's up to you")
      break; case "how":
      a("github and vsc, and shotcut too")
      break; case "why":
      a("because why not")
      break; case "what programming languages do you know": case "what programming languages did you learn":
      a("javascript, but hopefully php and json soon")
      break; case "what time is it": case "what is the time": case "whats the time": case "time":
      a(date.getHours() + ":" + date.getMinutes())
      break; case "who is 1ctinus": case "who is ictinus":
      a("a dude just trying to get by")
      break; case "how are you doing": case "how you doing": case "how are you":
      a("maybe alright, maybe not. but most of the times, ok.")
  }
  if (finalString.startsWith('are you')) { a("oh hell yeah") }
  if (finalString.startsWith('color')) {
    a("background color changed to ") + res[1];
    bg.backgroundColor = "#" + res[1];
  }
  if (finalString.startsWith('fontcolor') || finalString.startsWith('textcolor')) {
    var all = document.getElementsByTagName("*");
    a("font/text color changed to " + res[1]);
    for (var i = 0, max = all.length; i < max; i++) {
      all[i].style.color = "#" + res[1];
    }
  }
  else if (finalString.startsWith('replace')) {
    document.getElementById("para").innerHTML = res[1];
  }
  if (finalString.startsWith('title')) {
    document.getElementById("svga").innerHTML = res[1]; document.getElementById("svgb").innerHTML = res[1]; document.getElementById("svgc").innerHTML = res[1];
  };
}
document.body.addEventListener("keydown", function (event) {
  if (event.keyCode == 13) {
    search();
  }
})
