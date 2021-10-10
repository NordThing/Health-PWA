<template>
    <v-select
      :items="items"
      label="Activity"
      outlined
    >
    </v-select>
</template>

<script>
  export default {
    data: () => ({
      items: ['Running', 'Walking', 'Running and Walking'],
    }),
  }
</script>