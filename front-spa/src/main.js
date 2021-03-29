import Vue    from 'vue'
import App    from './App.vue'
import router from './router'
import store  from './store'
import http   from './services/http'
import services  from './services/services'

import TreeDirItems from '@/components/TreeDirItems'
Vue.component('tree-dir-items', TreeDirItems);

// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'
// import 'vue-material/dist/theme/default-dark.css'
// Vue.use(VueMaterial);

Vue.mixin(http);
Vue.mixin(services);

// const ApiUrl = 'http://localhost/search-to-files-service/api/index.php';
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
