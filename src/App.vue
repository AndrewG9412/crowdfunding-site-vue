<template>
  <header-sito></header-sito>
  <categorie-header class="top-space"/>
  <body-component class="ms-2"></body-component>
  <router-view></router-view>
</template>

<script>

import HeaderSito from "./components/HeaderSito";
import BodyComponent from "./components/BodyComponent";
import CategorieHeader from "./components/CategorieHeader";

export default {
  components: { 
    HeaderSito,
    BodyComponent,
    CategorieHeader
  },
};
</script>

<style scoped>
    .top-space {
      margin-top: 5rem;
      margin-left: 1rem;
    }

</style>
