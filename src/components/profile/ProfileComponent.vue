<template>
  <div class="ms-2">
    <h1 class="page">Informazioni profilo</h1>

    <h4>Nome : {{ nome }}</h4>

    <h4>Cognome : {{ cognome }}</h4>

    <h4>Email : {{ email }}</h4>

    <h4>Tipo di utente : {{ type }}</h4>
  </div>

  <div
    class="container"
    v-if="store.isUserAuthenticated && store.getTypeOfUser() == 'creatore'"
  >
    <h3 class="listaProg">Lista dei tuoi progetti creati :</h3>
    <ol>
      <li class="m-2 p-2" v-for="project in this.allProjects" :key="project">
        <span class="titolo p-2">{{ project.titolo }} </span>
        <span>{{ project.descrizione }}</span>
        <img :src="project.immagine" alt="img" />
        <button class="btn btn-primary m-1" @click="editProject(project.id)">
          Modifica
        </button>
        <button class="btn btn-danger m-1" @click="deleteProject(project.id)">
          Elimina
        </button>
        <button class="btn btn-primary m-1" @click="linkDoc(project.id)">
          Associa documento
        </button>
        <button
          class="btn btn-primary m-1"
          @click="viewDocs(project.id, project.creatore_id)"
        >
          Visualizza documenti
        </button>
      </li>
    </ol>
  </div>

  <div class="container">
    <h3 style="color : red">Progetti seguiti :</h3>
    <ol>
      <li
        class="m-2 p-2"
        v-for="project of this.followedProjects"
        :key="project"
        >
        <span class="titolo p-2">{{ project.titolo }} </span>
        <span>{{ project.descrizione }}</span>
        <button class="btn btn-primary m-1" @click="seeProject(project.id)">
          Vedi progetto
        </button>
      </li>
    </ol>
  </div>

  <div class="container">
    <h3 style="color : red">Documenti preferiti :</h3>
    <ol>
      <li
        class="m-2 p-2"
        v-for="document in this.favoriteDocuments"
        :key="document"
        >
        <span class="titolo p-2">{{ document.titolo }} </span>
        <span>{{ document.descrizione }}</span>
        <button class="btn btn-primary m-1" @click="seeFavoriteDoc(document.id)">
          Vedi documento
        </button>
      </li>
    </ol>
  </div>

  <div class="container">
    <h3 style="color : red">Documenti acquistati :</h3>
    <ol>
      <li
        class="m-2 p-2"
        v-for="document in this.buyedDocuments"
        :key="document"
        >
        <span class="titolo p-2">{{ document.titolo }} </span>
        <span>{{ document.descrizione }}</span>
        <button class="btn btn-primary m-1" @click="seeBuyedDoc(document.id)">
          Vedi documento
        </button>
      </li>
    </ol>
  </div>

</template>

<script>
import { useAuthStore } from "@/store/authUser";
import axios from "axios";

export default {
  setup() {
    const store = useAuthStore();
    return {
      store,
    };
  },
  data() {
    return {
      allProjects: [],
      followedProjects: [],
      favoriteDocuments: [],
      buyedDocuments: [],
    };
  },
  methods: {
    fetchProjects() {
      axios({
        method: "get",
        url: "http://localhost:3002/api/projects/id/" + this.store.getUserId(),
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.allProjects = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editProject(projectId) {
      this.$router.push({
        name: "EditProject",
        params: { id: projectId },
      });
    },
    viewDocs(projectId, creatoreId) {
      this.store.setTempCreatoreId(creatoreId);
      this.$router.push({
        name: "SeeLinkedDocuments",
        params: { projectId: projectId },
      });
    },
    linkDoc(projectId) {
      this.store.setTempProjectId(projectId);
      this.$router.push("/document");
    },
    deleteProject(id) {
      console.log("deleting project...", id);
      // chiamata che recupera i dati relativi ai progetti collegati all'utente
      axios({
        method: "delete",
        url: "http://localhost:3002/api/projects/" + id,
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.store.removeElementInList(id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFollowedProjects(){
      axios({
        method: "get",
        url: "http://localhost:3002/api/projects/followed/" + this.store.getUserId(),
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.followedProjects = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFavoriteDocuments(){
      axios({
        method: "get",
        url: "http://localhost:3002/api/documents/favorites/" + this.store.getUserId(),
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.favoriteDocuments = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBuyedDocuments(){
      axios({
        method: "get",
        url: "http://localhost:3002/api/documents/buyed/" + this.store.getUserId(),
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(res);
            this.buyedDocuments = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    seeProject(projectId){
      this.$router.push({
        name: "ViewProject",
        params: {id : projectId}
      })
    },
    seeFavoriteDoc(docId){
      this.$router.push({
        name: "ViewDocument",
        params: {id : docId}
      })
    },
    seeBuyedDoc(docId){
      this.$router.push({
        name: "ViewDocument",
        params: {id : docId}
      })
    },
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
    type() {
      return this.store.getTypeOfUser();
    },
  },
  mounted() {
    this.fetchProjects();
    this.getFollowedProjects();
    this.getFavoriteDocuments();
    this.getBuyedDocuments();
  },
};
</script>

<style scoped>
.page {
  color: red;
}

.listaProg {
  color: red;
}

.titolo {
  font-weight: bold;
  font-size: 20px;
}

.container {
  max-width: 100%;
}

img {
  max-width: 120px;
  max-height: 120px;
}
</style>
