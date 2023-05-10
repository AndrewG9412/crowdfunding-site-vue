<template>
  <div class="container">
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
          <th scope="row">{{ nome_creatore }}</th>
          <td>{{ titolo }}</td>
          <td>{{ categoria }}</td>
          <td>{{ descrizione }}</td>
          <td><img :src="immagine" alt="img" /></td>
        </tr>
      </tbody>
    </table>

    <button
      class="btn btn-primary m-1"
      @click="viewDocs(this.id, this.creatore_id)"
    >
      Visualizza documenti
    </button>

    <button
      v-if="store.isUserAuthenticated"
      class="btn btn-danger m-1"
      @click="showModal"
    >
      Dona
    </button>

    <button
      id="follow"
      v-if="store.isUserAuthenticated && this.follower == true"
      class="btn btn-primary m-1"
      @click="unfollow(store.getUserId(), this.projectId)"
    >
      Non seguire più
    </button>

    <button
      v-if="store.isUserAuthenticated && this.follower == false"
      class="btn btn-primary m-1"
      @click="follow()"
    >
      Segui
    </button>
    <donation-modal @close="hideModal" :progetto="this.id"></donation-modal>
  </div>

  <div class="m-2">
    <h3>Totale donazioni : {{ totale_donazioni }} €</h3>
    <br />
    <h3>Lista donatori :</h3>
    <ul v-for="donatore in lista_donatori" :key="donatore">
      <li>{{ donatore }}</li>
    </ul>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/authUser";
import DonationModal from "../modals/DonationModal.vue";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";

export default {
  computed: {
    projectId() {
      return this.$route.params.id;
    },
  },
  watch: {
    project() {
      this.id = this.project[0].id;
      this.titolo = this.project[0].titolo;
      this.nome_creatore = this.project[0].nome_creatore;
      this.titolo = this.project[0].titolo;
      this.categoria = this.project[0].categoria;
      this.descrizione = this.project[0].descrizione;
      this.immagine = this.project[0].immagine;
    },
  },
  components: { DonationModal },
  data() {
    return {
      project: null,
      nome_creatore: "",
      titolo: "",
      categoria: "",
      descrizione: "",
      immagine: "",
      id: "",
      creatore_id: "",
      follower: "",
      totale_donazioni: "",
      lista_donatori: [],
    };
  },
  setup() {
    const store = useAuthStore();
    return {
      store,
    };
  },
  methods: {
    showModal() {
      const modal = document.getElementById("donation-modal");
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
    viewDocs(projectId, creatoreId) {
      this.store.setTempCreatoreId(creatoreId);
      this.$router.push({
        name: "SeeLinkedDocuments",
        params: { projectId: this.projectId },
      });
    },
    downloadProject() {
      axios({
        method: "get",
        url: "http://localhost:3002/api/projects/project/" + this.projectId,
      })
        .then((res) => {
          if (res.status == 200) {
            this.project = res.data;
            console.log(this.project);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    follow() {
      axios({
        method: "post",
        data: {
          utente: this.store.getUserId(),
        },
        url:
          "http://localhost:3002/api/projects/project/" +
          this.projectId +
          "/follow",
      })
        .then((res) => {
          if (res.status == 200) {
            alert("Ora segui il progetto");
            this.follower = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unfollow() {
      axios({
        method: "delete",
        url:
          "http://localhost:3002/api/projects/project/" +
          this.projectId +
          "/unfollow/" + this.store.getUserId(),
      })
        .then((res) => {
          if (res.status == 200) {
            alert("Non segui più il progetto");
            this.follower = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkIfFollower() {
      axios({
        method: "get",
        url:
          "http://localhost:3002/api/projects/project/" +
          this.projectId +
          "/follow/" +
          this.store.getUserId(),
      })
        .then((res) => {
          if (res.data.follow == true) this.follower = true;
          if (res.data.follow == false) this.follower = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDatiDonazioni() {
      axios({
        method: "get",
        url:
          "http://localhost:3002/api/projects/project/" +
          this.projectId +
          "/donation",
      })
        .then((res) => {
          if (res.status == 200) {
            this.totale_donazioni = res.data.importo;
            this.lista_donatori = res.data.donatori;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.downloadProject();
    this.getDatiDonazioni();
    this.checkIfFollower();
  },
};
</script>

<style>
img {
  max-width: 100px;
  max-height: 100px;
}

tr {
  vertical-align: baseline;
}
</style>
