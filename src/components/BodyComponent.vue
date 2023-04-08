<template>
    <div>
        <h3 v-if="store.isUserAuthenticated">Benvenuto: {{ username}}!</h3>
        <h3 v-else>Se vuoi visualizzare i tuoi progetti, effettua la login!</h3>
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
        // nada
    };
  },
  computed: {
    username() {
        return this.store.getUsername();
    }
  },
}
</script>