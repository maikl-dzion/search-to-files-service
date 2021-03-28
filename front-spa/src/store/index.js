import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
     filePath     : "",
     searchValue  : "ini_set('error",
     fileContent  : [],
     responseError : [],
     searchResult  : [],
     searchError   : [],
  },

  mutations: {
       setFilePath(state, data) {
          state.filePath = data
       },

       setSearchValue(state, data) {
          state.searchValue = data
       },

       setSearchResult(state, data) {
          state.searchResult = data
       },

       setFileContent(state, data) {
          state.fileContent = data
       },

       setSearchError(state, data) {
          state.searchError = data
       },
  },

  actions: {

      setFilePath(context, data) {
          context.commit('setFilePath', data)
      },

      setSearchValue(context, data) {
          context.commit('setSearchValue', data)
      },

      setSearchResult(context, data) {
          context.commit('setSearchResult', data)
      },

      setFileContent(context, data) {
          context.commit('setFileContent', data)
      },

      setSearchError(context, data) {
          context.commit('setSearchError', data)
      },
  },
  getters : {

      getFilePath(state) {
         return state.filePath
      },

      getSearchValue(state) {
         return state.searchValue;
      },

      getSearchResult(state) {
         return  state.searchResult
      },

      getFileContent(state) {
          return  state.fileContent
      },

      getSearchError(state) {
          return  state.searchError;
      },
  }

  //modules: {}
})
