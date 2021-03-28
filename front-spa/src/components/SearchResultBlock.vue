<template>
<div>
  <pre>{{getSearchResult}}</pre>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "SearchResultBlock",
  computed : {
     ...mapGetters([
         'getSearchResult',
         'getFilePath'
     ]),
  }
}
</script>

<style scoped>

</style>
