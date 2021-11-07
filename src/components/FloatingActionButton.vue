<template>
    <v-speed-dial
      v-model="fab"
      bottom
      absolute
      fixed
      direction="top"
      :open-on-hover="false"
      transition="slide-y-reverse-transition"
      style="z-index:10; bottom:86px;left:50%; transform: translate(-50%);"
    >
      <template v-slot:activator>
          <v-btn 
          v-model="fab" 
          color="blue 
          darken-2" 
          dark 
          fab
          fixed
          absolute
          style="left:50%; transform: translate(-50%);"
          @click="fireStart"
          >
            <v-icon v-if="fab">mdi-pause</v-icon>
            <v-icon v-else>mdi-play</v-icon>
          </v-btn>
      </template>
          <v-btn 
          fab 
          dark 
          small 
          color="indigo"
          @click="fireReset">
          <v-icon>mdi-flag-checkered</v-icon>
          </v-btn>
    </v-speed-dial>
</template>

<script>
import {eventBus} from "../main";

export default {
  name: "FloatingActionButton",
  data: () => ({
    fab: false,
  }),
  methods: {
    fireStart() {
      eventBus.$emit('fireStart')
    },
    fireStop() {
      eventBus.$emit("fireStop")
    },
    fireReset() {
      eventBus.$emit("fireReset")
    }
  },
};
</script>
