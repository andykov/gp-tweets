export default {
  state: {
    comments: []
  },
  getters: {
    getComments: (state) => state.comments
  },
  mutations: {
    setComment (state, comment) {
      state.comments.unshift(comment)
    },
    setCommentsToLocal (state) {
      localStorage.setItem('comments', JSON.stringify(state.comments))
    },
    loadCommentsFromLocal (state, comments) {
      state.comments = comments
    }
  },
  actions: {
    fetchCommentsFromLocal ({ commit }, payload) {
      if (localStorage.getItem('comments')) {
        commit('loadCommentsFromLocal', JSON.parse(localStorage.getItem('comments')))
      }
    },
    addComment ({ commit }, comment) {
      commit('setComment', comment)
      commit('setCommentsToLocal')
      commit('setCountComments', comment, { root: true })
    }
  }
}
