<?php include 'header.html' ;?>

<?php 
$t = date("H");

if ($t < "20") {
    echo "Have a good day!";
  } else {
    echo "Have a good night!";
  }
  ?>
  
<?php include 'footer.html';?>