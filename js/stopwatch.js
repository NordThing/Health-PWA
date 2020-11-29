var Stopwatch = function(options) {

    var offset, clock, interval;
    var timer = getTimerEl("time");
    initButton("playButton", start);
    initButton("pauseButton", stop);
    initButton("resetButton", reset);

    // default options
    options = options || {};
    options.delay = options.delay || 1;

    // initialize
    reset();

    // private functions
    function getTimerEl(id) {
        return document.getElementById(id);
    }

    function initButton(id, handler) {
        var el = document.getElementById(id);
        if (el) {
            el.addEventListener("click", function(event) {
                handler();
                event.preventDefault();
            });
        }
    }

    function start() {
        if (!interval) {
            offset   = Date.now();
            interval = setInterval(update, options.delay);
            playButton.style.display = "none";
            pauseButton.style.display = "unset";
        }
    }

    function stop() {
        if (interval) {
            clearInterval(interval);
            interval = null;
            playButton.style.display = "unset";
            pauseButton.style.display = "none";
        }
    }

    function reset() {
        clock = 0;
        render();
    }

    function update() {
        clock += delta();
        render();
    }

    function render() {
        if (timer) {
            timer.innerHTML = msToHMS(clock);
        }
    }

    function delta() {
        var now = Date.now(),
            d   = now - offset;

        offset = now;
        return d;
    }

    function msToHMS( ms ) {
        var seconds = ms / 1000;
        var hours = parseInt( seconds / 3600 );
        seconds = seconds % 3600;
        var minutes = parseInt( seconds / 60 );
        seconds = seconds % 60;
        return hours.toString().padStart(2,'0') + ":"
            + minutes.toString().padStart(2,'0') + ":"
            + Math.floor(seconds).toString().padStart(2,'0');
    }

    // public API
    this.start  = start;
    this.stop   = stop;
    this.reset  = reset;
};

new Stopwatch();
