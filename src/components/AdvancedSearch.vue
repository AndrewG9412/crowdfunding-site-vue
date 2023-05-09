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

  

  <div class="container">
    <h3>Risultati sui progetti:</h3>
    <table class="table m-5">
      <thead>
        <tr>
          <th scope="col">Creatore</th>
          <th scope="col">Titolo</th>
          <th scope="col">Categoria</th>
          <th scope="col">Descrizione</th>
          <th scope="col">Immagine</th>
          <th scope="col">Azione</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projectSearched" :key="project">
          <th scope="row">{{ project.nome_creatore }}</th>
          <td>{{ project.titolo }}</td>
          <td>{{ project.categoria }}</td>
          <td>{{ project.descrizione }}</td>
          <td><img :src="project.immagine" alt="img" /></td>
          <td>
            <button
              class="btn btn-primary m-1"
              @click="viewProj(project.id)"
            >
              Visualizza documenti
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="container">
    <h3>Risultati sui documenti:</h3>

    <table class="table m-5">
    <thead>
      <tr>
        <th scope="col">Titolo</th>
        <th scope="col">Descrizione</th>
        <th scope="col">Data</th>
        <th scope="col">Tipo</th>
        <th scope="col">Prezzo</th>
        <th scope="col">Azione</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="document in documentSearched" :key="document">
        <th scope="row">{{ document.titolo }}</th>
        <td>{{ document.descrizione }}</td>
        <td>{{ document.data }}</td>
        <td>{{ document.tipo }}</td>
        <td v-if="document.tipo == 'pagamento'">{{ document.prezzo }} €</td>
        <td v-else></td>
        <td>
          <button
            v-if="document.tipo == 'gratuito' || this.getIfBuyed(document.id ,this.store.getUserId())"
            class="btn btn-primary"
            @click="viewDocument(document.id)"
          >
            Visualizza documento
          </button>
        </td>
      </tr>
    </tbody>
    </table>
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
      console.log(this.chiaveRicerca);
      console.log(this.selectedCategory);
      console.log(this.choosen);
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
