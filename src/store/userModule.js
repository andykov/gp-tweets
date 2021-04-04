export default {
  state: {
    users: []
  },
  getters: {
    getUsers: (state) => state.users
  },
  mutations: {
    setUser: (state, user) => {
      state.users.push(user)
      localStorage.setItem('users', JSON.stringify(state.users))
    }
  },
  actions: {
    addUser ({ commit }, user) {
      commit('setUser', user)
    }
  }
}
