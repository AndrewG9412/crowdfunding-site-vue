<template>
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
        <tr v-for="project in searchedProject" :key="project">
          <th scope="row">{{ project.nome_creatore }}</th>
          <td>{{ project.titolo }}</td>
          <td>{{ project.categoria }}</td>
          <td>{{ project.descrizione }}</td>
          <td><img :src="project.immagine" alt="img" /></td>
          <td>
            <button
              :id="project.id"
              class="btn btn-primary m-1"
              @click="$emit('clickProject', project.id, this)"
            >
              Visualizza progetto
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
      <tr v-for="document in searchedDocuments" :key="document">
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
import axios from "axios";

export default {
  computed: {
    keyword() {
      return this.$route.params.keyword;
    },
  },
  data() {
    return {
      searchedProject: [],
      searchedDocuments: [],
    }
  },
  emits: {
    clickProject(payload, context) {
      context.viewProject(payload);
      return payload;
    }
  },
  methods: {
    viewProject(payload) {
      console.log("sono nella funzione di prova!");
      this.$router.push({
        name: "ViewProject",
        params: {id : payload}
      })
    },
    getSearchedProject() {
      axios({
        method: "get",
        url:
          "http://localhost:3002/api/projects/project/search/" + this.keyword,
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.searchedProject = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSearchedDocument() {
      axios({
        method: "get",
        url:
          "http://localhost:3002/api/documents/document/search/" + this.keyword,
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.searchedDocuments = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getSearchedProject();
    this.getSearchedDocument();
  },
};
</script>
