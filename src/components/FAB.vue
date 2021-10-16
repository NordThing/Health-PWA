<template>
              <v-speed-dial
            v-model="fab"
            bottom
            direction="top"
            :open-on-hover="false"
            transition="slide-y-reverse-transition"
          >
            <template v-slot:activator>
              <v-btn v-model="fab" color="blue darken-2" dark fab>
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-account-circle</v-icon>
              </v-btn>
            </template>
            <v-btn fab dark small color="green">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn fab dark small color="indigo">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn fab dark small color="red">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-speed-dial>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => ({
    fab: false,
  }),
};
</script>

<template>
          <v-speed-dial
            v-model="fab"
            bottom
            direction="top"
            :open-on-hover="false"
            transition="slide-y-reverse-transition"
          >
                      <template v-slot:activator>
 
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
          @click="fabs"
        >

          <v-icon v-if="start">
            mdi-pause
          </v-icon>
          <v-icon v-else>
            mdi-play 
          </v-icon>

        </v-btn>
                      </template>
        <v-btn
          fab
          dark
          small
          color="red"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
    </v-speed-dial>

</template>

<script>
export default {
  name: 'Test',
  data: () => ({
    fab: false,
  }),
  methods: {
    fabs() {
      console.log('This one will switch icon')
    },
  },
}
</script>