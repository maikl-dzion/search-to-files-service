<template>
<div style="border: 0px red solid">
    <Navbar/>
    <div class="app-content-wrapper"
         style="width:100%; border: 0px red solid">
         <router-view></router-view>
    </div>
</div>
</template>

<script>

import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  data() {
    return {}
  },
  components: { Navbar },
}
</script>

<style lang="scss">

  * {
    border-radius: 0px;
  }

</style>
