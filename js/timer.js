let interval = null;
let offset = null;
let options = {
    delay: 1
};
const start = () => {
    if (!interval) {
        if (isCountdownMode()) {
            var split = timer.innerHTML.split(":");
            if (split.length === 3) {
                offset = getCountdownOffset(split[0], split[1], split[2]);
                interval = setInterval(countdownUpdate, options.delay);
            }
        } else {
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
const isCountdownMode = () => {
    return false;
}
const timerUpdate = () => {
    // clock += delta();
    // const time = msToHMS(clock);
    app.data.hrs = '01';
}
const delta = () => {
    var now = Date.now();
    var d = now - offset;

    offset = now;
    return d;
}
const msToHMS = (ms) => {
    var seconds = ms / 1000;
    var hours = parseInt( seconds / 3600 );
    seconds = seconds % 3600;
    var minutes = parseInt( seconds / 60 );
    seconds = seconds % 60;
    return [
        hours.toString().padStart(2,'0'),
        minutes.toString().padStart(2,'0'),
        Math.floor(seconds).toString().padStart(2,'0')
    ];
}
// ---------------- Init App -------------------------- //
const app = Vue.createApp({});
app.component('stopwatch', {
	data: function () { 
		return {
		    state: "started",
		    startTime: Date.now(),
		    currentTime: Date.now(),
		    interval: null
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
		time: function() {
		    return this.hours + ':' + this.minutes + ':' + this.seconds;
		},
		milliseconds: function() {
		    return this.currentTime - this.$data.startTime;
		},
		hours: function() {
		    var lapsed = this.milliseconds;
		    var hrs = Math.floor((lapsed / 1000 / 60 / 60));
		    return hrs >= 10 ? hrs : '0' + hrs;
		},
		minutes: function() {
		    var lapsed = this.milliseconds;
		    var min = Math.floor((lapsed / 1000 / 60) % 60);
		    return min >= 10 ? min : '0' + min;
		},
		seconds: function() {
		    var lapsed = this.milliseconds;
		    var sec = Math.ceil((lapsed / 1000) % 60);
		    return sec >= 10 ? sec : '0' + sec;
		}
	},
	methods: {
		reset: function() {
		    this.$data.state = "started";
		    this.$data.startTime = Date.now();
		    this.$data.currentTime = Date.now();
		},
        stop: function() {
		    this.$data.state = "stopped";
		    this.$data.currentTime = this.$data.startTime;
            clearInterval(this.$data.interval);
            if (playButtonCol) {
                playButtonCol.classList.add("single-button");
            }
            playButton.style.display = "unset";
            pauseButton.style.display = "none";
            resetButton.style.display ="none";
        },
		pause: function() {
		    this.$data.state = "paused";
            if (playButtonCol) {
                playButtonCol.classList.remove("single-button");
            }
            playButton.style.display = "unset";
            pauseButton.style.display = "none";
            resetButton.style.display ="unset";
		},
        start: function () {
		    this.$data.state = "started";
            this.interval = setInterval(this.updateCurrentTime, 1000);
            if (playButtonCol) {
                playButtonCol.classList.add("single-button");
            }
            playButton.style.display = "none";
            pauseButton.style.display = "unset";
            resetButton.style.display ="none";
        },
		updateCurrentTime: function(time) {
		    if (this.$data.state == "started") {
		        this.currentTime = Date.now();
		    }
		}        
	},
  template: `
            <div class="row">
                <div class="column">
                    <div class="circle">
                        <span contenteditable="true" id="hours" class="time">{{ hours }}:</span>
                        <span contenteditable="true" id="minutes" class="time">{{ minutes }}:</span>
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
                            <i v-on:click="stop" id="resetButton" class="material-icons">stop_circle</i>
                        </button>
                    </div>
                </div>    
            </div>
   `,
});

app.mount('#main');

