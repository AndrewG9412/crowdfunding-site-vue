<template>
  <header-sito></header-sito>
  <categorie-header class="top-space"/>
  <router-view></router-view>
</template>

<script>

import HeaderSito from "./components/HeaderSito";
import CategorieHeader from "./components/CategorieHeader";

export default {
  components: { 
    HeaderSito,
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
