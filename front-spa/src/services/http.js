
import axios from 'axios'

export default {

    data () {
       return {
           host     : 'http://localhost',
           apiPath  : '/search-to-files-service/api/index.php',
           apiUrl   : "",
           jwtToken : false,
           authData : {
               'user'    : 'admin',
               'password': '1234',
           },
       }
    },

    created() {
        this.setApiUrl();
    },

    methods: {

        setApiUrl(path = null) {
            const url  = (path)  ? path : this.apiPath;
            this.apiUrl = this.host + url;
        },

        getApiUrl(url, path = null) {
            console.log(location)
            if(path) this.setApiUrl(path);
            return this.apiUrl + url;
        },

        ////// Авторизация
        async auth() {

            const url  = '/authenticate';
            const data   = this.authData;
            const apiUrl = this.apiUrl + url;
            let response = [];
            try {
                response = await await axios.post(apiUrl, data);
            } catch (e) {
                alert('Не удалось выполнить запрос к серверу (fn auth)');
            }

            if (response.data && response.data.access_token) {
                this.jwtToken = response.data.access_token;
            } else {
                alert('Не удалось получить токен');
            }
        },

        getHeaders() {
            const jwtToken = this.jwtToken;
            const headers = {
                'Authorization': 'Bearer ' + jwtToken,
                'Content-Type' : 'application/json',
            };
            return { headers };
        },

        async http(param) {
            const apiUrl = this.getApiUrl(param.url);
            let options  = this.getHeaders();
            let response = [];
            try {
                if (!param.data) {
                    response = await axios.get(apiUrl, options);
                } else {
                    let method = param.method;
                    response = await axios[method](apiUrl, param.data, options);
                }
            } catch (e) {
                alert('Не удалось выполнить запрос к серверу (fn http)');
                console.log(e, 'ERROR:HTTP-SEND:');
            }
            const result = response.data;
            if (!param.fn) return result;
            param.fn(result);
        },


        async get(url, fn) {
            const uri = this.apiUrl + url;
            try {
                const response = await axios.get(uri);
                let result = this.responseHandler(response, fn);
                if(result) return result;
                console.log(result);
            } catch (error) {
                // lg(['HTTP ERROR - GET', error]);
                console.error(error);
            }

        },

        async post(url, data = null, fn = null) {
            const uri = this.apiUrl + url;
            try {
                const response = await axios.post(uri, data);
                let result = this.responseHandler(response, fn);
                if(result)
                    return result;
            } catch (error) {
                // lg(['HTTP ERROR - POST', error]);
                console.error(error);
            }
        },

        responseHandler(response, fn = null) {

            let httpInfo = this.setHttpInfo(response);
            const typeData = typeof response.data;
            if(typeData != 'object') return false;

            const data = response.data;
            httpInfo['warn'] = (!data.warn) ? data.warn : '';
            httpInfo['info'] = (!data.info) ? data.info : '';

            if(fn) {
                fn(data);
                return false;
            }
            return data;
        },

        setHttpInfo(response) {
            let httpInfo = {};
            httpInfo.code    = response.status;
            httpInfo.text    = response.statusText;
            httpInfo.uri     = response.config.url;
            httpInfo.headers = response.headers;
            return httpInfo;
        },


    },
};
