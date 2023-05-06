<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="payment-modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <form class="form" @submit.prevent="handleSubmit">
          <header class="modal-header">
            <h5 class="modal-title">Pagamento documento</h5>
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
                <label for="nome" class="control-label">Nome:</label>
                <input
                  class="form-control"
                  type="text"
                  id="nome"
                  placeholder="Mario"
                  v-model="nome"
                  required
                />
              </div>
              <div class="form-group">
                <label for="cognome" class="control-label">Cognome:</label>
                <input
                  class="form-control"
                  type="text"
                  id="cognome"
                  placeholder="Rossi"
                  v-model="cognome"
                  required
                />
              </div>
              <div class="form-group">
                <label for="tipo_carta" class="control-label"
                  >Tipo carta:</label
                >
                <select
                  class="form-control"
                  id="tipo_carta"
                  v-model="tipo_carta"
                  required
                >
                  <option value="visa">VISA</option>
                  <option value="mastercard">MASTERCARD</option>
                  <option value="american_express">AMERICAN EXPRESS</option>
                </select>
              </div>
              <div class="form-group">
                <label for="numero_carta" class="control-label"
                  >Numero di carta:</label
                >
                <br />
                <input
                  class="form-control"
                  type="number"
                  id="numero_carta"
                  maxLength="16"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  v-model="numero_carta"
                  required
                />
              </div>
              <div class="form-group">
                <label for="ccv" class="control-label">CCV:</label>
                <input
                  class="form-control"
                  maxLength="3"
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  type="number"
                  id="ccv"
                  v-model="ccv"
                  required
                />
              </div>
              <div class="col text-center">
                <button class="btn btn-danger btn-block mt-2" type="submit">
                  Conferma acquisto
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["utente", "documento"],
  data() {
    return {
      nome: "",
      cognome: "",
      tipo_carta: "",
      numero_carta: "",
      ccv: "",
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    handleSubmit() {
      axios({
        method: "post",
        data: {
          userId: this.utente,
          docId: this.documento,
        },
        url: "http://localhost:3002/api/documents/document/buydoc",
      }).then((res) => {
        if (res.status == 200) {
          this.close()
          this.$router.push({
            name: "ViewDocument",
            params: { id: this.documento},
          });
        }
      }).catch((err) =>{
        console.log(err);
      });
    },
  },
};
</script>
