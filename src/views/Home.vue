<template>
<div class="stopwatch">
  <app-tab-timer></app-tab-timer>
  <div class="text-middle-circle mt-8">
    <v-progress-circular
      :rotate="-90"
      :size="250"
      :width="15"
      :value="value"
      color="primary"
    >
      <stop-watch></stop-watch>
    </v-progress-circular>
    <activity-list class="px-12 mt-12"></activity-list>
  </div>
</div>
</template>

<script>
import StopWatch from '@/components/StopWatch.vue';
import ActivityList from '@/components/ActivityList.vue'; 
import AppTabTimer from '@/components/AppTabTimer.vue';

export default {
  name: "Home",
  components: {
    StopWatch,
    ActivityList,
    AppTabTimer,
  },
};
</script>