<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="comment-modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <form class="form" @submit.prevent="handleSubmit">
          <header class="modal-header">
            <h5 class="modal-title">Commento al documento</h5>
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
              <label for="nome" class="control-label">Autore:</label>
              <input
                class="form-control"
                type="text"
                id="nome"
                placeholder="Mario"
                v-model="autore"
                required
              />
            </div>
            <div class="form-group">
              <label for="commento" class="control-label">Commento:</label>
              <input
                class="form-control"
                type="text"
                id="commento"
                v-model="commento"
                required
              />
            </div>
            <div class="col text-center">
              <button class="btn btn-danger btn-block mt-2" type="submit">
                Commenta
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
  props: ["id_doc", "id_user"],  
  data() {
    return {
      autore: "",
      commento: "",
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
          autore: this.autore,
          commento: this.commento,
          id_user : this.id_user,
        },
        url: "http://localhost:3002/api/documents/document/" + this.id_doc + "/comment",
      })
        .then((res) => {
          if (res.status == 200) {
            alert("Commento effettuato");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
