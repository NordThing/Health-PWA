function saveData() {
    console.log("saving data to DB");
    hidePopUp();
}
function closeModal() {
    console.log("do nothing");
    hidePopUp();
}
function hidePopUp() {
    var mainCont = document.getElementById("main");
    var modal = document.getElementById("saveModal");
    modal.style.display = "none";
    mainCont.classList.remove("main-blur");
}
