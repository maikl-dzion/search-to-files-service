<template>
  <div class="home" style="border: 0px red solid">

    <header class="bg-white shadow" style="border: 0px blue solid">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8" style="border: 0px gainsboro solid">
<!--         <h1 class="text-3xl font-bold text-gray-900">File Manager</h1>-->
      </div>
    </header>

    <main style="border: 0px blue solid" >
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8" style="border: 1px gainsboro solid">

      <p uk-margin style="padding: 0px; margin: 0px 0px 10px 0px">
        <button @click="getRootPath('server')" class="uk-button uk-button-primary uk-button-small"> Директория web-сервера</button>
        <button @click="getRootPath('system')" class="uk-button uk-button-primary uk-button-small" style="margin-left: 10px;"> Директория OS</button>
      </p>

      <SearchForm/>

      <section class="text-gray-600 body-font">
        <div class="container px-2 py-2 mx-auto flex flex-col"  style="border: 0px red solid"><div>

            <div class="flex flex-col sm:flex-row mt-10">
                <div class="sm:w-1/2 text-center sm:pr-8 sm:py-8"
                      style="text-align: left; border-top: 1px gainsboro solid" >
                      <div v-for="(item, name) in rootDirList" :key="name" >
                          <tree-dir-items :name="name" :item="item" />
                      </div>
                </div>
                <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left"
                     style="border-top: 1px gainsboro solid">

                    <ul uk-tab>
                      <li><a href="#">Результаты поиска</a></li>
                      <li><a href="#">Содержимое файла</a></li>
                      <li><a href="#">Показ ошибок</a></li>
                      <li><a href="#">Доп. инфо</a></li>
                    </ul>

                    <ul class="uk-switcher uk-margin">
                        <li><SearchResult/></li>
                        <li><FileContent/></li>
                        <li>Показ ошибок</li>
                        <li>Доп. инфо</li>
                    </ul>

                </div>
            </div>

        </div></div>
      </section>

    </div></main>

  </div>
</template>

<script>

// @ is an alias to /src
import {mapActions, mapGetters} from 'vuex'
import SearchForm from '@/components/SearchForm'
import SearchResult from '@/components/SearchResult'
import FileContent from "@/components/FileContent";

export default {
  name: 'Home',
  data() {
    return {
       rootDirList : [],
    }
  },
  computed : {
      ...mapGetters([
          // 'getFileContent',
          // 'getSearchResult'
      ]),
  },
  components: {
    SearchForm,
    SearchResult,
    FileContent
  },

  created() {
     this.getRootPath('server');
  },

  methods: {

      ...mapActions([
        'setDirPath'
      ]),

      async getRootDirList(type = 'server') {
           const url = '/scan/dir/' + type;
           const response = await this.http({ url });
           this.rootDirList = response.result;
      },

      getRootPath(type) {
          this.getRootDirList(type)
          this.get('/get/dir/path/' + type, response => {
              const path = response['result'];
              this.setDirPath(path);
          });
      },

  },

}
</script>

<style lang="scss" scoped>

</style>


<!--'/get/dir/path/:path_type'  => 'FileManager@getPathToSystem',-->
<!--'/scan/dir/:scan_type'      => 'FileManager@selectScanDir',-->
<!--'/file/content/get'         => 'FileManager@loadFileContent',-->

<!--'/find/text'                => 'FindController@findInit',-->
<!--'/test/service/:param'      => 'FileManager@testAction',-->

<!--//  '/scan/dir/child'       => 'FileManager@scanDirInit'  ,-->
<!--//  '/get/dir/path/server'  => 'FileManager@getServerDirPath',-->
<!--//  '/get/dir/path/system'  => 'FileManager@getSystemDirPath',-->
<!--//  '/scan/dir/server'      => 'FileManager@scanServerDir',-->
<!--//  '/scan/dir/system'      => 'FileManager@scanSystemDir',-->
