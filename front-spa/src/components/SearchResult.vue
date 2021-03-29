<template>
<div>

  <ul uk-accordion>
    <li v-for="(list, path) in getSearchResult" :key="path" >
          <a  @click="getFileContent($event, path)" class="uk-accordion-title" href="#" style="font-size: 14px; color: blue">{{path}}</a>
          <div class="uk-accordion-content" style="padding:0px 0px 0px 20px; margin:0px;">
              <div v-for="(item, i) in list" :key="i" >
                  <div style="display: flex; font-size: 12px;">
                     <div style="font-style: italic">Номер:</div><div> {{item.num}}</div>
                  </div>
                  <div style="display: flex; font-size: 12px;">
                     <div style="font-style: italic">Строка:</div><div> {{item.row}}</div>
                  </div><hr/>
              </div>
          </div>
    </li>
  </ul>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "SearchResultBlock",
  computed : {
     ...mapGetters([
         'getSearchResult',
         'getDirPath'
     ]),
  }
}
</script>

<style scoped>

</style>
