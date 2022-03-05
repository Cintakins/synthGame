const synth = new Tone.Synth().toDestination();

// linking the sounds to keys
// var c = document.getElementById('#c');

// function playC() { 
//     synth.triggerAttackRelease('c4', '8n')
// };

document.getElementsByClassName("key").addEventListener("onmousedown", () => {
    var note = this.getAttribute("data-note");
    var whiteKey = this.getElementsByClassName("white-key");
    var blackKey = this.getElementsByClassName("black-key");
    if(whiteKey) {
        synth.triggerAttack(note, "4");
        this.addEventListener("onmouseup").synth.triggerRelease(note, "4");
    }
});

