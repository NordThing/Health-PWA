/* THIS IS AUDIO COACH JAVASCRIPT */

function audioCoach() {
    myTimer();
    stopTimer();
}


/* Set variable for which interval(in ms) and which feature to be called when using this */
/* audioCoach is how often the coach you should coach */
var audioCoach = 2000
var myVar = setInterval(myTimer, audioCoach);

function myTimer() {
  var d = new Date();
  document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}


/* Set varibale to stop this coach - should be used if a GOAL is set - not else */
var timeGoal = 20000
setTimeout(stopTimer,timeGoal);

function stopTimer() {
    clearInterval(myVar);
}

/* ------------------------------- */
/* THIS IS THE TEXT TO SPEECH PART */
/* ------------------------------- */
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