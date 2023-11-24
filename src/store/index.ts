import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router'
import { moduleCopy } from './copy'
import { moduleJourney } from './journey'

export default createStore({
  state: {
    copy: moduleCopy.state,
    journey: moduleJourney.state,
    loading: false,
  },
  getters: {
  },
  mutations: {
    setToken(state: any, data: any): void {
      state.token = data
    },
    setLoading(state: any, data: any): void {
      state.loading = data
    },
  },
  actions: {
    upSess(context: any) {
      axios.post('http://10.2.126.194:8010/SYS0/UpdateSession.asmx/UpdateSessionValue', router.currentRoute.value.query)
      .then((res) => {
          console.log('up session', res)
          context.commit('setLoading', false)
        }).catch((err) => {
          console.log(err)
          context.commit('setLoading', false)
      })
    },
    upLoading(context: any, data: boolean) {
      context.commit('setLoading', data)
    },
  },
  modules: {
    moduleCopy,
    moduleJourney,
  }
})