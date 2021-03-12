
document.body.addEventListener("keydown", function (event) {
    if (event.keyCode ==32 && event.target == document.body) {        
        thething();
        event.preventDefault();
    }
});
function thething(){
var puke = ["puke","gag","vomit","throw up","flinch",]
var ew = ["nasty", "disgusting", "putrid", "gross", "smelly", "stinky",]
    var size = ["small", "tiny", "short",]
    var dumb = ["stupid", "dumb", "moronic", "idotic"]
    var badj = ["bigger", "larger", "more massive", "huger"]
    var chungus = ["big", "fat", "huge", "massive", "large"]
        var noun = ["Jesus Christ", "Margaret Thatcher", "a lawnchair", "a daisy", "Mexico", "yo mama", "a hamburger","Millard Fillmore" ,"a stick","Minecraft", "a tsp of nutmeg", "an apple", "Brutus", "Jeff Bezos", "Biden", "Larry", "you"]
        var verb = ["run", "shriek","jump","die","fall","flip over","panic","scramble","tremble"]
        var large = ["the Eiffel Tower", "IC 1101", "Big Chungus", "the comically large spoon", "the earth", "The Milky Way"]
        var short = [, "a leaf" , "a hair width" , "a cell", "a pin", "an atom", "a molecule", "your bandwith", "a sand grain", "an index finger", "Peter Dinklage"]
        // spaghetti! 
        var chungusp = parseInt(Math.random() * chungus.length);
        var badjp = parseInt(Math.random() * badj.length);
        var nounp = parseInt(Math.random() * noun.length);
        var nounp2 = parseInt(Math.random() * noun.length);
        var verbp = parseInt(Math.random() * verb.length);
        var largep = parseInt(Math.random() * large.length);
        var shortp = parseInt(Math.random() * short.length);
        var dumbp = parseInt(Math.random() * dumb.length);
        var sizep = parseInt(Math.random() * size.length);
        var pukep = parseInt(Math.random() * puke.length);
        var ewp = parseInt(Math.random() * ew.length);
    var num = Math.round((Math.random()*90)+10);

        var main =  [
        dumb[dumbp]+ ", she thinks that " + noun[nounp] + " is " + noun[nounp2],
        "ugly that even "+ noun[nounp]+ " would " + verb[verbp] + " in fear",
    chungus[chungusp] + ", that she's " + num +" times "+ badj[badjp] +" than "+ large[largep],
    size[sizep] + " that she dwarves " +short[shortp]+ " by "+ num + " times",
    ew[ewp] + " that even " + noun[nounp] + " would " + puke[pukep]
    ];

var mainp = parseInt(Math.random() * main.length);

document.getElementById("b").innerHTML = "yo mama so " + main[mainp] + "!"; }
