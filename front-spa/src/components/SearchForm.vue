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
                           <input  v-model="apiUrl" id="api-url" class="uk-input uk-form-small" type="text" placeholder="Api Url" >
                        </div>
                    </div>

                    <div class="col-span-12 sm:col-span-12" style="border: 0px gainsboro solid; padding:0px; margin: 0px;">
                        <div class="uk-margin" style="width:100%; border: 0px gainsboro solid; padding:0px; margin: 0px;">
                          <label  for="item-path" class="block text-sm font-medium text-gray-700">FilePath</label>
                          <input  v-model="getFilePath" id="item-path" class="uk-input uk-form-small" type="text" placeholder="FilePath" >
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
                  <button @click="searchExecute" class="uk-button uk-button-primary uk-button-small"> Выполнить поиск</button>
    <!--              <button @click="searchExecute" style="width: 230px"-->
    <!--                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">-->
    <!--                      Выполнить-->
    <!--              </button>-->
                </div>

          </div>

          <div v-if="timeStart" style="display: flex">
              <div style="border: 1px #007eb2 solid; margin:4px; font-style: italic; font-size: 11px; width: 100px; text-align: center">Start = {{timeStart}} </div>
              <div style="border: 1px #007eb2 solid; margin:4px; font-style: italic; font-size: 11px; width: 100px; text-align: center">{{timeRequest}} </div>
              <div style="border: 1px #007eb2 solid; margin:4px; font-style: italic; font-size: 11px; width: 100px; text-align: center" v-html="timeEnd"></div>
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
      // searchValue : '',
      timeRequest : "",
      timeStart   : "",
      timeEnd     : "",
    }
  },

  computed : {
      ...mapGetters([
          'getFilePath',
          'getSearchValue'
      ]),
      searchValue() {
         return this.getSearchValue;
      },
  },

  methods : {

     ...mapActions([
         'setSearchResult'
     ]),

     searchExecute() {
         this.timeRequest = '';
         this.timeStart   = '';
         this.timeEnd   = `<div style="color:red">...Идет поиск, подождите</div>`;
         const path = this.getFilePath;
         const text = this.searchValue;
         if(!path || !text) {
              alert('Заполните все поля');
              return false;
         }

         this.timeStart = this.displayTime();
         let intervalId = setInterval( () => {
            this.timeRequest = this.displayTime();
         }, 500)

         const url = '/find/text';
         this.post(url, { path, text }, response => {
             clearInterval(intervalId)
             //this.timeEnd = this.timeRequest - this.timeStart;
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

          var currentTime = new Date()
          let hours = currentTime.getHours()
          let minutes = currentTime.getMinutes()
          let seconds = currentTime.getSeconds()

          if (minutes < 10) minutes = "0" + minutes
          if (seconds < 10) seconds = "0" + seconds

          let result = hours + " : " + minutes + " : " + seconds + " ";
          // if(hours > 11) result += "PM"
          // else    result += "AM"
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


<!--<div class="mt-10 sm:mt-0">-->
<!--<div class="md:grid md:grid-cols-3 md:gap-6">-->

<!--  <div class="mt-5 md:mt-0 md:col-span-2">-->
<!--    <form >-->
<!--      <div class="shadow overflow-hidden sm:rounded-md">-->
<!--        <div class="px-4 py-5 bg-white sm:p-6">-->
<!--          <div class="grid grid-cols-6 gap-6">-->

<!--            <div class="col-span-6 sm:col-span-3">-->
<!--              <label for="first_name" class="block text-sm font-medium text-gray-700">First name</label>-->
<!--              &lt;!&ndash;                    <input type="text" name="first_name" id="first_name" autocomplete="given-name" &ndash;&gt;-->
<!--              &lt;!&ndash;                           class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">&ndash;&gt;-->
<!--              <div class="uk-margin">-->
<!--                <input class="uk-input uk-form-width-medium uk-form-small" type="text" placeholder="Small">-->
<!--              </div>-->
<!--            </div>-->

<!--            <div class="col-span-6 sm:col-span-3">-->
<!--              <label for="last_name" class="block text-sm font-medium text-gray-700">Last name</label>-->
<!--              <input type="text" name="last_name" id="last_name" autocomplete="family-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">-->
<!--            </div>-->

<!--            <div class="col-span-12 sm:col-span-12">-->
<!--              <label for="email_address" class="block text-sm font-medium text-gray-700">Email address</label>-->
<!--              <input type="text" name="email_address" id="email_address" autocomplete="email"-->
<!--                     class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">-->
<!--            </div>-->

<!--            <div class="col-span-6 sm:col-span-3">-->
<!--              <label for="country" class="block text-sm font-medium text-gray-700">Country / Region</label>-->
<!--              <select id="country" name="country" autocomplete="country" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">-->
<!--                <option>United States</option>-->
<!--                <option>Canada</option>-->
<!--                <option>Mexico</option>-->
<!--              </select>-->
<!--            </div>-->

<!--            <div class="col-span-6">-->
<!--              <label for="street_address" class="block text-sm font-medium text-gray-700">Street address</label>-->
<!--              <input type="text" name="street_address" id="street_address" autocomplete="street-address" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">-->
<!--            </div>-->

<!--            <div class="col-span-6 sm:col-span-6 lg:col-span-2">-->
<!--              <label for="city" class="block text-sm font-medium text-gray-700">City</label>-->
<!--              <input type="text" name="city" id="city" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">-->
<!--            </div>-->

<!--            <div class="col-span-6 sm:col-span-3 lg:col-span-2">-->
<!--              <label for="state" class="block text-sm font-medium text-gray-700">State / Province</label>-->
<!--              <input type="text" name="state" id="state" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">-->
<!--            </div>-->

<!--            <div class="col-span-6 sm:col-span-3 lg:col-span-2">-->
<!--              <label for="postal_code" class="block text-sm font-medium text-gray-700">ZIP / Postal</label>-->
<!--              <input type="text" name="postal_code" id="postal_code" autocomplete="postal-code" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">-->
<!--          <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">-->
<!--            Выполнить-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </form>-->
<!--  </div>-->
<!--</div>-->
<!--</div>-->
