<?php include 'header.html' ;?>

<?php 
$t = date("H");

if ($t < "20") {
    include 'main-content.html';
  } else {
    include 'stopwatch.html';
  }
  ?>

<?php include 'footer.html';?>