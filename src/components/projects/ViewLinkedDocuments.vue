<template>
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
      <tr v-for="document in allLinkedDocuments" :key="document">
        <th scope="row">{{ document.titolo }}</th>
        <td>{{ document.descrizione }}</td>
        <td>{{ document.data }}</td>
        <td>{{ document.tipo }}</td>
        <td v-if="document.tipo == 'pagamento'">{{ document.prezzo }} €</td>
        <td v-else></td>
        <td>
          <button
            v-if="checkIfCreator()"
            class="btn btn-primary"
            @click="editDocument(document.id)"
          >
            Modifica documento
          </button>
        </td>
        <td>
          <button
            v-if="checkIfCreator()"
            class="btn btn-danger"
            @click="deleteDocument(document.id)"
          >
            Elimina documento
          </button>
        </td>
        <td>
          <button
            v-if="
              store.isUserAuthenticated &&
              checkTypeAndNotBuyed(document, this.store.getUserId())
            "
            class="btn btn-primary"
            @click="showModal"
          >
            Acquista
          </button>
        </td>
        <td>
          <button
            v-if="
              document.tipo == 'gratuito' ||
              this.getIfBuyed(document.id, this.store.getUserId())
            "
            class="btn btn-primary"
            @click="viewDocument(document.id)"
          >
            Visualizza documento
          </button>
        </td>
        <payment-modal
          @close="hideModal"
          :utente="this.store.getUserId()"
          :documento="document.id"
        ></payment-modal>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/store/authUser";
import PaymentModal from "../modals/PaymentModal.vue";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";

export default {
  components: { PaymentModal },
  data() {
    return {
      buyed: null,
      allLinkedDocuments: [],
    };
  },
  setup() {
    const store = useAuthStore();
    return {
      store,
    };
  },
  mounted() {
    this.fetchLinkedDocuments();
  },
  computed: {
    projectId() {
      return this.$route.params.projectId;
    },
    creatoreId() {
      console.log(this.$route.params.creatoreId);
      return this.$route.params.creatoreId;
    },
  },
  methods: {
    hideModal() {
      this.modale.hide();
    },
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
    checkIfCreator() {
      console.log(
        `userId: "${this.store.getUserId()}  creatoreId : "${this.store.getTempCreatoreId()}"`
      );
      if (this.store.getUserId() == this.store.getTempCreatoreId()) return true;
      else return false;
    },
    editDocument(documentId) {
      this.$router.push({
        name: "EditDocument",
        params: { id: documentId },
      });
    },
    deleteDocument(documentId) {
      axios({
        method: "delete",
        url:
          "http://localhost:3002/api/documents/document/" +
          documentId +
          "/delete",
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            alert("Documento eliminato");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    viewDocument(documentId) {
      this.$router.push({
        name: "ViewDocument",
        params: { id: documentId },
      });
    },
    checkTypeAndNotBuyed(doc, userId) {
      //se doc a pagamento e non acquistato da userId restituire true
      //se doc gratis restituire false
      //se già acquistato restituire false
      const buyed = this.getIfBuyed(doc.id, userId);
      if (doc.tipo == "pagamento" && !buyed) return true;
      if (doc.tipo == "gratuito") return false;
      if (buyed) return false;
    },
    getIfBuyed(docId, userId) {
      axios({
        method: "get",
        url:
          "http://localhost:3002/api/documents/document/" +
          docId +
          "/userId/" +
          userId,
      })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.risultato == true) return (this.buyed = true);
            else return (this.buyed = false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showModal() {
      const modal = document.getElementById("payment-modal");
      document.body.appendChild(modal);
      var myModal = new bootstrap.Modal(modal, {
        keyboard: false,
      });

      myModal.show();

      this.modale = myModal;
    },
  },
};
</script>

<style scoped>
.table {
  max-width: 95%;
}
</style>
