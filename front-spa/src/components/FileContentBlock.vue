<template>
<div>
  <div>
    <div v-for="(value, i) in fileContentList" :key="i" >
      <pre>{{value}}</pre>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "FileContentBlock",
  data() {
    return {
      fileContent : [],
    }
  },
  computed : {

    ...mapGetters([
        'getFileContent',
        'getFilePath'
    ]),

    fileContentList() {
        let contentList = (this.getFileContent.length) ? this.getFileContent : [];
        return contentList;
    },
  }
}
</script>

<style scoped>

</style>
