import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant
import './utils/register-vant'
// 引入rem适配
import 'amfe-flexible'
// 引入全局css
import './styles/index.less'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
