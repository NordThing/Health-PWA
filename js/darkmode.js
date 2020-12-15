var sw = document.querySelector('#checkbox');

var current_scheme = localStorage.getItem('theme');

if(current_scheme) {
    document.documentElement.setAttribute('data-theme', current_scheme);
    if(current_scheme === 'dark') {
        sw.checked = true;
    } else{
        sw.checked = false;
    }
}

function changeTheme() {
    if (!sw.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        sw.checked = true;
    } else {
        document.documentElement.setAttribute('data-theme', 'light'); // or just empty " "
        localStorage.setItem('theme', 'light'); // or just empty " "
        sw.checked = false;
    } 
}
