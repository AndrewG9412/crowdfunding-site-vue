<template>
  <div class="container">
    <form id="documentform" class="form" @submit.prevent="handleSubmit">
      <header class="modal-header">
        <h5 class="modal-title">Crea documento :</h5>
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
                <input class="form-control" id="prezzo" type="number" min="1" step="any" v-model="prezzo" />
            </div>
          </div>
          <br>
          <button class="btn btn-danger" type="submit" @click="handleSubmit">Crea documento</button>
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
            descrizione: "",
            tipo_documento: "",
            data:'',
            projectId: null,
            pay: false,
            prezzo : '',
        };
    },
    methods :{
        checkPayment(e) {
            if(e.target.value == "pagamento")
                this.pay = true;
            else
                this.pay =  false;
        },
        getDataOdierna(){
            const date = new Date();

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            // This arrangement can be altered based on how we want the date's format to appear.
            let currentDate = `${day}/${month}/${year}`;
            return currentDate;
        },
        handleSubmit(e) {
            e.preventDefault();
            const data = this.getDataOdierna();
            axios({
                method: "post",
                data: {
                    titolo: this.titolo,
                    descrizione: this.descrizione,
                    data: data,
                    tipo: this.tipo_documento,
                    prezzo: this.pay? this.prezzo : null,
                    project_id: this.projectId,
                },
                url: "http://localhost:3002/api/documents/create",
                })
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    mounted() {
        this.projectId = this.store.tempProjectId;
    },
};
</script>

<style scoped>


</style>
