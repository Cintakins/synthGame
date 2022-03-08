// Adding tone.js synth tot he js file
const synth = new Tone.Synth().toDestination();
const now = Tone.now();


// Adding variables
var key = document.getElementsByClassName("key");
var tones = [];
let currentRandomNote = '';
currentPlayNote = '';
for (i = 0; i < key.length; i++){
    let dataNote = key[i].getAttribute("data-note");
    tones.push(dataNote);
}

// Creating play button function
let play = document.getElementsByClassName("game-button");
play[0].addEventListener("click", randomNote);

function randomNote(event){
    currentRandomNote = tones[Math.floor((Math.random()*tones.length))];
    console.log(currentRandomNote);
    synth.triggerAttackRelease(`${currentRandomNote}4`, "8n");
    this.setTimout(), 5000;
}

// Creating functions for the synth keys (play notes and change colours)
for (i = 0; i < key.length; i++){
    key[i].addEventListener("mousedown", playNote); 
}

// playNote function (starts tone, changes colours and listens for mousup event)
function playNote() {
    console.log("play note");
    Tone.start;
    let note = this.getAttribute("data-note");
    synth.triggerAttack(`${note}4`, now);
    if (this.classList.contains("white-key")) {
        console.log("white Key");
    }
    else {
        console.log("black key")
    }
    if (currentRandomNote) {
        let correctNote = currentRandomNote === note;
        this.style.background = correctNote ? "green" : "red" 
    }
    else {
        this.style.background = this.classList.contains("white-key") ? "aqua" : "rgb(218, 96, 223)"
    }
    this.addEventListener("mouseup", stopNote); 
};

// stopNote function stops the tone and reverts keys back to original colour
function stopNote() {
    console.log("stop note");
    let note = this.getAttribute("data-note")
    synth.triggerRelease(now);
    this.style.background = this.classList.contains("white-key") ? "whitesmoke" : "rgb(122, 43, 226)"
}
