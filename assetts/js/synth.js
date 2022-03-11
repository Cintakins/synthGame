// Adding tone.js synth tot he js file
const synth = new Tone.Synth().toDestination();
const now = Tone.now();


// Adding variables
var key = document.getElementsByClassName("key");
var tones = [];
let currentRandomNote = '';
let note = '';
let keyPlayed = '';
// let synthKey = '';
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
    var note = this.getAttribute("data-note");
    if (currentRandomNote) {
        // synth.triggerAttack(`${note}4`, now);
        playGame(note);
    }
     else {
        synth.triggerAttack(`${note}4`, now);
        console.log("played synth without game");
        if (this.classList.contains("white-key")) {
            this.style.background = "aqua";
        }
        else {
            this.style.background = "rgb(218, 96, 223)";
        }
        this.addEventListener("mouseup", stopNote); 
    }
};

// function for playing the game
function playGame(currentRandomNote, note){
    synth.triggerAttack(`${note}4`, now);
    var keyPlayed = document.getElementById(`${note}`);

    console.log("played game")

    let correctNote = currentRandomNote === note;  
    if (correctnote) {
        alertCorrect();
    }
    else {
        alertIncorrect();
    }
    keyPlayed.addEventListener("mouseup", stopNote);
}


// alert messages
function alertCorrect(message, type) {
    keyPlayed.style.background = "green";
    let alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    let wrapper = document.createElement('div');
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    alertPlaceholder.append(wrapper);

    this.addEventListener('click', function () {
        alert('Well done!', 'success');
        setTimeout(() => {
            alertPlaceholder.remove();
        }, 2000);
    });
}

function alertIncorrect(message, type) {
    keyPlayed.style.background = "red";
    document.getElementById(`${currentRandomNote}`).style.background = "green";
    let alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    let wrapper = document.createElement('div');
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    alertPlaceholder.append(wrapper);

    this.addEventListener('click', function () {
        alert('Whoops! Play again', 'danger');
        setTimeout(() => {
            alertPlaceholder.remove();
            if (document.getElementById(`${currentRandomNote}`).classList.contains("white-key")) {
                document.getElementById(`${currentRandomNote}`).style.background = "whitesmoke";
            }
            else {
                document.getElementById(`${currentRandomNote}`).style.background = "rgb(122, 43, 226)";
            }
        }, 2000);
    });
}


// stopNote function stops the tone and reverts keys back to original colour
function stopNote() {
    console.log("stop note");
    // let note = this.getAttribute("data-note")
    synth.triggerRelease(now);
    this.style.background = this.classList.contains("white-key") ? "whitesmoke" : "rgb(122, 43, 226)";
}


