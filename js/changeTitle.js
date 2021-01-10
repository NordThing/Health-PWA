var myClasses = document.getElementsByClassName("header-app-icon");
var tabs = document.getElementsByClassName("tabs");

function changeTitle0() {
    for (var i = 0; i < myClasses.length; i++) {
        myClasses[i].innerHTML = '<img src="images/Logo.png">';
        tabs[0].style.display = "none";
        }
}

function changeTitle1() {
    for (var i = 0; i < myClasses.length; i++) {
        myClasses[i].innerHTML = "<h6>Latest Activity</h6>";
        tabs[0].style.display = "none";
        }
}

function changeTitle2() {
    for (var i = 0; i < myClasses.length; i++) {
        myClasses[i].innerHTML = "<h6>History</h6>";
        tabs[0].style.display = "flex";
        }
}

function changeTitle3() {
    for (var i = 0; i < myClasses.length; i++) {
        myClasses[i].innerHTML = "<h6>Weight</h6>";
        tabs[0].style.display = "none";
        }
}