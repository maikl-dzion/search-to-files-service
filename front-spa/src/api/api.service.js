import axios from 'axios'

class ApiService {

  response = {};
  data = null;
  status = 0;
  statusText = '';
  error = false;
  errStatus = false;
  errMessage = '';
  token = false;

  constructor(apiUrl = null) {
    const url = (!apiUrl) ? 'http://bolderfest.ru/user-profile/api/v1' : apiUrl;
    this.apiUrl = url
  }

  getHeaders() {
    const token = this.token;
    const headers = {
      'Jwt-Auth-Token' :  token,
      'Content-Type'   : 'application/json',
    };
    return headers;
  }

  urlFormat(param, ds = '/') {
    return param  = (param) ? ds + param : '';
  }

  async get(url = null) {
    const headers = this.getHeaders();
    const api = this.apiUrl + url;
    this.response = await axios.get(api, { headers });
    this.responseHandle(this.response);
    return this.getResultData();
  }

  async post(url, data = []) {
    const headers = this.getHeaders();
    const api     = this.apiUrl + url;
    this.response = await axios.post(api, data,  { headers });
    this.responseHandle(this.response);
    return this.getResultData();
  }

  async put(url, data = []) {
    const headers = this.getHeaders();
    const api     = this.apiUrl + url;
    this.response = await axios.put(api, data,  { headers });
    this.responseHandle(this.response);
    return this.getResultData();
  }

  async delete(url) {
    const headers = this.getHeaders();
    const api = this.apiUrl + url;
    this.response = await axios.get(api, { headers });
    this.responseHandle(this.response);
    return this.getResultData();
  }

  setApiUrl(url) { this.apiUrl = url; }

  getApiUrl(url = '') { return this.apiUrl + url; }

  responseHandle(response) {

    this.statusText = (response.status) ? response.status : '';

    if(response.status) {
      this.status = response.status;

      if(!this.status || this.status != 200) {
        this.errStatus = true;
        this.errorMessage = `Не удалось выполнить запрос!
                                          Код ответа: ${this.status}, текст ответа : ${this.statusText}`;
        alert(this.errorMessage);
        console.log(response);
        return false;
      }
    }

    if(response.data) {

      this.data = response.data;
      const datatype = typeof this.data;

      if(datatype != 'object') {
        this.errStatus = true;
        this.errorMessage = `C сервера пришел неправильный формат данных! (${datatype})`;
        this.error = this.data
        alert(this.errorMessage);
        console.log(response);
        return false
      }

      if(this.data.error) {
        this.errStatus = true;
        this.errorMessage = `Произошла ошибка на сервере! (data.error)`;
        this.error = this.data.error
        alert(this.errorMessage);
        console.log(response);
        return false;
      }

    } else {
      this.errStatus = true;
      this.errorMessage = `Не данных ! (response.data)`;
      this.error = response;
      alert(this.errorMessage);
      console.log(response);
      return false
    }

    return this.data;
  }

  errorHandle() {
  }

  getResponse(fname = null) {
    const response = this.response;
    let result = response;
    if(fname) result = (response[fname]) ? response[fname] : response
    return result;
  }

  getResultData() {
    if(this.response.data)
      return this.response.data;
    return false;
  }

  getError() {
    return this.error;
  }

  async send(url, data = null, method = 'get', callback = null) {

    const apiUrl  = this.getApiUrl(url);
    const headers = this.getHeaders();
    this.response = {};

    try {
        if (!data) {
          this.response = await axios[method](apiUrl, { headers });
        } else {
          this.response = await axios[method](apiUrl, data, { headers });
        }
    } catch (e) {
        alert('Не удалось выполнить запрос к серверу (HTTP-ERROR)' + e);
        console.log(e, 'ERROR:HTTP-SEND:');
        return false;
    }

    let result = this.responseHandle(this.response);
    if(!result)  return false;

    if (callback)
      callback(result);

    return result;
  }

}

export default ApiService


// {
//   // `data` is the response that was provided by the server
//   data: {},
//
//   // `status` is the HTTP status code from the server response
//   status: 200,
//
//     // `statusText` is the HTTP status message from the server response
//   statusText: 'OK',
//
//   // `headers` the HTTP headers that the server responded with
//   // All header names are lower cased and can be accessed using the bracket notation.
//   // Example: `response.headers['content-type']`
//   headers: {},
//
//   // `config` is the config that was provided to `axios` for the request
//   config: {},
//
//   // `request` is the request that generated this response
//   // It is the last ClientRequest instance in node.js (in redirects)
//   // and an XMLHttpRequest instance in the browser
//   request: {}
// }
