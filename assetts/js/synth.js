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
    resetRandomNote();
    currentRandomNote = tones[Math.floor((Math.random()*tones.length))];
    console.log(currentRandomNote, "created");
    synth.triggerAttackRelease(`${currentRandomNote}4`, "8n"); 
}

//function to enable play to play keys without red and green colors after practicing on the game has finished
function resetRandomNote() {
        currentRandomNote = undefined;   
        console.log("play button reset")
}

// Creating functions for the synth keys (play notes and change colours)
for (i = 0; i < key.length; i++){
    key[i].addEventListener("mousedown", playNote); 
}

// playNote function (starts tone, changes colours and listens for mousup event)
function playNote() {
    Tone.start;
    let note = this.getAttribute("data-note");
    if (currentRandomNote) {
        let correctNote = currentRandomNote === note;
        synth.triggerAttack(`${note}4`, now);
        console.log("played game")
        if (correctNote) {
            this.style.background = "green"
        } else {
            document.getElementById(`${note}`).style.background = "red";
            document.getElementById(`${currentRandomNote}`).style.background = "green";
            setTimeout(() => {
                document.getElementById(`${currentRandomNote}`).style.background = document.getElementById(`${currentRandomNote}`).classList.contains("white-key") ? "whitesmoke" : "rgb(122, 43, 226)"
                // resetRandomNote();
            }, 1500);
        }
        // this.style.background = correctNote ? "green" : "red" 
        this.addEventListener("mouseup", () => {
            synth.triggerRelease(now);
            this.style.background = this.classList.contains("white-key") ? "whitesmoke" : "rgb(122, 43, 226)"
        //     setTimeout(function() {
        //         correctNote ? alert("Well done you got it right!") : alert("Whoops! Keep practicing!")
        //         resetRandomNote();
        // }, 250);
        });
    }
     else {
        synth.triggerAttack(`${note}4`, now);
        console.log("played synth without game")
        this.style.background = this.classList.contains("white-key") ? "aqua" : "rgb(218, 96, 223)"
        this.addEventListener("mouseup", stopNote); 
    }
};

// stopNote function stops the tone and reverts keys back to original colour
function stopNote() {
    console.log("stop note");
    let note = this.getAttribute("data-note")
    synth.triggerRelease(now);
    this.style.background = this.classList.contains("white-key") ? "whitesmoke" : "rgb(122, 43, 226)"
}
