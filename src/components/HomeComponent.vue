<template>
    <div class="container">
        <h3>Lista dei tuoi progetti attivi:</h3>
        <ol>
            <li v-for="project in store.getProjectList()" :key="project"> titolo: {{  project.titolo  }} - immagine: <img :src="project.immagine" alt="img"><button class="btn btn-danger" @click="deleteProject(project.id)">elimina</button></li>
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
            return { }
        },
        methods: {
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
            }
        },
    }

</script>

<style scoped>
    img {
        max-width: 150px;
        max-height: 150px;
    }
</style>