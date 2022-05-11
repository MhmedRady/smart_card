import { Helper } from '@/config/helper'
import axios from 'axios'

export const AuthModule = {
  state: () => ({
    auth: false,
    user: null,
    userId: null,
  }),
  mutations: {
    updateAuthUser: (state, user) => {
      state.auth = true
      state.user = user
      state.userId = user.id
    },
  },
  actions: {
    UPDATE_AUTH_USER: ({ commit }, user) => commit('updateAuthUser', user),
    async SET_SESSION_USER({ commit }, userId) {
      await axios
        .get(Helper.apiUrl(`users/${userId}`))
        .then((result) => {
          commit('updateAuthUser', result.data)
          commit('redirectPage', { name: 'Home' })
        })
        .catch(() => {
          commit('redirectPage', { name: 'Login' })
        })
    },
  },
}
