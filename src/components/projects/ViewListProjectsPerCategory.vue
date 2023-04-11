<template>
  <div class="container">
    <ol>
      <li v-for="project in allProjectsPerCategory" :key="project">
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
            <tr>
              <th scope="row">{{ project.nome_creatore }}</th>
              <td>{{ project.titolo }}</td>
              <td>{{ project.categoria }}</td>
              <td>{{ project.descrizione }}</td>
              <td><img :src="project.immagine" alt="img" /></td>
            </tr>
          </tbody>
        </table>
      </li>
    </ol>
  </div>
</template>

<script>
import axios from "axios";
import {useRoute} from "vue-router";

export default {
  setup(){
    const route = useRoute();
    this.category = route.query.category
  },  
//   computed: {
//     category : this.$route.params.category
//   },
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
            console.log(res);
            this.allProjectsPerCategory = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.fetchProjects(this.category);
  },
};
</script>
