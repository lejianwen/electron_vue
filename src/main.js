import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import App from './App.vue'
import router from './router'
import store from './store'
import './icons' // icon
import './permission'

import './styles/element-variables.scss'
import '@/styles/index.scss' // global css

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
})
