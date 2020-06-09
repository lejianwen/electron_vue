<template>
  <div class="app-container">
    首页
  </div>

</template>

<script>
import { ipcTest } from '@/utils/ipcRender'
export default {
  name: 'Index',
  data() {
    return {
    }
  },
  created() {
    ipcTest()
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
