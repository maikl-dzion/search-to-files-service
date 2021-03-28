<template>
<div class="mt-10 sm:mt-0" style="border: 0px gainsboro solid" >
  <div class="md:grid md:grid-cols-3 md:gap-6" style="border: 0px red solid" >
     <div class="mt-5 md:mt-0 md:col-span-12" style="border: 0px red solid;">

          <div class="shadow overflow-hidden sm:rounded-md">

                <!--- Inputs  -->
                <div class="px-3 py-3 bg-white sm:p-2">
                  <div class="grid grid-cols-6 gap-2">

                    <div class="col-span-12 sm:col-span-12" style="border: 0px gainsboro solid; padding:0px; margin: 0px;">
                        <div class="uk-margin" style="width:100%; border: 0px gainsboro solid; padding:0px; margin: 0px;">
                           <label  for="api-url" class="block text-sm font-medium text-gray-700">ApiUrl</label>
                           <input  v-model="apiUrl" id="api-url" class="uk-input uk-form-small" type="text" placeholder="ApiUrl" >
                        </div>
                    </div>

                    <div class="col-span-12 sm:col-span-12" style="border: 0px gainsboro solid; padding:0px; margin: 0px;">
                        <div class="uk-margin" style="width:100%; border: 0px gainsboro solid; padding:0px; margin: 0px;">
                          <label  for="item-path" class="block text-sm font-medium text-gray-700">DirPath</label>
                          <input  v-model="getDirPath" id="item-path" class="uk-input uk-form-small" type="text" placeholder="DirPath" >
                        </div>
                    </div>

                    <div class="col-span-12 sm:col-span-12" style="border: 0px gainsboro solid; padding:0px; margin: 0px;">
                        <div class="uk-margin" style="width:100%; border: 0px gainsboro solid; padding:0px; margin: 0px;">
                          <label  for="search-text" class="block text-sm font-medium text-gray-700">Search text</label>
                          <input  v-model="searchValue" id="search-text" class="uk-input uk-form-small" type="text" placeholder="Search text">
                        </div>
                    </div>

                  </div>
                </div>

                <!--- Submit Button -->
                <div class="px-4 py-3 bg-gray-50 text-left sm:px-6">
                  <button @click="searchExecute" class="uk-button uk-button-primary uk-button-small" :disabled="submitBtnDisabled"> Выполнить поиск </button>
                </div>

          </div>

          <div v-if="timeStart" style="display: flex">
              <div style="border: 1px #007eb2 solid; margin:4px; font-style: italic; font-size: 11px; width: 120px; text-align: center"> {{timeStart}} </div>
              <div style="border: 1px #007eb2 solid; margin:4px; font-style: italic; font-size: 11px; width: 120px; text-align: center"> {{timeRequest}} </div>
              <div style="border: 1px #007eb2 solid; margin:4px; font-style: italic; font-size: 11px; width: 120px; text-align: center" v-html="timeEnd"></div>
          </div>


    </div> <!-- mt-5 md:mt-0 md:col-span-2 -->
  </div> <!-- md:grid md:grid-cols-3 md:gap-6 -->
</div> <!-- mt-10 sm:mt-0 -->
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: "SearchForm",
  data() {
    return {
        searchValue : "ini_set('error",
        timeRequest : "",
        timeStart   : "",
        timeEnd     : "",
        submitBtnDisabled : false,
    }
  },

  computed : {

      ...mapGetters([
          'getDirPath',
          'getSearchValue'
      ]),

  },

  methods : {

     ...mapActions([
         'setSearchResult'
     ]),

     searchExecute() {

         this.timeRequest = '';
         this.timeStart   = '';
         this.timeEnd     = `<div style="color:red">...Идет поиск, подождите</div>`;
         const path = this.getDirPath;
         const text = this.searchValue;
         if(!path || !text) {
              alert('Заполните все поля');
              return false;
         }

         this.submitBtnDisabled = true;
         this.setSearchResult([]);
         this.timeStart = this.displayTime();
         let intervalId = setInterval( () => {
            this.timeRequest = this.displayTime();
         }, 400)

         const url = '/find/text';
         this.post(url, { path, text }, response => {
             clearInterval(intervalId)
             this.submitBtnDisabled = false;
             this.timeEnd   = `<div style="color:green">Поиск завершен</div>`;
             if ('error' in response && response.error.length) {
                alert('Error: ' + response['error'])
                return false;
             }
             const results = response.result;
             this.setSearchResult(results);
         });
     },

     saveInfoInLocalStore() {
       // this.setStore('text_value', value);
       // this.setStore('path_name', path);
       // this.setStore('text_value', value);
       // this.setStore('api_url'   , this.apiUrl);
     },

     displayTime() {
          const time = new Date()
          let hours = time.getHours()
          let min   = time.getMinutes()
          let sec   = time.getSeconds();
          let mil   = time.getMilliseconds();

          if (min < 10)  min  = "0" + min
          if (sec < 10)  sec  = "0" + sec
          if (mil < 10)  mil  = "0" + mil

          let result = hours + " : " + min + " : " + sec;
          return result;
     },

  }
}
</script>

<style scoped>
  * {
     border-radius: 0px;
  }
</style>


