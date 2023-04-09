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
                <label for="tipo_carta" class="control-label">Tipo carta:</label>
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
                <label for="numero_carta" class="control-label">Numero di carta:</label>
                <br>
                <input
                  class="form-control"
                  type="number"
                  id="numero_carta"
                  v-model="numero_carta"
                  required
                />
              </div>
              <div class="form-group">
                <label for="ccv" class="control-label">CCV:</label>
                <input
                  class="form-control"
                  maxlength="3"
                  type="number"
                  id="ccv"
                  v-model="ccv"
                  required
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        nome: '',
        cognome: '',
        tipo_carta: '',
        numero_carta: '',
        ccv:''
      }
    },
    methods: {
      handleSubmit() {
        console.log(this.nome)
      },
      close() {
        //$('#modal-login').modal('hide')
      }
    }
  }
</script>