import { defineStore } from "pinia";
import _ from "lodash";

export const useAuthStore = defineStore({
    id: 'authUserStore',
    state: ()=>({
        isUserAuthenticated: false,
        username: null,
        typeOfUser: null,
        id: null,
        projectList: [],
        tempProjectId: null,
    }),
    actions: {
        setTempProjectId(id) {
            this.tempProjectId = id;
        },
        setProjectList(list) {
            this.projectList = list;
        },
        removeElementInList(id) {
            _.remove(this.projectList, (item) => {
                return item == id;
            });
        },
        getProjectList() {
            return this.projectList;
        },
        setUsername(username) {
            this.username = username;
        },
        setUserId(id) {
            this.id = id;
        },
        getUserId() {
            return this.id;
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
        },
        setTypeOfUser(type) {
            this.typeOfUser = type;
        },
        getTypeOfUser() {
            return this.typeOfUser;
        },
        getAuth() {
          return this.isUserAuthenticated;  
        },
    },
    persist: {
        storage: sessionStorage,
        paths: ['username', 'isUserAuthenticated', 'typeOfUser', 'id', 'projectList'],
    },
});