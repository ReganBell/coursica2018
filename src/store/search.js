import { load, persist } from './persist'

export default {
  state: {
    offerings: load('offerings') || {}
  },
  actions: {
    selectOffering: ({ commit, state }, offering) => {
      commit('setOffering', offering)
    }
  },
  mutations: {
    setOfferings: (state, offerings) => {
      state.offerings = offerings
      persist({ offerings })
    }
  }
}
