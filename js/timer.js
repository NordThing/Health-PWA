const app = Vue.createApp({});
app.component('stopwatch', {
	data: function () { 
		return {
		    state: "started",
		    startTime: Date.now(),
		    currentTime: Date.now(),
            clock: null,
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
            this.$data.clock = null;
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
            if (this.$data.state === "paused") {
                this.$data.state = "started";
            } else {
                this.reset();
                this.$data.clock = Date.now();
            }
            this.interval = setInterval(this.updateCurrentTime, 1000);
            if (playButtonCol) {
                playButtonCol.classList.add("single-button");
            }
            playButton.style.display = "none";
            pauseButton.style.display = "unset";
            resetButton.style.display ="none";
        },
		updateCurrentTime: function() {
		    if (this.$data.state == "started") {
                this.currentTime = this.$data.clock;
                this.$data.clock = Date.now();
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

