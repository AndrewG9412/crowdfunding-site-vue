<template>
  <div class="container">
    <h5>Progetti relativi a {{category}}</h5>
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
            <tr v-for="project in allProjectsPerCategory" :key="project">
              <th scope="row">{{ project.nome_creatore }}</th>
              <td>{{ project.titolo }}</td>
              <td>{{ project.categoria }}</td>
              <td>{{ project.descrizione }}</td>
              <td><img :src="project.immagine"  alt="img"/></td>
              <td><button class="btn btn-primary" @click="viewProj(project.id)">Vedi progetto</button></td>
            </tr>
          </tbody>
        </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  
  computed: {
    category() {
      return this.$route.params.category;
    },
  },
  data() {
    return {
      allProjectsPerCategory: [],
    };
  },
  methods: {
    fetchProjects() {
      console.log(`categoria cliccata ${this.category}`);
      axios({
        method: "get",
        url: "http://localhost:3002/api/projects/" + this.category,
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            this.allProjectsPerCategory = res.data;
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
  watch:{
    category(){
      this.fetchProjects();
    }
  }
};
</script>


<style scoped>

img{
  width: 20%;
  height: 15%;
}

</style>