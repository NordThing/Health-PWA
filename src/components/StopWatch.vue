<template>
  <div id="StopWatch" class="mt-10">
    <h1>{{formattedElapsedTime}}</h1>
    <v-btn @click="start">Start</v-btn>
    <v-btn @click="stop">Stop</v-btn>
    <v-btn @click="reset">Reset</v-btn>
  </div>
</template>

<script>
import { eventBus } from '@/main';
export default {
  name: "StopWatch",
  data() {
    return {
      elapsedTime: 0,
      timer: undefined
    };
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    }
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
    reset() {
      this.elapsedTime = 0;
    },
  },
  created() {
    eventBus.$on('fireStart', () => {
      this.start();
    })
    eventBus.$on('fireStop', () => {
      this.reset();
    })    
  },
};
</script>