function tabChange() {
var header = document.getElementById("material-tabs");
var btns = header.getElementsByClassName("tabs-title");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("tabs-active");
  current[0].className = current[0].className.replace(" tabs-active", "");
  this.className += " tabs-active";
  });
}
};