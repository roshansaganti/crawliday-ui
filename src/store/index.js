import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDarkMode: localStorage.getItem('crawliday-theme') !== 'light',
    user: null,
    authChecked: false,
  },
  getters: {
    isDarkMode: (state) => state.isDarkMode,
    isAuthenticated: (state) => Boolean(state.user),
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.authChecked = true
    },
    SET_DARK_MODE(state, isDarkMode) {
      state.isDarkMode = isDarkMode
      localStorage.setItem('crawliday-theme', isDarkMode ? 'dark' : 'light')
    },
    TOGGLE_DARK_MODE(state) {
      state.isDarkMode = !state.isDarkMode
      localStorage.setItem('crawliday-theme', state.isDarkMode ? 'dark' : 'light')
    },
  },
  actions: {
    async checkAuthentication({ commit }) {
      const apiBaseUrl = (process.env.VUE_APP_API_BASE_URL || window.location.origin).replace(/\/+$/, '')
      const statusPath = process.env.VUE_APP_AUTH_STATUS_PATH || '/api/auth/user/'

      try {
        const response = await fetch(`${apiBaseUrl}${statusPath}`, {
          credentials: 'include',
        })

        if (!response.ok) {
          commit('SET_USER', null)
          return
        }

        const user = await response.json()
        commit('SET_USER', user)
      } catch (error) {
        commit('SET_USER', null)
      }
    },
    async logout({ commit }) {
      const apiBaseUrl = (process.env.VUE_APP_API_BASE_URL || window.location.origin).replace(/\/+$/, '')
      const logoutPath = process.env.VUE_APP_LOGOUT_PATH || '/api/auth/logout/'
      const csrfCookie = document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith('csrftoken='))
      const csrfToken = csrfCookie ? decodeURIComponent(csrfCookie.split('=')[1]) : null
      const headers = csrfToken ? { 'X-CSRFToken': csrfToken } : {}

      const response = await fetch(`${apiBaseUrl}${logoutPath}`, {
        method: 'POST',
        credentials: 'include',
        headers,
      })

      if (!response.ok) {
        throw new Error('Logout failed')
      }

      commit('SET_USER', null)
    },
  },
  modules: {
  }
})
