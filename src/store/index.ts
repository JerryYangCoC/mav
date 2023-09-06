import { createStore } from 'vuex'
import { moduleCopy } from './copy'
import axios from 'axios'
import router from '@/router'

export default createStore({
  state: {
    copy: moduleCopy.state,
  },
  getters: {
  },
  mutations: {
    setToken(state: any, data: any): void {
      state.token = data
    }
  },
  actions: {
    upSess() {
      axios.post('http://10.2.126.194:8010/SYS0/UpdateSession.asmx/UpdateSessionValue', router.currentRoute.value.query)
      .then((res) => {
          console.log('up session', res)
      }).catch((err) => {
          console.log(err)
      })
    },
  },
  modules: {
    moduleCopy
  }
})