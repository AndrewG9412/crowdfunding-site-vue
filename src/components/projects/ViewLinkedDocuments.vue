<template>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Titolo</th>
            <th scope="col">Descrizione</th>
            <th scope="col">Data</th>
            <th scope="col">Tipo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="document in allLinkedDocuments" :key="document">
            <th scope="row">{{ document.titolo }}</th>
            <td>{{ document.descrizione }}</td>
            <td>{{ document.data }}</td>
            <td>{{ document.tipo }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      allLinkedDocuments: [],
    };
  },
  mounted() {
    this.fetchLinkedDocuments();
  },
  computed: {
    projectId() {
      return this.$route.params.projectId;
    },
  },
  methods: {
    fetchLinkedDocuments() {
      axios({
        method: "get",
        url: "http://localhost:3002/api/documents/" + this.projectId,
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            this.allLinkedDocuments = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
