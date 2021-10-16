<template>
<div>
<stop-watch></stop-watch>
<activity-list class="px-12 mt-12"></activity-list>
</div>
</template>

<script>
import StopWatch from '@/components/StopWatch.vue';
import ActivityList from '@/components/ActivityList.vue'; 

export default {
  name: "Home",
  components: {
    StopWatch,
    ActivityList,
  },
};
</script>