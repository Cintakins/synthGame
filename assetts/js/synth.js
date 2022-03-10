// Adding tone.js synth tot he js file
const synth = new Tone.Synth().toDestination();
const now = Tone.now();


// Adding variables
var key = document.getElementsByClassName("key");
var tones = [];
// let currentRandomNote = '';
let note = '';
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
    // var synthKey = this
    if (currentRandomNote) {
        playGame(note, currentRandomNote);
    }
     else {
        synth.triggerAttack(`${note}4`, now);
        console.log("played synth without game")
        this.style.background = this.classList.contains("white-key") ? "aqua" : "rgb(218, 96, 223)"
        this.addEventListener("mouseup", stopNote); 
    }
};

// function for playing the game
function playGame(currentRandomNote, note){
    let keyPlayed = document.getElementById(`${note}`);
    let correctNote = currentRandomNote === note;
        synth.triggerAttack(`${note}4`, now);
        console.log("played game")

        var alertPlaceholder = document.getElementById('liveAlertPlaceholder')

        if (correctNote) {
            keyPlayed.style.background = "green"

            function alert(message, type) {
                var wrapper = document.createElement('div');
                wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
                alertPlaceholder.append(wrapper);
                }
            // if (correctNote) {
            //    this.addEventListener('click', function () {
               alert('Well done!', 'success');
               setTimeout(() => {
                   alertPlaceholder.remove();
               }, 2000)
            // })

        } 
        else {
            keyPlayed.style.background = "red";
            document.getElementById(`${currentRandomNote}`).style.background = "green";
            setTimeout(() => {
                document.getElementById(`${currentRandomNote}`).style.background = document.getElementById(`${currentRandomNote}`).classList.contains("white-key") ? "whitesmoke" : "rgb(122, 43, 226)"
                // resetRandomNote();
            }, 1500);
            
            function alert(message, type) {
                var wrapper = document.createElement('div');
                wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
                alertPlaceholder.append(wrapper);
                }
            // if (!correctNote) {
            //    this.addEventListener('click', function () {
               alert('Whoops! Play again', 'danger');
               setTimeout(() => {
                   alertPlaceholder.remove();
               }, 2000)
            // })
            // }
        }
        // this.style.background = correctNote ? "green" : "red" 
        keyPlayed.addEventListener("mouseup", () => {
            synth.triggerRelease(now);
            keyPlayed.style.background = keyPlayed.classList.contains("white-key") ? "whitesmoke" : "rgb(122, 43, 226)"
        });
    }
// }

// stopNote function stops the tone and reverts keys back to original colour
function stopNote() {
    console.log("stop note");
    let note = this.getAttribute("data-note")
    synth.triggerRelease(now);
    this.style.background = this.classList.contains("white-key") ? "whitesmoke" : "rgb(122, 43, 226)"
}
