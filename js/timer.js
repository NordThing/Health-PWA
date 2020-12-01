const app = Vue.createApp({});
app.component('stopwatch', {
	data: function () { 
		return {
            offset: null,
            clock: null,
		    interval: null,
            stopWatchStarted: false
		}
	},
  	mounted: function() {
        if (playButtonCol) {
            playButtonCol.classList.add("single-button");
        }
	},
	unmounted: function() {
	    clearInterval(this.interval)
	},
	computed: {
		hours: function() {
		    var lapsed = this.clock;
		    var hrs = Math.floor((lapsed / 1000 / 60 / 60));
		    return hrs >= 10 ? hrs : '0' + hrs;
		},
		minutes: function() {
		    var lapsed = this.clock;
		    var min = Math.floor((lapsed / 1000 / 60) % 60);
		    return min >= 10 ? min : '0' + min;
		},
		seconds: function() {
		    var lapsed = this.clock;
		    var sec = Math.ceil((lapsed / 1000) % 60);
		    return sec >= 10 ? sec : '0' + sec;
		}
	},
	methods: {
        start: function() {
            if (!this.interval) {
                if (this.isCountdownMode()) {
                    var [hrVal, minVal, secVal] = this.getDisplayedTime();
                    this.offset = this.getCountdownOffset(hrVal, minVal, secVal);
                    this.interval = setInterval(this.countdownUpdate, 1);
                } else {
                    this.stopWatchStarted = true;
                    this.offset = Date.now();
                    this.interval = setInterval(this.timerUpdate, 1);
                }
                if (playButtonCol) {
                    playButtonCol.classList.add("single-button");
                }
                playButton.style.display = "none";
                pauseButton.style.display = "unset";
                resetButton.style.display ="none";
            }
        },
        isCountdownMode: function() {
            var [hrVal, minVal, secVal] = this.getDisplayedTime();
            return !this.stopWatchStarted && (hrVal !== "00" || minVal !== "00" || secVal !== "00");
        },
        pause: function() {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
                if (playButtonCol) {
                    playButtonCol.classList.remove("single-button");
                }
                playButton.style.display = "unset";
                resetButton.style.display = "unset";
                pauseButton.style.display = "none";
            }
        },
        reset: function() {
            this.toggleSaveDataPopup(this.clock > 0);
            clearInterval(this.interval);
            this.interval = null;
            if (playButtonCol) {
                playButtonCol.classList.add("single-button");
            }
            playButton.style.display = "unset";
            pauseButton.style.display = "none";
            resetButton.style.display = "none";
            this.clock = 0;
            this.stopWatchStarted = false;
        },
        toggleSaveDataPopup: function(show) {
            if (show) {
                var mainCont = document.getElementById("main");
                var modal = document.getElementById("saveModal");
                mainCont.classList.add("main-blur");
                if (modal) {
                    modal.style.display = "block";
                }
            } else {
                modal.style.display = "none";
                mainCont.classList.remove("main-blur");
            }
        },
        timerUpdate: function() {
            var now = Date.now();
            var d = now - this.offset;
            this.offset = now;
            this.clock += d;
        },
        countdownUpdate: function() {
            var now = new Date().getTime();
            var diff = this.offset - now;
            if (diff > 0) {
                this.clock = diff;
            } else {
                this.reset();
                this.toggleSaveDataPopup(true);
            }
        },
        getCountdownOffset: function(hrs, min, sec) {
            var now = new Date().getTime();
            var h = parseInt(hrs, 10);
            var m = parseInt(min, 10);
            var s = parseInt(sec, 10);
            var ms = ((h*60*60+m*60+s)*1000);
            return now + ms;
        },
        getDisplayedTime: function() {
            var hrVal = hours.innerHTML;
            var minVal = minutes.innerHTML;
            var secVal = seconds.innerHTML;
            return [hrVal, minVal, secVal];
        },
	},
  template: `
            <div class="row">
                <div class="column">
                    <div class="circle">
                        <span contenteditable="true" id="hours" class="time">{{ hours }}</span>
                        <span class="time">:</span>
                        <span contenteditable="true" id="minutes" class="time">{{ minutes }}</span>
                        <span class="time">:</span>
                        <span contenteditable="true" id="seconds" class="time">{{ seconds }}</span>
                    </div>
                </div>    
            </div>
            <div class="row">
                <div class="controls">
                    <div id="playButtonCol" class="column">
                        <button class="buttonPlay">
                            <i v-on:click="start" id="playButton" class="material-icons">play_circle_filled</i>
                            <i v-on:click="pause" id="pauseButton" class="material-icons">pause_circle_filled</i>
                        </button>
                    </div>
                    <div class="column">
                        <button class="buttonReset">
                            <i v-on:click="reset" id="resetButton" class="material-icons">stop_circle</i>
                        </button>
                    </div>
                </div>    
            </div>
   `,
});

app.mount('#main');

