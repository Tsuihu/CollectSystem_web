// 引入vuex
import Vuex from 'vuex'
import Vue from 'vue'

// 使用vuex插件
Vue.use(Vuex)

// actions 用于响应组件中的动作
const actions = {
  info(context,value) {
    context.commit('INFO',value)
  }
}
// mutations 用于操作数据（state）
const mutations = {
  INFO(state,value) {
    state.collectors = value
  }
} 
// state 用于存储数据
const state = {
  // 采集人员信息
  collectors: {}
}

// 创建store并导出
export default new Vuex.Store({
  actions,
  mutations,
  state
})