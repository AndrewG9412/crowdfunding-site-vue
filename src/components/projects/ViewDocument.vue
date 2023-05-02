<template>
  <div class="container">
    <h2>{{docData.titolo}}</h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      docData: null,
    };
  },
  watch:{
    docData(){
        
    }
  },
  computed: {
    documentId() {
      return this.$route.params.id;
    },
  },
  methods: {
    getDocument() {
      axios({
        method: "get",
        url: "http://localhost:3002/api/documents/document/" + this.documentId,
      }).then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          this.docData = res.data;
        }
      }).catch((err) =>{
        console.log(err);
      });

      }
    },
  mounted() {
    this.getDocument();
  },
};
</script>
