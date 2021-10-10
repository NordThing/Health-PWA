<template>
  <footer>
    <v-bottom-navigation
    :value="value"
    color="primary"
    elevation="3"
    fixed
    grow
    app    
    > 
        <v-btn
        :to="{path: '/' }"
        >    
            <span>StopWatch</span>
            <v-icon>mdi-timer</v-icon>
        </v-btn>
        <v-btn
        :to="{path: '/card' }"
        >
            <span>Latest</span>
            <v-icon>mdi-calendar-blank</v-icon>
        </v-btn>
        <v-btn
        :to="{path: '/history' }"
        >
            <span>History</span>
            <v-icon>mdi-playlist-check</v-icon>
        </v-btn>
        <v-btn
        :to="{path: '/weight' }"
        >
            <span>Weight</span>            
            <v-icon>mdi-chart-box-plus-outline</v-icon>
        </v-btn>        
    </v-bottom-navigation>
  </footer>
</template>