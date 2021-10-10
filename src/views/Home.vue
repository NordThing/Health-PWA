<template>
  <div id="StopWatch" class="mt-10">
    <h1>{{formattedElapsedTime}}</h1>
    <v-btn @click="start">Start</v-btn>
    <v-btn @click="stop">Stop</v-btn>
    <v-btn @click="reset">Reset</v-btn>
    <activity-list class="px-12 mt-12"></activity-list>
  </div>
</template>

<script>
import ActivityList from '@/components/ActivityList.vue';



export default {
  name: "StopWatch",
  components: {
    ActivityList,
  },
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
    }
  }
};
</script>