// Adding variables
var key = document.getElementsByClassName("key");
var tones = [];
let currentRandomNote = '';
let note = '';
let keyPlayed = '';
let sliderVolume;

//Effect sliders from NexusUI
var volumeSlider = new Nexus.Slider('#slider-effect1',{
    'size': [120,20],
    'mode': 'absolute',
    'min': -20,
    'max': 0,
    'step': 1,
    'value': -10,
});

volumeSlider.on('change',function(v) {
    sliderVolume = v;
    console.log(v);
  })
var slider2 = new Nexus.Slider('#slider-effect2',{
    'size': [120,20],
    'mode': 'relative',  // 'relative' or 'absolute'
    'min': 0,
    'max': 1,
    'step': 0,
    'value': 0
})
// content loaded function
document.addEventListener('DOMContentLoaded', function(){
    const now = Tone.now();

    // puts keys into tones array for use in the randomNote function
    for (i = 0; i < key.length; i++) {
        let dataNote = key[i].getAttribute("data-note");
        tones.push(dataNote);
    }
    for (i = 0; i < key.length; i++) {
        key[i].addEventListener("mousedown", function (event, sliderVolume) {
            Tone.start();
            playNote(event, note);
        });
    }
    let play = document.getElementsByClassName("game-button");
    play[0].addEventListener("click", randomNote);

    let effectButton = document.getElementsByClassName('effect');
    for (i = 0; i < effectButton.length; i++)
        effectButton[i].addEventListener('click', synthFunction(effectType));

    let effectType = document.getElementsByClassName('effect').getAttribute('data-effect');
    

    if (effectButton.clicked)

    let synth = synthFunction(normal);
})

// Adding tone.js synth to the js file
//var vol = new Tone.Volume(-12).toDestination();
//const synth = new Tone.Synth().connect(vol);
// const now = Tone.now();

// // puts keys into tones array for use in the randomNote function
// for (i = 0; i < key.length; i++) {
//     let dataNote = key[i].getAttribute("data-note");
//     tones.push(dataNote);
// }
// gets effect type
// let effectType = document.getElementsByClassName('effect').getAttribute('data-effect');

// mousedown or click events
// for (i = 0; i < key.length; i++) {
//     key[i].addEventListener("mousedown", function (event, sliderVolume) {
//         Tone.start();
//         playNote(event, note);
//     });
// }



// let play = document.getElementsByClassName("game-button");
// play[0].addEventListener("click", randomNote);



//synth sounds
function synthFunction() {

    var vol = new Tone.Volume(sliderVolume).toDestination();
    const dist = new Tone.Distortion(0.8);

    if (effectType == distortion) {

        var synth = new Tone.FMSynth().connect(dist, vol);
        console.log('synthD')
        return synth;

    }
    else if(normal){
        var synth = new Tone.Synth().connect(vol);
        // const now = Tone.now();
        console.log('synthN')
        return synth;
    }
}

// Creating play button function
function randomNote(event) {
    // let synth = synthFunction();

    Tone.start();
    resetRandomNote();
    currentRandomNote = tones[Math.floor((Math.random() * tones.length))];
    synth.triggerAttackRelease(`${currentRandomNote}4`, "8n");

    console.log(currentRandomNote, "created");
}

//function to enable player to play keys without red and green colors after practicing on the game has finished
function resetRandomNote() {
    currentRandomNote = undefined;
    console.log("play button reset");
}

// playNote function (starts note, changes colours and listens for mousup event)
function playNote(event, note) {
    // let synth = synthFunction();

    const keyPlayed = event.target;
    note = keyPlayed.dataset.note;


    if (currentRandomNote) {
        synth.triggerAttack(`${note}4`, now);
        playGame(currentRandomNote, note, keyPlayed, synth);
    } else {
        if (keyPlayed.classList.contains("white-key")) {
            keyPlayed.style.background = "aqua";
        } else {
            keyPlayed.style.background = "rgb(218, 96, 223)";
        }
        synth.triggerAttack(`${note}4`, now);
        console.log("played synth without game");
        keyPlayed.addEventListener("mouseup", () => stopNote(note, keyPlayed, synth));
        console.log(note);
    }

    // keyPlayed.addEventListener("mouseup", () => stopNote(note, keyPlayed)); 
}

//alert function
function alert(message, type) {

    var alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    var wrapper = document.createElement('div');
    wrapper.innerHTML = '<div class="alert alert-' + type + ' aria-label="' + message + '" role="alert">' + message + '</div>';
    alertPlaceholder.append(wrapper);
    setTimeout(function () {
        wrapper.remove();
    }, 2000);
}

// function for playing the game
function playGame(currentRandomNote, note, keyPlayed, synth) {

    let correctNote = currentRandomNote === note;
    console.log(keyPlayed);

    // alert message correct
    if (correctNote) {
        keyPlayed.style.background = "green";
        keyPlayed.addEventListener('click', function () {
            alert('Well done!', 'success');
        }, {
            once: true
        });
    }

    // alert message incorrect
    else if (!correctNote) {

        document.getElementById(`${currentRandomNote}`).style.background = "green";
        keyPlayed.style.background = "red";

        keyPlayed.addEventListener('click', function () {
            alert('Whoops! Play again', 'danger');
            setTimeout(function () {
                //resets colour of red incorrect key
                if (document.getElementById(`${currentRandomNote}`).classList.contains("white-key")) {
                    document.getElementById(`${currentRandomNote}`).style.background = "whitesmoke";
                } else {
                    document.getElementById(`${currentRandomNote}`).style.background = "rgb(122, 43, 226)";
                }
            }, 2000);
        }, {
            once: true
        });
    }

    keyPlayed.addEventListener("mouseup", () => stopNote(note, keyPlayed, synth));

    console.log("played game");
}



// stopNote function stops the tone and reverts keys back to original colour
function stopNote(note, keyPlayed, synth) {
    console.log("stop note");
    synth.triggerRelease(now);
    console.log(keyPlayed);
    if (keyPlayed.classList.contains("white-key")) {
        keyPlayed.style.background = "whitesmoke";
    } else {
        keyPlayed.style.background = "rgb(122, 43, 226)";
    }
    resetRandomNote();
}


