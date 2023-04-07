import { defineStore } from "pinia";

export const useAuthStore = defineStore({
    id: 'authUserStore',
    state: ()=>({
        isUserAuthenticated: false,
        username: null,
    }),
    actions: {
        setUsername(username) {
            //sessionStorage.setItem("username", username); // solo di prova
            this.username = username;
        },
        authenticate() {
            this.isUserAuthenticated = true;
        },
        getUsername() {
            return this.username;
        },
        logout() {
            this.isUserAuthenticated = false;
            this.username = null;
        }
    },
    persist: {
        storage: sessionStorage,
        paths: ['username', 'isUserAuthenticated'],
    },
});