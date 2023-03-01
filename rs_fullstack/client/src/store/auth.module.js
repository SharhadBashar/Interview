import router from '@/router/index'
import AuthService from '@/services/auth.service'

const initialState = { status: { isLoggedIn: false }, user: null, token: null }

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, creds) {
      return AuthService.login(creds).then(
        (res) => {
          commit('loginSuccess', res.data)
          return Promise.resolve(res.data)
        },
        (error) => {
          commit('loginFailure')
          return Promise.reject(error)
        },
      )
    },
    logout() {
      return AuthService.logout()
        .then(() => {
          window.localStorage.clear()
          router.replace('/login')
          return Promise.resolve(true)
        })
        .catch(() => {
          window.localStorage.clear()
          router.replace('/login')
          return Promise.resolve(true)
        })
    },
    refreshMe({ commit }) {
      return AuthService.fetchMe().then(
        (response) => {
          commit('refreshMe', response.data)
          return Promise.resolve(response.data)
        },
        (error) => {
          return Promise.reject(error)
        },
      )
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.isLoggedIn = true
      state.user = user
      state.token = user.token
    },
    loginFailure(state) {
      state.status.isLoggedIn = false
      state.user = null
      state.token = null
    },

    refreshMe(state, user) {
      state.user = user
    },
  },
}
