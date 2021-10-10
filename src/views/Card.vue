<template>
  <div class="card" >
    <h1>Latest results</h1>
    <v-card class="mx-auto mt-5"
    width="85%">
      <v-card-title>
        Title
      </v-card-title>
      <v-card-subtitle>
        Subtitle/Subhead
      </v-card-subtitle>
      <v-img
      height="100"
      src="..//assets/images/aurora-1280.webp"
      ></v-img>
      <v-card-title>
        Title
      </v-card-title>
      <v-card-text>
        Secondary text
      </v-card-text>
      <v-card-actions>
        <v-btn
        color="deep-purple lighten-2"
        text
        @click="action1"
        >
        Action 1
        </v-btn>
        <v-btn
        color="deep-purple lighten-2"
        text
        @click="action2"
        >
        Action 2
        </v-btn>
        <v-spacer></v-spacer>
      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-share-variant' : 'mdi-share-variant' }}</v-icon>
      </v-btn>      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>

      </v-card-actions>

    </v-card>
  </div>
</template>
