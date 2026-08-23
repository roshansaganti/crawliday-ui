import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isDarkMode: localStorage.getItem('crawliday-theme') === 'dark',
  },
  getters: {
    isDarkMode: (state) => state.isDarkMode,
  },
  mutations: {
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
  },
  modules: {
  }
})
