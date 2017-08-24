import Auth from '@/api/auth'
import router from '@/router'

export default {
  state: {
    signingIn: false,
    email: '',
    password: '',
    signInError: null, // INVALID_EMAIL, NON_HARVARD_EMAIL, INVALID_LOGIN, UNKNOWN_ERROR
    passwordReset: null, // SENDING, SENT, ERROR
    signUpMode: false
  },
  actions: {
    signIn: (context) => {
      context.commit('setSigningIn', true)
      const email = context.state.email
      const password = context.state.password
      Auth.signIn(email, password).then(user => {
        context.commit('setEmail', '')
        context.commit('setPassword', '')
        context.commit('setSigningIn', false)
      }).catch(error => {
        console.error(error)
        context.commit('setSignInError', 'INVALID_LOGIN')
        context.commit('setSigningIn', false)
      })
    },
    didTypeEmail: (context, email) => {
      if (context.state.signInError) context.commit('setSignInError', null)
      context.commit('setEmail', email)
    },
    didTypePassword: (context, password) => {
      if (context.state.signInError) context.commit('setSignInError', null)
      context.commit('setPassword', password)
    },
    resetPassword: (context) => {
      context.commit('setPasswordReset', 'SENDING')
      Auth.resetPassword(context.state.email).then(() => {
        context.commit('setPasswordReset', 'SENT')
      }).catch(error => {
        console.error('Password reset error:', error)
        context.commit('setPasswordReset', 'ERROR')
      })
    },
    toggleSignUpMode: (context) => {
      context.commit('setSignUpMode', !context.state.signUpMode)
      router.push({query: {}})
      context.commit('setSignInError', false)
    },
    verifyEmail: ({ commit }, code) => {
      console.log('store.verifyEmail', code)
      Auth.verifyEmail(code).then((user) => {
        console.log('Succesful verify email callback', Auth.user())
        commit('setUser', Auth.user())
      })
    }
  },
  mutations: {
    setEmail: (state, email) => { state.email = email },
    setPassword: (state, password) => { state.password = password },
    setSigningIn: (state, signingIn) => { state.signingIn = signingIn },
    setSignInError: (state, error) => { state.signInError = error },
    setPasswordReset: (state, status) => { state.passwordReset = status },
    setSignUpMode: (state, mode) => { state.signUpMode = mode }
  }
}
