import { Helper } from '@/config/helper'
import axios from 'axios'

export const AuthModule = {
  state: () => ({
    auth: false,
    user: null,
    findUser: null,
    userId: null,
    users: {},
    editUserModal: false,
  }),
  mutations: {
    updateAuthUser: (state, user) => {
      state.auth = true
      state.user = user
      state.userId = user.id
    },
    deleteUser: (state, user_id) =>
      (state.users = state.users.filter((user) => user.id !== user_id)),
    updateUsers: (state, users) => (state.users = users),
    getUser: (state, user) => (state.findUser = user),
    updateUserModal: (state, val) =>
      (state.editUserModal = val ?? !state.editUserModal),
  },
  actions: {
    UPDATE_AUTH_USER: ({ commit }, user) => commit('updateAuthUser', user),
    USER_MODAL: ({ commit }, val) => commit('updateUserModal', val),
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
    async ALL_USER({ commit }) {
      await axios
        .get(Helper.apiUrl(`users`))
        .then((result) => {
          commit('updateUsers', result.data)
          // commit('redirectPage', { name: 'Home' })
        })
        .catch(() => {
          // commit('redirectPage', { name: 'Login' })
        })
    },
    async GET_USER({ commit }, user_id) {
      await axios
        .get(Helper.apiUrl(`users/${user_id}`))
        .then((result) => {
          commit('updateUsers', result.data)
          // commit('redirectPage', { name: 'Home' })
        })
        .catch(() => {
          // commit('redirectPage', { name: 'Login' })
        })
    },
    async DELETE_USER({ commit }, user_id) {
      await axios
        .delete(Helper.apiUrl(`users/${user_id}`))
        .then(() => {
          commit('deleteUser', user_id)
          // commit('redirectPage', { name: 'Home' })
        })
        .catch(() => {
          // commit('redirectPage', { name: 'Login' })
        })
    },
  },
}
