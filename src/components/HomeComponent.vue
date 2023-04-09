<template>
    <div class="container">
        <h3>I progetti del sito:</h3>
        <ol>
            <li v-for="project in allProjects" :key="project">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Creatore</th>
                        <th scope="col">Titolo</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Descrizione</th>
                        <th scope="col">Immagine</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">{{ project.nome_creatore }}</th>
                            <td>{{ project.titolo }}</td>
                            <td>{{ project.categoria }}</td>
                            <td>{{ project.descrizione }}</td>
                            <td><img :src="project.immagine" alt="img"></td>
                        </tr>
                    </tbody>
                </table>
            </li>
        </ol>
    </div>
    <div class="container" v-if="store.isUserAuthenticated">
        <h3>Lista dei tuoi progetti attivi:</h3>
        <ol>
            <li v-for="project in store.getProjectList()" :key="project"> titolo: {{  project.titolo  }} - immagine: <img :src="project.immagine" alt="img"><button class="btn btn-danger" @click="deleteProject(project.id)">elimina</button> <button class="btn btn-warning" @click="linkDoc(project.id)">Associa documento</button></li>
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
            }
        },
        methods: {
            linkDoc(projectId) {
                this.store.setTempProjectId(projectId);
                this.$router.push('/document');
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
            fetchProjects() {
                axios({
                    method: "get",
                    url: "http://localhost:3002/api/projects/",
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
            // openImage(link) {
            //     window.open(link);
            // },
        },
        mounted() {
            this.fetchProjects();
        },
    }

</script>

<style scoped>
    img {
        max-width: 100px;
        max-height: 100px;
    }

    tr {
        vertical-align: baseline;
    }
</style>