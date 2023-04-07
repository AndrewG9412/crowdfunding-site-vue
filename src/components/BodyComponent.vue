<template>
    <div>
        <h1>{{ username}}</h1>
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