const synth = new Tone.Synth().toDestination();

// linking the sounds to keys
// var c = document.getElementById('#c');

// function playC() { 
//     synth.triggerAttackRelease('c4', '8n')
// };

const key = document.getElementsByClassName("key");

for (i = 0; i < key.length; i++){
    key[i].addEventListener("onmousedown", playNote) 
}
function playNote(event) {
    var note = this.getAttribute("data-note");
    var whiteKey = this.getElementsByClassName("white-key");
    var blackKey = this.getElementsByClassName("black-key");
    if(whiteKey) {
        synth.triggerAttack(note, "4");
        this.addEventListener("onmouseup").synth.triggerRelease(note, "4");
    }
};

