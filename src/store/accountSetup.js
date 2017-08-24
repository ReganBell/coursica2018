import router from '@/router'
import Validate from '@/api/validate'
import Auth from '@/api/auth'

export default {
  state: {
    email: '',
    password: '',
    name: '',
    gradYear: null,
    concentration: null,
    track: null,
    secondary: null,
    transition: 'account-setup-forward',
    validating: false
  },
  actions: {
    launchSignUp: context => {
      context.commit('setValidating', true)
      Validate.email(context.state.email).then(body => {
        context.commit('setValidating', false)
        context.commit('setAccountSetupTransition', 'account-setup-forward')
        router.push({query: {accountSetup: 1}})
      }).catch(error => {
        context.commit('setValidating', false)
        context.commit('setSignInError', error)
        console.error(error)
      })
    },
    accountSetupNext: ({ rootState, commit, state }) => {
      commit('setAccountSetupTransition', 'account-setup-forward')
      const status = parseInt(rootState.route.query.accountSetup)
      if (status === 5) {
        router.push({query: {accountSetup: 6}})
        setTimeout(() => router.push({query: {accountSetup: 'all-done'}}), 500)
        const {email, password, name, gradYear, concentration, track, secondary} = state
        Auth.createUser(email, password, name, gradYear, concentration, track, secondary)
          .then(user => {
            Auth.updatePlannerInfo(gradYear, concentration, track, secondary, user)
            Auth.updateUserProfile({ displayName: name }, user)
              .then(() => { Auth.sendEmailVerification(user) })
              .catch(error => { console.error('Error updating user profile', error, user) })
          })
          .catch(error => { console.error('Error: Could not create user', error) })
      } else {
        router.push({query: {accountSetup: status + 1}})
      }
    },
    accountSetupBack: ({ rootState, commit }) => {
      commit('setAccountSetupTransition', 'account-setup-backward')
      router.push({query: {accountSetup: parseInt(rootState.route.query.accountSetup) - 1}})
    }
  },
  mutations: {
    setEmail: (state, email) => { state.email = email },
    setPassword: (state, password) => { state.password = password },
    setName: (state, name) => { state.name = name },
    setGradYear: (state, gradYear) => { state.gradYear = gradYear },
    setConcentration: (state, concentration) => {
      state.concentration = concentration
      state.track = null
    },
    setTrack: (state, track) => { state.track = track },
    setSecondary: (state, secondary) => { state.secondary = secondary },
    setAccountSetupTransition: (state, transition) => { state.transition = transition },
    setValidating: (state, validating) => { state.validating = validating }
  }
}
