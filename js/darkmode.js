function setTheme() {
    const sw = document.querySelector('#checkbox');
    const current_scheme = localStorage.getItem('theme');
    if(current_scheme) {
        document.documentElement.setAttribute('data-theme', current_scheme);
        if(current_scheme === 'dark') {
            sw.checked = true;
        } else{
            sw.checked = false;
        }
    }
}

function changeTheme() {
    const sw = document.querySelector('#checkbox');
    if (sw.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light'); // or just empty " "
        localStorage.setItem('theme', 'light'); // or just empty " "
    } 
}
