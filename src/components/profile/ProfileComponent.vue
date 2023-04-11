<template>
    <div class="ms-2">
        <h1 class="page">Pagina profilo</h1>

        <h4>Nome : {{nome}}</h4>

        <h4>Cognome : {{cognome}}</h4>

        <h4>Email : {{email}}</h4>

        <h4>Tipo di utente : {{type}}</h4>
    </div>
</template>

<script>
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
    };
  },
  computed: {
    nome() {
        return this.store.getUsername();
    },
    cognome() { 
        return this.store.getCognome();  
    },
    email() {
        return this.store.getEmail();
    },  
    type(){
        return this.store.getTypeOfUser();
    }
  },
}
</script>

<style>
.page{
    color: red;
}
</style>