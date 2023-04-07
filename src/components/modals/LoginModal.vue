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

export default {
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
    // handleCloseModal() {
    //   this.showModal = false;
    // },
    handleSubmit() {
      if (this.isLoginForm) {
        axios({
          method: "post",
          //mode: "cors",
          data: {
            email: this.email,
            password: this.password,
          },
          //withCredentials: true,
          url: "http://localhost:3002/api/users/login",
        });
      } else {
        axios({
          method: "post",
          //mode: "cors",
          data: {
            email: this.email,
            password: this.password,
            role: this.userType,
            name: this.name,
            surname: this.surname,
          },
          //withCredentials: true,
          url: "http://localhost:3002/api/users/register",
        })
          .then((res) => {
            if (res.ok) {
              alert("Registrazione avvenuta con successo.");
              this.toggleForm();
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
