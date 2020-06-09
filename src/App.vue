<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import '@/utils/ipcRender'
export default {
  name: 'App',
  created() {
  }
}
</script>
<style>
  body{
    margin: 0;
  }
</style>
