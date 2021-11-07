<template>
  <div class="weight">
    <app-tab-history></app-tab-history>
    <h1>This is a weight page</h1>
  </div>
</template>

<script>
import AppTabHistory from '@/components/AppTabHistory.vue';

export default {
  name: "Weight",
  components: {
    AppTabHistory,
  },
};
</script>