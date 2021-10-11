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
          @click="handleSubmit"
        >
          <v-icon v-if="fab">
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
    handleSubmit() {
      console.log('Testing handleSubmit')
    },
    fab() {
      console.log('This one will switch icon')
    },
  },
}
</script>