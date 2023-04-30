<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="modal-login"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <form class="form" @submit.prevent="handleSubmit">
          <header class="modal-header">
            <h5 class="modal-title">
              {{ isLoginForm ? "Login" : "Registrazione" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-dismiss="modal"
              aria-label="Chiudi"
              @click="close"
            ></button>
          </header>
          <div class="modal-body">
            <div>
              <div class="form-group">
                <label for="email" class="control-label">Email:</label>
                <input
                  class="form-control"
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                  v-model="email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="password" class="control-label">Password:</label>
                <input
                  class="form-control"
                  type="password"
                  id="password"
                  v-model="password"
                  placeholder="********"
                  required
                />
              </div>
              <div v-if="!isLoginForm">
                <div class="form-group">
                  <label for="name" class="control-label">Nome:</label>
                  <input
                    class="form-control"
                    type="text"
                    id="name"
                    v-model="name"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="surname" class="control-label">Cognome:</label>
                  <input
                    class="form-control"
                    type="text"
                    id="surname"
                    v-model="surname"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="userType" class="control-label"
                    >Registrati come:</label
                  >
                  <select
                    class="form-control"
                    id="userType"
                    v-model="userType"
                    required
                  >
                    <option value="finanziatore">Finanziatore</option>
                    <option value="creatore">Creatore</option>
                  </select>
                </div>
              </div>
              <div class="col text-center">
                <button class="btn btn-danger btn-block mt-2" type="submit">
                  {{ isLoginForm ? "Login" : "Registrati" }}
                </button>
              </div>

              <p v-if="isLoginForm">
                Non hai ancora un account?<span
                  @click="toggleForm"
                  class="special"
                  >Registrati!</span
                >
              </p>
              <p v-else>
                Hai già un account?<span @click="toggleForm" class="special"
                  >Fai il login</span
                >
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useAuthStore } from "@/store/authUser";

export default {
  setup() {
    const store = useAuthStore();
    return {
        store,
    };
  },
  data() {
    return {
      showModal: false,
      email: "",
      password: "",
      name: "",
      surname: "",
      isLoginForm: true,
      userType: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    setUpLoginUserData(id, name, role, surname, email ) {
      // qui ci va il set up delle componenti legate alla login
      this.store.authenticate();
      this.store.setUsername(name);
      this.store.setCognome(surname);
      this.store.setEmail(email);
      this.store.setTypeOfUser(role);
      this.store.setUserId(id);
    },
    setUpLoginProjectsData(list) {
      this.store.setProjectList(list);
    },
    handleSubmit() {
      if (this.isLoginForm) {
        // chiamata che recupera i dati dell'utente
        axios({
          method: "post",
          data: {
            email: this.email,
            password: this.password,
          },
          url: "http://localhost:3002/api/users/login/login",
        })
          .then((res) => {
            if (res.status == 200) {
              const name = res.data.name;
              const surname = res.data.surname;
              const role = res.data.role;
              const email = res.data.email;
              const id = res.data.id;
              this.setUpLoginUserData(id, name, role,surname, email);
              // chiamata che recupera i dati relativi ai progetti collegati all'utente
              axios({
                method: "get",
                url: "http://localhost:3002/api/projects/id/" + id,
              })
                .then((res) => {
                  if (res.status == 200) {
                    console.log(res);
                    this.setUpLoginProjectsData(res.data);
                    // chiudo il form
                    this.close();
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios({
          method: "post",
          //mode: "same-origin",
          data: {
            email: this.email,
            password: this.password,
            role: this.userType,
            name: this.name,
            surname: this.surname,
          },
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          //withCredentials: true,
          url: "http://localhost:3002/api/users/register",
        })
          .then((res) => {
            if (res.status == 200) {
              alert("Registrazione avvenuta con successo.");
              //chiudo il form
              this.close();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    toggleForm() {
      this.isLoginForm = !this.isLoginForm;
    },
  },
};
</script>

<style scoped>
p {
  text-align: center;
  padding: 1rem 1rem 0 1rem;
}
.special {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
}
</style>
