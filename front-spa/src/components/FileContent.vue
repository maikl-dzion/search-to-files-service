<template>
<div>

  <pre style="background: ghostwhite; color:black;" >{{fileContent}}</pre>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "FileContentBlock",
  data() {
    return {
      fileContentStr : '',
    }
  },
  computed : {

    ...mapGetters([
        'getFileContent',
        'getDirPath'
    ]),

    fileContent() {
        let contentList = (this.getFileContent.length) ? this.getFileContent : [];
        return  contentList.join('');
    },

  }
}
</script>

<style scoped>

</style>
