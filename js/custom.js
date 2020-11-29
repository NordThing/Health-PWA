//LOADER FOR SERVICE WORKER FOR PWA
window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./sw.js');
    }
  }

  //DISABLE RIGHT CLICKING
  document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
    });