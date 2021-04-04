import Vue from 'vue'
import Vuex from 'vuex'
import tweetModule from './tweetModule'
import commentModule from './commentModule'
import userModule from './userModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tweetModule,
    commentModule,
    userModule
  }
})
