<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="editing-comment-modal"
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
                Modifica commento
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
  props: ["id_commento"],
  data() {
    return {
      oldComment: [],
      autore: "",
      commento: "",
    };
  },
  watch: {
    oldComment() {
      this.autore = this.oldComment[0].autore;
      this.commento = this.oldComment[0].commento;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    getOldComment() {
      axios({
        method: "get",
        url:
          "http://localhost:3002/api/documents/document/comment/" +
          this.id_commento,
      })
        .then((res) => {
          if (res.status == 200) {
            this.oldComment = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSubmit() {
      axios({
        method: "patch",
        data : {
          autore: this.autore,
          commento: this.commento,
        },
        url:
          "http://localhost:3002/api/documents/document/editComment/" +
          this.id_commento,
      })
        .then((res) => {
          if (res.status == 200) {
            alert("Documento modificato");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted(){
    this.getOldComment();
  }
};
</script>
