const synth = new Tone.Synth().toDestination();
const now = Tone.now();

// linking the sounds to keys
// var c = document.getElementById('#c');

// function playC() { 
//     synth.triggerAttackRelease('c4', '8n')
// };

const key = document.getElementsByClassName("key");

for (i = 0; i < key.length; i++){
    key[i].addEventListener("click", playNote); 
}
function playNote(event) {
    let note = this.getAttribute("data-note");
    synth.triggerAttackRelease(`${note}4`, "8n");
};
// function stopNote(event) {
//     let note = document.getAttribute("data-note");
//     synth.triggerRelease(`${note}4`, now);
// }
