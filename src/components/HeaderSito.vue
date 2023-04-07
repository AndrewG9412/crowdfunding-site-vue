<template>
  <div>
    <nav class="fisso">
      <div class="nomeSito">Sito di crowdfunding</div>
      <div class="barraRicerca">
        <input
          type="search"
          v-model="stringaRicerca"
          @keyup.enter="iniziaRicerca"
        />
        <span class="fa fa-search ms-1" @click="iniziaRicerca"></span>
      </div>
      <ol>
        <li v-if="store.isUserAuthenticated">
          <router-link class="nav-buttons" to="/createproj"
            >Nuovo progetto</router-link
          >
        </li>
        <li v-if="store.isUserAuthenticated">
          <router-link class="nav-buttons" to="/profile"
            >Profilo</router-link
          >
        </li>
        <li v-if="store.isUserAuthenticated">
          <button class="btn btn-danger" @click="logout">
            Logout
          </button>
        </li>
        <li v-if="!store.isUserAuthenticated">
          <button
            type="button"
            class="btn btn-danger"
            @click="showModal"
          >
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
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import { useAuthStore } from "@/store/authUser";

export default {
  components: { LoginModal },
  setup() {
    const store = useAuthStore();
    return {
        store,
    };
  },
  data() {
    return {
      showLoginModal: false,
      stringaRicerca: "",
      modale: null,
    };
  },
  methods: {
    logout() {
      this.store.logout();
    },
    updateStatusModal(value) {
      this.showLoginModal = value;
    },
    iniziaRicerca() {
      if (this.stringaRicerca !== "") {
        console.log(this.stringaRicerca);
      }
    },
    showModal() {
        const modal = document.getElementById(
            "modal-login"
        );
        document.body.appendChild(modal);
        var myModal = new bootstrap.Modal(modal, {
            keyboard: false,
        });

        myModal.show();

        this.modale = myModal;
    },
    hideModal() {
      this.modale.hide();
    }
  },
};
</script>

<style scoped>

li {
  display: flex;
}

nav {
  background-color: white; /* bianco per ora, cambialo con il bg che vuoi */
  border-bottom: 1px solid black;
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
