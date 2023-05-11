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
          <td>
            <button
              v-if="store.isUserAuthenticated && this.preferito == true"
              class="btn btn-primary m-1"
              @click="unfavorite()"
            >
              Togli da preferiti
            </button>

            <button
              v-if="store.isUserAuthenticated && this.preferito == false"
              class="btn btn-primary m-1"
              @click="favorite()"
            >
              Aggiungi a preferiti
            </button>
          </td>
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
            <td>
              <button
                v-if="comment.id_autore == store.getUserId()"
                class="btn btn-primary m-2"
                @click="showEditingCommentModal()"
              >
                Modifica
              </button>
            </td>
            <td>
              <button
                v-if="comment.id_autore == store.getUserId()"
                class="btn btn-danger m-2"
                @click="removeComment(comment.id)"
              >
                Cancella
              </button>
            </td>
            <editing-comment-modal
              @close="hideEditingModal"
              :id_commento="comment.id"
            ></editing-comment-modal>
          </tr>
        </tbody>
      </table>
    </div>

    <button
      v-if="store.isUserAuthenticated"
      class="btn btn-primary m2"
      @click="showModal"
    >
      Inserisci commento
    </button>

    <comment-modal
      @close="hideModal"
      :id_doc="this.documentId"
      :id_user="this.store.getUserId()"
    ></comment-modal>
  </div>
</template>

<script>
import axios from "axios";
import CommentModal from "../modals/CommentModal.vue";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import { useAuthStore } from "@/store/authUser";
import EditingCommentModal from "../modals/EditingCommentModal.vue";

export default {
  components: { CommentModal, EditingCommentModal },
  setup() {
    const store = useAuthStore();
    return {
      store,
    };
  },
  data() {
    return {
      docData: null,
      titolo: "",
      descrizione: "",
      data: "",
      tipo: "",
      prezzo: "",
      allComments: [],
      preferito: "",
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
    getComments() {
      axios({
        method: "get",
        url:
          "http://localhost:3002/api/documents/document/comments/" +
          this.documentId,
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            this.allComments = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    removeComment(commentId) {
      axios({
        method: "delete",
        url:
          "http://localhost:3002/api/documents/document/comment/" +
          commentId +
          "/delete",
      })
        .then((res) => {
          if (res.status == 200) {
            alert("Commento eliminato");
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
    showEditingCommentModal() {
      const modalEdit = document.getElementById("editing-comment-modal");
      document.body.appendChild(modalEdit);
      var myEditingModal = new bootstrap.Modal(modalEdit, {
        keyboard: false,
      });

      myEditingModal.show();

      this.modale = myEditingModal;
    },
    hideModal() {
      this.modale.hide();
    },
    hideEditingModal() {
      this.modale.hide();
    },
    checkIfFavorite() {
      axios({
        method: "get",
        url:
          "http://localhost:3002/api/documents/document/" +
          this.documentId +
          "/favorite/" +
          this.store.getUserId(),
      })
        .then((res) => {
          if (res.data.favorite == true) this.preferito = true;
          if (res.data.favorite == false) this.preferito = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    favorite() {
      axios({
        method: "post",
        data: {
          utente: this.store.getUserId(),
        },
        url:
          "http://localhost:3002/api/documents/document/" +
          this.documentId +
          "/favorite",
      })
        .then((res) => {
          if (res.status == 200) {
            alert("Impostato come preferito");
            this.preferito = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unfavorite() {
      axios({
        method: "delete",
        url:
          "http://localhost:3002/api/documents/document/" +
          this.documentId +
          "/unfavorite/" +
          this.store.getUserId(),
      })
        .then((res) => {
          if (res.status == 200) {
            alert("Eliminato dai preferiti");
            this.preferito = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getDocument();
    this.getComments();
    this.checkIfFavorite();
  },
};
</script>
