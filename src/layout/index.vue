<template>
  <div class="app-wrapper">
    <el-row class="app-wrapper-row">
      <!--      <el-col :span="4">-->
      <!--        <el-menu-->
      <!--          :default-active="activeMenu"-->
      <!--          background-color="#545c64"-->
      <!--          text-color="#fff"-->
      <!--          style="height: 100vh"-->
      <!--        >-->
      <!--          <router-link to="/">-->
      <!--            <el-menu-item index="/">-->
      <!--              <i class="el-icon-menu" />-->
      <!--              <span slot="title">首页</span>-->
      <!--            </el-menu-item>-->
      <!--          </router-link>-->

      <!--          <el-menu-item index="/setting">-->
      <!--            <i class="el-icon-setting" />-->
      <!--            <span slot="title">设置</span>-->
      <!--          </el-menu-item>-->
      <!--        </el-menu>-->
      <!--      </el-col>-->
      <el-col :span="24">
        <section class="app-main">
          <transition name="fade-transform" mode="out-in">
            <keep-alive>
              <router-view :key="key" />
            </keep-alive>
          </transition>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  computed: {
    key() {
      return this.$route.fullPath
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      console.log('active => ', path)
      return path
    }
  },
  created() {
    console.log('layout key=>', this.key)
  }
}
</script>

<style scoped>
    .app-wrapper-row{
        height: 100vh;
    }
    .app-main {
        /*50 = navbar  */
        min-height: calc(100vh - 50px);
        width: 100%;
        position: relative;
        overflow: hidden;
    }
    .fixed-header+.app-main {
        padding-top: 50px;
        height: 100vh;
        overflow: auto;
    }
</style>
