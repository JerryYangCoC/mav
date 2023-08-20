import { createStore } from 'vuex'
import { moduleCopy } from './copy'

export default createStore({
  state: {
    copy: moduleCopy.state
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    moduleCopy
  }
})