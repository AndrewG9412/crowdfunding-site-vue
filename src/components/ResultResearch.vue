<template>
  <div class="container">
    <h3>Risultati sui progetti:</h3>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Creatore</th>
          <th scope="col">Titolo</th>
          <th scope="col">Categoria</th>
          <th scope="col">Descrizione</th>
          <th scope="col">Immagine</th>
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
              class="btn btn-primary m-1"
              @click="viewDocs(project.id)"
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
  methods: {
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
    viewDocs(projectId) {
      this.$router.push({
        name: "SeeLinkedDocuments",
        params: { projectId: projectId },
      });
    },
  },
  mounted() {
    this.getSearchedProject();
    this.getSearchedDocument();
  },
};
</script>
