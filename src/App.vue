<template>
  <header-sito></header-sito>
  <body-component class="top-space"></body-component>
  <router-view></router-view>
</template>

<script>

import HeaderSito from "./components/HeaderSito";
import BodyComponent from "./components/BodyComponent";

export default {
  components: { 
    HeaderSito,
    BodyComponent,
  },
};
</script>

<style scoped>
    .top-space {
      margin-top: 5rem;
      margin-left: 1rem;
    }

</style>
