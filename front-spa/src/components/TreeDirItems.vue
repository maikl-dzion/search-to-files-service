<template>
<div class="tree-container">

    <div style="cursor: pointer;">
      <table>
        <template v-if="type == 'dir'">
            <tr @click="getChildDir($event)">
                <td><img src="/assets/img/folder-icon.png" style="width:19px; padding: 0px; border: 0px red solid"></td>
                <td><div class="tree__item-name" style="">{{name}}</div></td>
            </tr>
        </template>
        <template v-else>
            <tr @click="getFileContent($event, path, 'arr')" >
                <td><img src="/assets/img/file-icon.png" style="width:19px; padding: 0px;"></td>
                <td><div class="tree__item-name" >{{name}}</div></td>
            </tr>
        </template>
      </table>
    </div>

    <div  v-if="openChildFilesDir"
          class="child-container" style="margin-left:4px; border-top: 0px red solid">
          <div v-for="(item, name) in childFilesList" :key="name" style="display: flex">
             <div style="width: 20px;">--</div>
             <tree-dir-items :name="name" :item="item" style="width: 100%;"/>
          </div>
    </div>

</div>
</template>

<script>

import { mapActions,  } from 'vuex'

export default {

  name: "TreeDirItems",
  props: ['name', 'item'],
  data() {
      let path = (this.item['path']) ? this.item['path'] : '';
      let type = (this.item['type']) ? this.item['type'] : 'dir';
      return {
          type,
          path,
          childFilesList: [],
          openChildFilesDir: false,
      }
  },

  methods: {

    ...mapActions([
       'setDirPath'
    ]),

    getChildDir() {
        if(!this.openChildFilesDir) {
            const path = this.path;
            this.setDirPath(path);
            this.post('/scan/dir/child', { path }, this.setChildFilesList);
        } else {
            this.openChildFilesDir = false;
        }
    },

    setChildFilesList(response) {
          this.childFilesList = [];
          this.childFilesList = response['result'];
          this.openChildFilesDir = true;
    },

  },

}
</script>

<style scoped>

 .tree-container {
     border: 0px gainsboro solid;
     margin-bottom: 4px;
     padding: 4px;
 }

 .child-container {
 }

 .tree__item-name {
    margin-left: 10px;
    padding: 2px 4px 2px 4px;
    border: 0px red solid;
 }

 .tree__item-name:hover {
    background: grey;
    color: white;
    border-radius: 2px;
 }

 .item-name-active {
    color: red;
 }

</style>
