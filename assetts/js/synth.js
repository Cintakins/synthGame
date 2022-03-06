const synth = new Tone.Synth().toDestination();
const now = Tone.now();

var key = document.getElementsByClassName("key");
var notes = [c, db, d, eb, e, f, gb, g, ab, a, bb, b];

let play = document.getElementsByClassName("game-button");
play[0].addEventListener("click", randomNote);

function randomNote(event){
    let random = Math.floor(Math.random() * 12) + 1;
    console.log(random);
}

for (i = 0; i < key.length; i++){
    key[i].addEventListener("mousedown", playNote); 
}

function playNote(event) {
    console.log("play note");
    Tone.start;
    var note = this.getAttribute("data-note");
    synth.triggerAttack(`${note}4`, now);
    if (this.classList.contains("white-key")) {
        console.log("white Key");
    }
    else {
        console.log("black key")
    }
    this.style.background = this.classList.contains("white-key") ? "aqua" : "rgb(218, 96, 223)"
    this.addEventListener("mouseup", stopNote); 
};

function stopNote() {
    console.log("stop note");
    var note = this.getAttribute("data-note")
    synth.triggerRelease(now);
    this.style.background = this.classList.contains("white-key") ? "whitesmoke" : "rgb(122, 43, 226)"
}
