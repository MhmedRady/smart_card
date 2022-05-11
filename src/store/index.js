import { createStore } from 'vuex'
import { AuthModule } from './AuthModule'
import router from '@/router'

export default createStore({
  state: {
    pojectName: 'Smart Card',
    baseUrl: 'http://localhost:3000/',
    sidebarVisible: '',
    sidebarUnfoldable: false,
    loading: false,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    updateLoading(state) {
      state.loading = !state.loading
    },
    redirectPage(state, payload) {
      router.push({ name: payload.name, params: payload.params })
    },
  },
  actions: {
    redirectPage({ commit }, route) {
      commit('redirectPage', route)
    },
    Loading({ commit }) {
      return commit('updateLoading')
    },
  },
  modules: { AuthModule },
})
