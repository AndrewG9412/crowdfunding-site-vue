<template>
  <div class="container">
    <form id="documentform" class="form" @submit.prevent="handleSubmit">
      <header class="modal-header">
        <h5 class="modal-title">Modifica documento :</h5>
      </header>
      <div class="modal-body">
        <div>
          <div class="form-group">
            <label for="titolo" class="control-label">Titolo :</label>
            <input
              class="form-control"
              type="text"
              id="titolo"
              v-model="titolo"
              required
            />
          </div>
          <div class="form-group">
            <label for="descrizione" class="control-label">Descrizione :</label>
            <br />
            <textarea
              form="documentform"
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
            <label for="tipo_documento" class="control-label"
              >Tipo di documento :</label
            >
            <select
              class="form-control"
              id="tipo_documento"
              v-model="tipo_documento"
              @change="checkPayment($event)"
              required
            >
              <option value="gratuito">Gratuito</option>
              <option value="pagamento">A pagamento</option>
            </select>
            <div v-if="pay">
              <label for="prezzo" class="control-label">Prezzo :</label>
              <input
                class="form-control"
                id="prezzo"
                type="number"
                min="1"
                step="any"
                v-model="prezzo"
              />
            </div>
          </div>
          <br />
          <button class="btn btn-danger" type="submit" @click="handleSubmit">
            Modifica documento
          </button>
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
  watch: {
    oldData(){
        this.titolo = this.oldData[0].titolo; 
        this.descrizione = this.oldData[0].descrizione; 
        this.tipo_documento = this.oldData[0].tipo;
        if (this.tipo_documento == "pagamento") this.pay = true; 
        this.prezzo = this.oldData[0].prezzo;    
    }
  },
  data() {
    return {
      oldData: [],
      titolo: "",
      descrizione: "",
      tipo_documento: "",
      projectId: null,
      pay: false,
      prezzo: "",
    };
  },
  computed: {
    documentId() {
      return this.$route.params.id;
    },
  },
  methods: {
    getOldData() {
      axios({
        method: "get",
        url: "http://localhost:3002/api/documents/document/" + this.documentId,
      })
        .then((res) => {
          if (res.status == 200) {
            this.oldData = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkPayment(e) {
      if (e.target.value == "pagamento") this.pay = true;
      else this.pay = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      axios({
        method: "patch",
        data: {
          titolo: this.titolo,
          descrizione: this.descrizione,
          tipo: this.tipo_documento,
          prezzo: this.pay ? this.prezzo : null,
        },
        url: "http://localhost:3002/api/documents/edit/" + this.documentId,
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            alert("Documento modificato correttamente");
            this.$router.push("/profile");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getOldData();
  },
};
</script>
