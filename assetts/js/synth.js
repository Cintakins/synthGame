// Adding tone.js synth tot he js file
const synth = new Tone.Synth().toDestination();
const now = Tone.now();


// Adding variables
var key = document.getElementsByClassName("key");
var tones = [];
let currentRandomNote = '';
let note = '';

// puts keys into tones array (I'm not sure this is even necessary...will ask)
for (i = 0; i < key.length; i++){
    let dataNote = key[i].getAttribute("data-note");
    tones.push(dataNote);
}
// mousedown or click events
for (i = 0; i < key.length; i++){
    key[i].addEventListener("mousedown", playNote);
}

let play = document.getElementsByClassName("game-button");
play[0].addEventListener("click", randomNote);

// Creating play button function
function randomNote(event){
    resetRandomNote();
    currentRandomNote = tones[Math.floor((Math.random()*tones.length))];
    synth.triggerAttackRelease(`${currentRandomNote}4`, "8n"); 

    console.log(currentRandomNote, "created");
}

//function to enable player to play keys without red and green colors after practicing on the game has finished
function resetRandomNote() {
        currentRandomNote = undefined;   
        console.log("play button reset");
}

// playNote function (starts tone, changes colours and listens for mousup event)
function playNote() {
    Tone.start;
    var note = this.getAttribute("data-note");
    synth.triggerAttack(`${note}4`, now);

    if(currentRandomNote) {
        playGame();
    }
    else if (currentRandomNote === undefined) {
        if (this.classList.contains("white-key")) {
            this.style.background = "aqua";
        }
        else {
            this.style.background = "rgb(218, 96, 223)";
        }

        console.log("played synth without game");
        this.addEventListener("mouseup", stopNote); 
    }

}

// function for playing the game
function playGame(currentRandomNote, note){
    // synth.triggerAttack(`${note}4`, now);

    let correctNote = currentRandomNote === note;  


    
    function alert(message, type) {
    
        var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        var wrapper = document.createElement('div');
        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        alertPlaceholder.append(wrapper);

        // alert message correct
        if (correctNote) {
            this.style.background = "green";
            this.addEventListener('click', function () {
                alert('Well done!', 'success');
                setTimeout(function() {
                    document.getElementsByClassName("alert").remove();
                }, 2000);
            });
        }

        // alert message incorrect
        else if (!correctNote) {

                document.getElementById(`${currentRandomNote}`).style.background = "green";
                this.style.background = "red";
        
                this.addEventListener('click', function () {
                    alert('Whoops! Play again', 'danger');
                    setTimeout(function() {
                        document.getElementsByClassName("alert").remove();
                        //resets colour of red incorrect key
                        if (document.getElementById(`${currentRandomNote}`).classList.contains("white-key")) {
                            document.getElementById(`${currentRandomNote}`).style.background = "whitesmoke";
                        }
                        else {
                            document.getElementById(`${currentRandomNote}`).style.background = "rgb(122, 43, 226)";
                        }
                    }, 2000);
                });
        }
        }

    this.addEventListener("mouseup", stopNote);

    console.log("played game");
}


// stopNote function stops the tone and reverts keys back to original colour
function stopNote(note) {
    console.log("stop note");
    synth.triggerRelease(now);
    let keyPlayed = document.getElementById(`${note}`);
    if (keyPlayed.classList.contains("white-key")) {
        this.style.background = "whitesmoke";
    }
    else { 
        this.style.background = "rgb(122, 43, 226)";
    }
    resetRandomNote();
}


