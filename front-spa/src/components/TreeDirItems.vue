<template>
<div class="tree-items-wrapper">

    <div class="tree-item-container" style="cursor: pointer; border: 0px red solid">
      <table class="tree-item__table" >
        <template v-if="type == 'dir'">
            <tr @click="getChildDir($event)">
                <td style="width:25px;" >
                    <img class="tree-item__img" src="/assets/img/folder-icon.png" style="width:100%; padding: 0px; border: 0px red solid">
                </td>
                <td>
                    <div class="tree-item__name" style="">{{name}}</div>
                </td>
            </tr>
        </template>
        <template v-else>
            <tr @click="getFileContent($event, path, 'arr')" >
                <td style="width:20px;" >
                  <img class="tree-item__img" src="/assets/img/file-icon.png" style="width:100%; padding: 0px;">
                </td>
                <td>
                  <div class="tree-item__name" >{{name}}</div>
                </td>
            </tr>
        </template>
      </table>
    </div>

    <transition name="fade">
      <div  v-if="openChildFilesDir"
            class="tree-child-container" style="margin-left:4px; border-top: 0px red solid">
            <div v-for="(item, name) in childFilesList" :key="name" style="display: flex">
               <div style="width: 20px;">--</div>
               <tree-dir-items :name="name" :item="item" style="width: 100%;"/>
            </div>
      </div>
    </transition>

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

    getChildDir(event) {

        this.treeItemSetActiveClass(event)

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

    treeItemSetActiveClass(event) {
         // console.log(event);
         const activeClass = 'tree__item-active';
         this.elemRemoveClass(activeClass);
         const target = event.target;
         target.classList.add(activeClass);
    },

  },

}
</script>

<style scoped>


.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}

 .tree-items-wrapper {
     border: 0px gainsboro solid;
     margin-bottom: 4px;
     padding: 2px;
 }

 .tree-item-container {
 }

 .tree-child-container {
 }

 .tree-item__table {
      width:100%
 }

 .tree-item__table td {
      border-bottom: 1px gainsboro solid;
 }

 .tree-item__name {
      width: 100%;
      margin-left: 10px;
      padding: 2px 4px 2px 4px;
      border: 0px red solid;
 }

 .tree-item__name:hover {
      background: gainsboro;
      color: black;
      border-radius: 2px;
 }

 .tree__item-active {
      color: black;
      background: lightskyblue;
 }

</style>
