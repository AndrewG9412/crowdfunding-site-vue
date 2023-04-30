<template>
  <div class="container">
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
            <br>
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
          </div>
          <div class="form-group">
            <label for="descrizione" class="control-label"
              >Scegli un'immagine:</label
            >
            <input
              type="file"
              id="immagine"
              ref="immagine"
              @change="uploadImage($event)"
              accept=".png, .jpeg, .jpg"
              required
            />
          </div>
          <div class="image-box">
            <img :src="previewImage" alt="image">
          </div>
          <button class="btn btn-danger" type="submit" @click="handleSubmit">Crea</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
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
      titolo: "",
      categoria: "",
      nome_creatore: "",
      descrizione: "",
      file_immagine: null,
      previewImage: null,
    };
  },
  methods: {
    uploadImage(e){
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e =>{
          this.previewImage = e.target.result;
      };
    },
    handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("immagine", this.previewImage);
      axios({
          method: "post",
          data: {
            titolo: this.titolo,
            categoria: this.categoria,
            nome_creatore: this.nome_creatore,
            creatore_id: this.store.id,
            descrizione: this.descrizione,
            file_immagine: this.previewImage
          },
          url: "http://localhost:3002/api/projects/create",
        })
        .then((res) => {
            if (res.status == 200) {
              alert("Progetto creato correttamente");
              this.$router.push("/home");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      //this.$emit("submit"); 
    },
  },
};
</script>

<style scoped>
  img {
    max-width: 250px;
    max-height: 250px;
    border: 2px solid red;
    border-radius: 5px;
  }
  .image-box {
    padding: 1.5rem;
  }
</style>
