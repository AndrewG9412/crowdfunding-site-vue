<template>
  <div class="advanced-search m-2">
    <input class="m-2" type="text" v-model="chiaveRicerca" placeholder="Cerca..." />
    <select class="m-2" v-model="selectedCategory">
      <option v-for="category in categories" :value="category" :key="category">
        {{ category }}
      </option>
    </select>
    <label> <input type="radio" class="m-2" value="progetti" v-model="choosen" /> Progetti </label>
    <label> <input type="radio" class="m-2" value="documenti" v-model="choosen" /> Documenti </label>

    <button class="btn btn-primary m-2" type="submit" @click="search">Ricerca</button>
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
      choosen: "progetti",
      categories: ["arte", "letteratura", "informatica", "giochi", "cibo"],
      projectSearched: [],
      documentSearched: [],
    };
  },
  methods: {
    search(e) {
      e.preventDefault();
      if (this.choosen == "progetti" || this.selectedCategory != "") {
      axios({
        method : "get",
        url : "http://localhost:3002/api/projects/advsearch/" + this.chiaveRicerca + "/category/" + this.selectedCategory,
      }).then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.projectSearched = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (this.choosen == "documenti" || this.selectedCategory != "") {
      axios({
        method : "get",
        url : "http://localhost:3002/api/documents/advsearch/" + this.chiaveRicerca + "/category/" + this.selectedCategory,
      }).then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.documentSearched = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
