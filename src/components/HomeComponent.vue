<template>
  <div class="container">
    <h3>I progetti del sito:</h3>

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
        <tr v-for="project in allProjects" :key="project">
          <th scope="row">{{ project.nome_creatore }}</th>
          <td>{{ project.titolo }}</td>
          <td>{{ project.categoria }}</td>
          <td>{{ project.descrizione }}</td>
          <td><img :src="project.immagine" alt="img" /></td>
          <td>
            <button class="btn btn-primary m-1" @click="viewProj(project.id)">
              Vedi progetto
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/authUser";
import axios from "axios";

export default {
  setup() {
    const store = useAuthStore();
    return {
      store,
    };
  },
  data() {
    return {
      allProjects: [],
    };
  },
  methods: {
    fetchProjects() {
      axios({
        method: "get",
        url: "http://localhost:3002/api/projects/",
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.allProjects = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    viewProj(projectId){
      this.$router.push({
        name: "ViewProject",
        params: {id : projectId}
      })
    }
  },
  mounted() {
    this.fetchProjects();
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
  max-height: 100px;
}

tr {
  vertical-align: baseline;
}
</style>
