import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter: 0
  },
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    }
  },
  mutations: {
    add(state) {
      state.counter++
    }
  },
  actions: {
    // 解构上下文 commit，dispatch,state
    add({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  modules: {
  }
})