export default {
  state: {
    tweets: []
  },
  getters: {
    getTweets: (state) => state.tweets
  },
  mutations: {
    setTweet (state, tweet) {
      state.tweets.unshift(tweet)
    },
    setTweetsToLocal (state) {
      localStorage.setItem('tweets', JSON.stringify(state.tweets))
    },
    loadTweetsFromLocal (state, tweets) {
      state.tweets = tweets
    },
    setCountComments: (state, comment) => {
      const tweet = state.tweets.find(tweet => tweet.id === comment.tweetId)
      tweet.quantComments = ++tweet.quantComments
      localStorage.setItem('tweets', JSON.stringify(state.tweets))
    }
  },
  actions: {
    fetchTweetsFromLocal ({ commit }, payload) {
      if (localStorage.getItem('tweets')) {
        commit('loadTweetsFromLocal', JSON.parse(localStorage.getItem('tweets')))
      }
    },
    addTweet ({ commit }, tweet) {
      commit('setTweet', tweet)
      commit('setTweetsToLocal')
    }
  }
}
