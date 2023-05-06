import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "@/store/authUser";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.vue";
import "./assets/global.css";
import { createRouter, createWebHistory } from "vue-router";
import NewProjectComponent from "./components/projects/NewProjectComponent";
import ProfileComponent from "./components/profile/ProfileComponent";
import FormDocument from "./components/projects/FormDocument";
import HomeComponent from "./components/HomeComponent";
import ViewProjectComponent from "./components/projects/ViewProjectComponent";
import ViewListProjectPerCategory from "./components/projects/ViewListProjectsPerCategory";
import ViewLinkedDocuments from "./components/projects/ViewLinkedDocuments";
import EditProject from "./components/projects/EditProject";
import EditDocument from "./components/projects/EditDocument";
import ViewDocument from "./components/projects/ViewDocument";
import ResultResearch from "./components/ResultResearch";
import AdvancedSearch from "./components/AdvancedSearch";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/create", name: "Create", component: NewProjectComponent },
    { path: "/document", name: "Document", component: FormDocument },
    { path: "/viewProj", name: "ViewProject", component: ViewProjectComponent },
    { path: "/profile", name: "Profile", component: ProfileComponent },
    { paths: "/home", component: HomeComponent },
    {
      path: "/viewProjCategory/:category",
      name: "ViewProjectPerCategory",
      component: ViewListProjectPerCategory,
    },
    {
      path: "/seeDocs/:projectId",
      name: "SeeLinkedDocuments",
      component: ViewLinkedDocuments,
      props: true,
    },
    {
      path: "/editProject/:id",
      name: "EditProject",
      component: EditProject,
      props: true,
    },
    {
      path: "/editDocument/:id",
      name: "EditDocument",
      component: EditDocument,
    },
    {
      path: "/viewDocument/:id",
      name: "ViewDocument",
      component: ViewDocument,
    },
    {
      path: "/resultResearch/:keyword",
      name: "ResultResearch",
      component: ResultResearch,
    },
    {
      path: "/advancedSearch",
      name: "AdvancedSearch",
      component: AdvancedSearch
    }

  ],
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const vue = createApp(App);
vue.use(pinia);

router.beforeEach((to) => {
  const userStore = useAuthStore();
  const auth = userStore.isUserAuthenticated;
  const role = userStore.getTypeOfUser();
  if (to.name == "Create" && !auth && role != "creatore") return "/";
  if (to.name == "Create" && role != "creatore") return "/";
  if (to.name == "Document" && !auth && role != "creatore") return "/";
  if (to.name == "Profile" && !auth) return "/";
});

vue.use(router).mount("#app");
