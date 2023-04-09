import {createApp} from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from '@/store/authUser'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'bootstrap/dist/css/bootstrap.css'
import App from "./App.vue";
import './assets/global.css';
import { createRouter, createWebHistory } from "vue-router";
import NewProjectComponent from "./components/projects/NewProjectComponent";
import ProfileComponent from "./components/profile/ProfileComponent";
import FormDocument from "./components/projects/FormDocument";
import HomeComponent from "./components/HomeComponent";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/create", name: "Create", component: NewProjectComponent },
    { path: "/document", name: "Document", component: FormDocument },
    { path: "/profile", component: ProfileComponent },
    { paths: "/home", component: HomeComponent },
  ]
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const vue = createApp(App);
vue.use(pinia);

router.beforeEach((to) => {
    const userStore = useAuthStore();
    const auth = userStore.isUserAuthenticated;
    const role = userStore.getTypeOfUser();
    if (to.name == "Create" && !auth && role != "creatore") return '/'
  })

vue.use(router).mount("#app");



