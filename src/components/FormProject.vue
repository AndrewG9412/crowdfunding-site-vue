<template>
  <form id="projectform" class="form" @submit.prevent="handleSubmit">
    <header class="modal-header">
      <h5 class="modal-title">Crea progetto :</h5>
    </header>
    <div class="modal-body">
      <div>
        <div class="form-group">
          <label for="titolo" class="control-label">Titolo :</label>
          <input
            class="form-control"
            type="text"
            id="titolo"
            placeholder="gioco di carte"
            v-model="titolo"
            required
          />
        </div>
        <div class="form-group">
          <label for="categoria" class="control-label">Categoria :</label>
          <select
            class="form-control"
            id="categoria"
            v-model="categoria"
            required
          >
            <option value="arte">Arte</option>
            <option value="letteratura">Letteratura</option>
            <option value="informatica">Informatica</option>
            <option value="giochi">Giochi</option>
            <option value="cibo">Cibo</option>
          </select>
        </div>
        <div class="form-group">
          <label for="nome_creatore" class="control-label"
            >Nome creatore :</label
          >
          <input
            class="form-control"
            type="text"
            id="nome_creatore"
            placeholder="Mario Rossi"
            v-model="nome_creatore"
            required
          />
        </div>
        <div class="form-group">
          <label for="descrizione" class="control-label">Descrizione :</label>
          <textarea
            form="projectform"
            class="textDescrizione"
            type="text"
            id="descrizione"
            rows="5"
            cols="70"
            placeholder="Inserisci qui una breve descrizione..."
            v-model="descrizione"
            required
          >
          </textarea>
          />
        </div>
        <div class="form-group">
          <label for="descrizione" class="control-label"
            >Scegli un'immagine:</label
          >
          <input
            type="file"
            id="immagine"
            ref="immagine"
            @change="setImage"
            accept=".png, .jpeg, .jpg"
            required
          />
        </div>
        <button type="submit" @click="handleSubmit">Crea</button>>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      titolo: "",
      categoria: "",
      nome_creatore: "",
      descrizione: "",
      file_immagine: null,
    };
  },
  methods: {
    setImage() {
      this.file_immagine = this.$refs.immagine.files[0];
    },
    handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("immagine", this.file_immagine);
      axios({
          method: "post",
          //mode: "cors",
          data: {
            titolo: this.titolo,
            categoria: this.categoria,
            nome_creatore: this.nome_creatore,
            descrizione: this.descrizione,
            file_immagine: this.file_immagine
          },
          //withCredentials: true,
          url: "http://localhost:3002/api/projects/create/",
        });
      //this.$emit("submit"); 
    },
  },
};
</script>

<style></style>
