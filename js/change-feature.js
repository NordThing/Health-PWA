//FEATURE TO ACCESS DIFFERENT FEATURES WITH SERVER SIDE CALLS 
function loadFeat() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementsByClassName("main").innerHtml = 
            this.responseText;
        }
    };
    xhttp.open("GET", "test.txt", true);
    xhttp.send();
}