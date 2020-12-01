var sw = document.querySelector('#checkbox');

var current_scheme = localStorage.getItem('theme');

if(current_scheme)
{
  document.documentElement.setAttribute('data-theme', current_scheme);
  if(current_scheme === 'dark')
  {
   sw.checked = true;
  }
  else{
   sw.checked = false;
  }
}
else{
 // user didn't saved it or he hates dark mode
}

// alert(current_scheme)

function changeTheme()
{
if(sw.checked){
 document.documentElement.setAttribute('data-theme', 'dark');
 localStorage.setItem('theme', 'dark');
}
else{
 document.documentElement.setAttribute('data-theme', 'light'); // or just empty " "
 localStorage.setItem('theme', 'light'); // or just empty " "
} 
  // alert(document.documentElement.getAttribute('data-color-scheme'))
}

 sw.addEventListener('change', function(){ changeTheme() });