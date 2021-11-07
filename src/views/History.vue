<template>

  <div class="history">
    <app-tab-history></app-tab-history>
    <h1>This is a history page</h1>
  </div>
</template>

<script>
import AppTabHistory from '@/components/AppTabHistory.vue';

export default {
  name: "History",
  components: {
    AppTabHistory,
  },
};
</script>