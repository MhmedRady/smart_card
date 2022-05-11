import store from '@/store'

export const Helper = {
  apiUrl: (url) => {
    return store.state.baseUrl + url
  },
  pageTitle: (title) => (document.title = title),
  localUser: (user = {}) => {
    sessionStorage.setItem('user', JSON.stringify({ id: user.id }))
  },
  checkAuthUser() {
    let userId = sessionStorage.getItem('user')
    if (userId) {
      userId = JSON.parse(userId)
      if (userId && userId.id) {
        console.log(userId.id)
        store.dispatch('SET_SESSION_USER', userId.id)
      }
    }
    //
  },
}
