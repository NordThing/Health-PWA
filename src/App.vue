<template>
  <v-app>
    <app-header />
    <v-main>
      <floating-action-button />
      <router-view />
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import AppFooter from '@/components/AppFooter.vue';


export default {
  name: 'App',

  components: {
    AppHeader,
    AppFooter,
    FloatingActionButton,
  },

  data: () => ({
    //
  }),
};
</script>