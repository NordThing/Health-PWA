<template>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
          elevation="5"
          fixed
          absolute
          right
          style="z-index:5; bottom:32px; left:50%; transform: translate(-50%); "
          @click="fab"
        >
          <v-icon v-if="start">
            mdi-pause
          </v-icon>
          <v-icon v-else>
            mdi-play 
          </v-icon>
        </v-btn>

</template>

<script>
export default {
  name: 'Test',
  methods: {
    fab() {
      console.log('This one will switch icon')
    },
  },
}
</script>