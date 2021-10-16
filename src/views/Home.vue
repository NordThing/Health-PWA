<template>
<div>
<stop-watch></stop-watch>
<activity-list></activity-list>
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