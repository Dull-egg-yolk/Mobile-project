import Vue from 'vue'
import Vuex from 'vuex'
import decodeJwt from 'jwt-decode'
// 引入
import { getItem, setItem } from '../utils/storage'
Vue.use(Vuex)
// vuex是响应式
export default new Vuex.Store({
  state: {
    // 当前用户登录的状态
    // user: null
    // 获取token
    user: getItem('user')
  },
  mutations: {

    // 修改state数据
    setUser (state, data) {
      if (data && data.token) {
        data.id = decodeJwt(data.token).user_id
      }
      state.user = data
      // 设置token 本地存贮为了持久化
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
