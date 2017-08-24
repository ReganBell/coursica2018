import Vue from 'vue'
import Vuex from 'vuex'
import Auth from '@/api/auth'
import home from './home'
import search from './search'
import accountSetup from './accountSetup'
import course from './course'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    authReady: false,
    user: null,
    signingOut: false
  },
  modules: {
    home,
    search,
    accountSetup,
    course
  },
  actions: {
    signOut: (context) => {
      context.commit('setSigningOut', true)
      Auth.signOut().then(() => {
        // No need to set user, the listener in main.js handles that
        context.commit('setSigningOut', false)
      }).catch(error => {
        console.error('Sign out error', error)
        context.commit('setSigningOut', false)
      })
    }
  },
  mutations: {
    setUser: (state, user) => { state.user = user },
    setSigningOut: (state, signingOut) => { state.signingOut = signingOut },
    authReady: (state, authReady) => { state.authReady = authReady }
  }
})

export default store
