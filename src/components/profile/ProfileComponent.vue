<template>
    <div class="ms-2">
        <h1>Pagina profilo</h1>

        <h2>Nome : {{nome}}</h2>

        <h2>Cognome : {{cognome}}</h2>

        <h2>Email : {{email}}</h2>

        <h2>Tipo di utente : {{type}}</h2>
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