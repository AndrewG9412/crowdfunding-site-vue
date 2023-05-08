<template>
  <div class="container">
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
        <tr>
          <th scope="row">{{ titolo }}</th>
          <td>{{ descrizione }}</td>
          <td>{{ data }}</td>
          <td>{{ tipo }}</td>
          <td v-if="tipo == 'pagamento'">{{ prezzo }} €</td>
          <td v-else></td>
          <td><button class="btn btn-primary m-2">Preferito</button></td> 
        </tr>
      </tbody>
    </table>

    <h3>Commenti :</h3>

    <div class="container">
      <table class="table m-5">
        <thead>
          <tr>
            <th scope="col">Autore</th>
            <th scope="col">Commento</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comment in allComments" :key="comment">
            <td>{{ comment.autore }}</td>
            <td>{{ comment.commento }}</td>
            <td><button class="btn btn-primary m-2">Modifica</button></td>
            <td><button class="btn btn-danger m-2">Cancella</button></td>
          </tr>
        </tbody>  
      </table>
    </div>   
    
    <button class="btn btn-primary m2 " @click="showModal">Inserisci commento</button>

    <comment-modal @close="hideModal" ></comment-modal>
  </div>
</template>

<script>
import axios from "axios";
import CommentModal from "../modals/CommentModal.vue";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";

export default {
  components: { CommentModal },
  data() {
    return {
      docData: null,
      titolo: "",
      descrizione: "",
      data: "",
      tipo: "",
      prezzo: "",
      allComments: [],
    };
  },
  watch: {
    docData() {
      this.titolo = this.docData[0].titolo;
      this.descrizione = this.docData[0].descrizione;
      this.data = this.docData[0].data;
      this.tipo = this.docData[0].tipo;
      this.prezzo = this.docData[0].prezzo;
    },
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
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            this.docData = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showModal() {
      const modal = document.getElementById("comment-modal");
      document.body.appendChild(modal);
      var myModal = new bootstrap.Modal(modal, {
        keyboard: false,
      });

      myModal.show();

      this.modale = myModal;
    },
    hideModal() {
      this.modale.hide();
    },
  },
  mounted() {
    this.getDocument();
  },
};
</script>
