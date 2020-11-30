var Stopwatch = function(options) {

    var offset, clock, interval, stopWatchStarted;
    var timer = getTimerEl("time");
    var playButtonCol = document.getElementById("playButtonCol");
    var mainCont = document.getElementById("main");
    var modal = document.getElementById("saveModal");
    initButton("playButton", start);
    initButton("pauseButton", pause);
    initButton("resetButton", reset);

    // default options
    options = options || {};
    options.delay = options.delay || 1;

    // initialize
    reset();

    // private functions
    function getTimerEl(id) {
        var timerEl = document.getElementById(id);
        timerEl.addEventListener("keydown", function (e) {
            if (e.keyCode === 13) {
                start();
            }
        });
        return timerEl;
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
            if (isCountdownMode()) {
                var split = timer.innerHTML.split(":");
                if (split.length === 3) {
                    offset = getCountdownOffset(split[0], split[1], split[2]);
                    interval = setInterval(countdownUpdate, options.delay);
                }
            } else {
                stopWatchStarted = true;
                offset   = Date.now();
                interval = setInterval(timerUpdate, options.delay);
            }
            if (playButtonCol) {
                playButtonCol.classList.add("single-button");
            }
            playButton.style.display = "none";
            pauseButton.style.display = "unset";
            resetButton.style.display ="none";
        }
    }
    
    function isCountdownMode() {
        return timer.innerHTML !== "00:00:00" && !stopWatchStarted;
    }

    function pause() {
        if (interval) {
            clearInterval(interval);
            interval = null;
            if (playButtonCol) {
                playButtonCol.classList.remove("single-button");
            }
            playButton.style.display = "unset";
            resetButton.style.display = "unset";
            pauseButton.style.display = "none";
        }
    }

    function reset() {
        toggleSaveDataPopup(clock > 0);
        clearInterval(interval);
        interval = null;
        stopWatchStarted = false;
        if (playButtonCol) {
            playButtonCol.classList.add("single-button");
        }
        playButton.style.display = "unset";
        pauseButton.style.display = "none";
        resetButton.style.display = "none";
        clock = 0;
        render();
    }

    function toggleSaveDataPopup(show) {
        if (mainCont && show) {
            mainCont.classList.add("main-blur");
            if (modal) {
                modal.style.display = "block";
            }
        } else {
            modal.style.display = "none";
            mainCont.classList.remove("main-blur");
        }
    }

    function timerUpdate() {
        clock += delta();
        render();
    }

    function countdownUpdate() {
        var now = new Date().getTime();
        clock = offset - now;
        render();
        if (clock <= 0) {
            clearInterval(interval);
            reset();
            toggleSaveDataPopup(true);
        }
    }

    function render() {
        if (timer) {
            timer.innerHTML = msToHMS(clock);
        }
    }

    function delta() {
        var now = Date.now();
        var d = now - offset;

        offset = now;
        return d;
    }

    function msToHMS(ms) {
        var seconds = ms / 1000;
        var hours = parseInt( seconds / 3600 );
        seconds = seconds % 3600;
        var minutes = parseInt( seconds / 60 );
        seconds = seconds % 60;
        return hours.toString().padStart(2,'0') + ":"
            + minutes.toString().padStart(2,'0') + ":"
            + Math.floor(seconds).toString().padStart(2,'0');
    }

    function getCountdownOffset(hrs, min, sec) {
        var now = new Date().getTime();
        var h = parseInt(hrs, 10);
        var m = parseInt(min, 10);
        var s = parseInt(sec, 10);
        var ms = ((h*60*60+m*60+s)*1000);
        return now + ms;
    }

    // public API
    this.start  = start;
    this.stop   = stop;
    this.reset  = reset;
};

new Stopwatch();
