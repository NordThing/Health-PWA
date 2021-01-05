var myClasses = document.getElementsByClassName("header-app-icon");

function changeTitle() {
    for (var i = 0; i < myClasses.length; i++) {
        myClasses[i].innerHTML = "Latest Activity";
        }
}