<template>
  <div class="advanced-search">
    <input type="text" v-model="chiaveRicerca" placeholder="Cerca..." />
    <select v-model="selectedCategory">
      <option v-for="category in categories" :value="category" :key="category">
        {{ category }}
      </option>
    </select>
    <label> <input type="radio" value="progetti" v-model="choosen" /> Progetti </label>
    <label> <input type="radio" value="documenti" v-model="choosen" /> Documenti </label>

    <button type="submit" @click="search">Ricerca</button>
  </div>



</template>

<script>
import axios from 'axios';
export default {
  name: "AdvancedSearch",
  data() {
    return {
      chiaveRicerca: "",
      selectedCategory: "",
      choosen: "",
      categories: ["Arte", "Letteratura", "Informatica", "Giochi", "Cibo"],
    };
  },
  methods: {
    search(e) {
      e.preventDefault();
      if (this.choosen == "progetti") {
      axios({
        method : "get",
        url : "http://localhost:3002/api/projects/"
      })
    }
    if (this.chooseDocuments == "documenti") {
      axios({
        method : "get",
        url : "http://localhost:3002/api/documents/"
      })
    }
    },
  },
};
</script>

<style scoped>
.advanced-search {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.advanced-search select {
  margin-right: 10px;
}
</style>
