<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="donation-modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <form class="form" @submit.prevent="handleSubmit">
          <header class="modal-header">
            <h5 class="modal-title">Donazione a progetto</h5>
            <button
              type="button"
              class="btn-close"
              data-dismiss="modal"
              aria-label="Chiudi"
              @click="close"
            ></button>
          </header>
          <div class="modal-body">
            <div class="form-group">
              <label for="nome" class="control-label">Nome donatore:</label>
              <input
                class="form-control"
                type="text"
                id="nome"
                placeholder="Mario"
                v-model="donatore"
                required
              />
            </div>
            <div class="form-group">
              <label for="importo" class="control-label"
                >Importo donazione:</label
              >
              <input
                class="form-control"
                type="number"
                id="importo"
                maxLength="4"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                v-model="donazione"
                required
              />
            </div>
            <div class="col text-center">
              <button class="btn btn-danger btn-block mt-2" type="submit" >
                Conferma donazione
              </button>
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
    props: ["progetto"],
    data() {
    return {
      donatore: "",
      donazione: ""
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    handleSubmit(){
        axios({
            method: "post",
            data: {
                nome: this.donatore,
                importo: this.donazione,
          },
            url: "http://localhost:3002/api/projects/donation/" + this.progetto
        }).then((res) => {
            if (res.status == 200) {
                alert("Donazione effettuata");
                close();
            }    
        }).catch((err) => {
            console.log(err);    
        });
    },
  },
};
</script>
