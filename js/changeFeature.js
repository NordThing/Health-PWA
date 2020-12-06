//FEATURE TO ACCESS DIFFERENT FEATURES WITH SERVER SIDE CALLS 
function changeFeature() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("main").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "main-overview.html", true);
    xhttp.send();
  }