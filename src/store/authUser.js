import { defineStore } from "pinia";
import _ from "lodash";

export const useAuthStore = defineStore({
    id: 'authUserStore',
    state: ()=>({
        isUserAuthenticated: false,
        username: null,
        typeOfUser: null,
        surname: null,
        email: null,
        id: null,
        projectList: [],
        tempProjectId: null,
        tempCreatoreId: null
    }),
    actions: {
        editProjectData(data, id) {
            this.projectList[id].title = data.title;
            this.projectList[id].categoria = data.categoria;
            this.projectList[id].nome_creatore = data.nome_creatore;
            this.projectList[id].descrizione = data.descrizione;
            this.projectList[id].file_immagine = data.file_immagine;
        },
        setTempCreatoreId(creatoreId){
            this.tempCreatoreId = creatoreId;
        },
        getTempCreatoreId(){
            return this.tempCreatoreId;
        },
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
        setCognome(surname){
            this.surname = surname;
        },
        getCognome(){
            return this.surname;
        },
        setEmail(email){
            this.email = email;
        },
        getEmail(){
            return this.email;
        },
        logout() {
            this.isUserAuthenticated = false;
            this.username = null;
            this.typeOfUser = null;
            this.surname = null;
            this.email = null;
            this.id = null;
            this.projectList = [];
            this.tempProjectId = null;
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
        paths: ['username', 'isUserAuthenticated', 'typeOfUser', 'id', 'projectList', 'surname', 'email',],
    },
});