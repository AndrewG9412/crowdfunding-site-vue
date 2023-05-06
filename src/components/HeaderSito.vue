<template>
  <div class="header">
    <nav class="fisso">
      <router-link class="nomeSito" to="/">Sito di crowdfunding</router-link>
      <div class="barraRicerca">
        <input type="search" v-model="stringaRicerca" />
        <span
          class="fa fa-search ms-1 tastoRicerca"
          @click="iniziaRicerca(this.stringaRicerca)"
        ></span>
        <button
          class="btn btn-primary"
          @click="goToAdvancedSearch()"
        >
          Ricerca avanzata
        </button>
      </div>
      <ol>
        <li v-if="store.getTypeOfUser() == 'creatore'">
          <router-link class="nav-buttons" to="/create"
            >Nuovo progetto</router-link
          >
        </li>
        <li v-if="store.isUserAuthenticated">
          <router-link class="nav-buttons" to="/profile">Profilo</router-link>
        </li>
        <li v-if="store.isUserAuthenticated">
          <button class="btn btn-danger" @click="logout">Logout</button>
        </li>
        <li v-if="!store.isUserAuthenticated">
          <button type="button" class="btn btn-danger" @click="showModal">
            Login
          </button>
        </li>
      </ol>
    </nav>
  </div>
  <login-modal @close="hideModal"></login-modal>
</template>

<script>
import LoginModal from "./modals/LoginModal.vue";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import { useAuthStore } from "@/store/authUser";

export default {
  components: { LoginModal},
  setup() {
    const store = useAuthStore();
    return {
      store,
    };
  },
  data() {
    return {
      showAdvancedSearch: false,
      showLoginModal: false,
      stringaRicerca: "",
      modale: null,
    };
  },
  methods: {
    logout() {
      this.store.logout(); // clean delle store variables
      this.$router.push("/"); // reindirizzo l'utente alla root dopo che si è sloggato (ho pulito tutte le variabili nello store)
    },
    updateStatusModal(value) {
      this.showLoginModal = value;
    },
    iniziaRicerca() {
      if (this.stringaRicerca !== "") {
        this.$router.push({
          name: "ResultResearch",
          params: { keyword: this.stringaRicerca },
        });
      }
    },
    showModal() {
      const modal = document.getElementById("modal-login");
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
    goToAdvancedSearch(){
      this.$router.push({name: "AdvancedSearch"});
    }
  },
};
</script>

<style scoped>

a {
  text-decoration: none;
}

li {
  display: flex;
}

nav {
  background-color: white;
  border-bottom: 1px solid black;
}

.tastoRicerca {
  cursor: pointer;
}

.nav-buttons {
  background-color: #dc3545;
  color: white;
  padding: 0.5em;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px 0 10px;
}

.nav-buttons:hover {
  background-color: darkred;
}

.fisso {
  position: fixed;
  left: 0;
  top: 0;
}

.nomeSito {
  display: flex;
  align-items: center;
  color: red;
  font-size: 20px;
  cursor: pointer;
}

.nomeSito:hover {
  text-decoration: underline;
}

nav .barraRicerca {
  display: flex;
  margin: auto 0;
  height: 35px;
  line-height: 35px;
}

nav .barraRicerca input {
  height: 100%;
  font-size: 0 10px;
  font-size: 20px;
  width: 200px;
}

nav .barraRicerca span {
  font-size: 20px;
  height: 100%;
  padding: 8px;
  position: relative;
  z-index: 1;
}

nav {
  display: flex;
  width: 100%;
  position: relative;
  justify-content: space-between;
  text-align: center;
  padding: 15px 30px;
}

nav ol {
  display: flex;
  list-style: none;
  margin: auto 0;
}

nav ol li {
  margin: 0 2px;
}
nav ol li button {
  font-size: 20px;
}

nav ol li a {
  color: red;
  font-size: 20px;
  text-decoration: none;
  text-transform: capitalize;
  letter-spacing: 1px;
  padding: 5px 10px;
}

nav ol li:hover a {
  color: red;
}


</style>
