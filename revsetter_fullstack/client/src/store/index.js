import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { auth } from './auth.module.js'
import { data } from './data.module.js'
const STORAGE_HASH = 'Ax4XDbqIDE'
export const STORAGE_KEY = `RS Fullstack-${STORAGE_HASH}`

export default createStore({
  modules: {
    auth: auth,
    data: data,
  },
  plugins: [
    createPersistedState({
      key: STORAGE_KEY,
    }),
  ],
})
