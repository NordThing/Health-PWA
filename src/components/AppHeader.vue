<template>
  <header>
      <v-app-bar 
      density="compact"
      elevation="3"
      fixed
      app
      >
        <v-btn
        :to="{path: '/login' }"
        >
            <v-icon>mdi-account-plus</v-icon>
        </v-btn>     
      <v-avatar>
        <v-img src="..//assets/images/Life24Logo.png" />
      </v-avatar>
      <v-spacer></v-spacer>
        <v-switch
        v-model="$vuetify.theme.dark"
        hint="Dark theme"
        inset
        persistent-hint
        >
        </v-switch>
   </v-app-bar>
  </header>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>