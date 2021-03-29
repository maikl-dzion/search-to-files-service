import Vue from "vue";

const EventBus = new Vue();

import { mapActions } from 'vuex'

export default {

    methods: {

        ...mapActions([
           'setFileContent'
        ]),

        // Создать событие и отправить данные
        sendEventBus(eventName, data = null) {
            EventBus.$emit(eventName, data);
        },

        // По событию получить данные
        getEventBus(eventName, fn) {
            EventBus.$on(eventName, response => { fn(response); });
        },

        // Получить содержимое файла
        getFileContent(event, path, type = 'arr') {
            const url = '/file/content/get';
            const data = { path, type };
            this.post(url, data, (response) => {
                this.setFileContent(response.result)
                // this.createEvent('file-content', { file : response.result })
            });
        },

        // -- Устанавливаем директории web сервера
        getServerDir() {
            let name = 'server';
            this.getDirPath(name);
            this.get('/scan/dir/' + name, response => {
                this.rootDirList = response['result'];
            });
        },

        // -- Устанавливаем директории OS
        getSystemDir() {
            let name = 'system';
            this.getDirPath(name);
            this.get('/scan/dir/' + name, response => {
                this.rootDirList  = response['result'];
            });
        },

        getDirPath(name) {
            this.get('/get/dir/path/' + name, response => {
                this.rootPath = response['result'];
                this.pathSearch = this.rootPath;
            });
        },

        // -- Поиск по файлам
        findTextToFiles() {

            this.resultList = [];
            this.errorMessage = '';

            let text = this.textSearch;
            let path  = this.pathSearch;
            if (!text) {
                alert('Поле для поиска пустое');
                return;
            }

            const url = '/find/text';
            this.preloader = true;
            this.post(url, { path, text }, response => {
                this.preloader = false;
                if (response['error'])
                    this.errorMessage = response['error'];
                this.resultList = response.result;
                this.panelActive = 'find-result';
            });
        },

        catalogUpdate() {
            this.setStore('api_url', this.apiUrl);
            this.setDir('apache');
        },

        clearResult() {
            this.resultList = [];
            this.fileContentList = [];
        },

        setStore(name, value) {
            localStorage.setItem(name, value);
        },

        getStore() {
            if (!this.textSearch)
                this.textSearch = localStorage.getItem('text_value');

            if (!this.pathSearch)
                this.pathSearch = localStorage.getItem('path_name');

            let apiUrl = localStorage.getItem('api_url');
            if (apiUrl)
                this.apiUrl = apiUrl;

        },

        elemRemoveClass(activeClass) {
            const elems = document.querySelectorAll('.' + activeClass)
            for(let i in elems) {
                const el = elems[i];
                if(el.classList)
                    el.classList.remove(activeClass)
            }
        }

    },

};
