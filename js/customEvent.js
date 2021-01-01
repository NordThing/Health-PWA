

function myTimer() {        
  var customTime = document.getElementById("userInput");
  var myVar = setInterval(myTimer, customTime);


  var d = new Date();

  document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}