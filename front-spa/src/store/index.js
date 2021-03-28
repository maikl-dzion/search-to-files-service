import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
     dirPath     : "",
     searchValue  : "ini_set('error",
     fileContent   : [],
     responseError : [],
     searchResult  : [],
     searchError   : [],
  },

  mutations: {
       setDirPath(state, data) {
          state.dirPath = data
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

      setDirPath(context, data) {
          context.commit('setDirPath', data)
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

      getDirPath(state) {
         return state.dirPath
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
