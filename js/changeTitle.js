var myClasses = document.getElementsByClassName("header-app-icon");

function changeTitle0() {
    for (var i = 0; i < myClasses.length; i++) {
        myClasses[i].innerHTML = '<img src="images/Logo.png">';
        }
}

function changeTitle1() {
    for (var i = 0; i < myClasses.length; i++) {
        myClasses[i].innerHTML = "<h6>Latest Activity</h6>";
        }
}

function changeTitle2() {
    for (var i = 0; i < myClasses.length; i++) {
        myClasses[i].innerHTML = "<h6>History</h6>";
        }
}

function changeTitle3() {
    for (var i = 0; i < myClasses.length; i++) {
        myClasses[i].innerHTML = "<h6>Weight</h6>";
        }
}