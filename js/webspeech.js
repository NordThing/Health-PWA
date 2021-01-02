var synth = window.speechSynthesis;

var voices  = synth.getVoices();

var t = "You have runned for 5 minutes";

var u = new SpeechSynthesisUtterance(t);

function test(){
document.getElementById('doSpeak').onclick = function() {
    synth.speak(u);
    setInterval(function () {
        console.log("Testing");
    }, 100)
}
}