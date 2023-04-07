import {createApp} from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'bootstrap/dist/css/bootstrap.css'
import App from "./App.vue";
import './assets/global.css';
// import { createRouter, createWebHistory } from "vue-router";

// const router = createRouter({
//   history: createWebHistory(),
  
// });

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(pinia).mount("#app");
