<template>
  <form class="sign-in-form">
      <input 
        type="email" 
        placeholder="Harvard Email" 
        :value="email"
        @input="didTypeEmail"
        @keyup.enter="signIn">
      </input>
      <input type="password" 
      placeholder="Password" 
      :value="password"
      @input="didTypePassword"
      @keyup.enter="signIn">
      </input>
      <transition name="sign-in-btn" mode="out-in">
        <div id="sign-in-btn" v-if="!signInError || working" key="signIn" @click="signIn" :class="{ working }">
            {{ working ? 
                (signingIn ? 'Signing in...': 'Sending...') :
                (signUpMode ? 'Sign up' : 'Sign in') 
            }} 
          <spinner :show="working"></spinner>
        </div>
        <div id="error" v-else-if="passwordReset === null" key="error">
          <div class="message">{{ errorMessage }}</div>
          <div class="reset-btn" v-if="signInError === 'INVALID_LOGIN'"@click="resetPassword">Reset password?</div>
        </div>
        <div id="error" v-else key="reset">
          <div class="reset-sent">Reset email sent!</div>
        </div>
      </transition>
  </form>
</template>

<script>

import Spinner from '@/components/Spinner.vue'
import { mapState } from 'vuex'

export default {
  name: 'sign-in-form',
  components: { Spinner },
  computed: mapState({
    email: state => state.home.email,
    password: state => state.home.password,
    signingIn: state => state.home.signingIn,
    signInError: state => state.home.signInError,
    errorMessage: function (state) {
      switch (this.signInError) {
        case 'INVALID_LOGIN':
          return "That login didn't work."
        case 'INVALID_EMAIL':
          return "That doesn't look like a valid email."
        case 'NON_HARVARD_EMAIL':
          return "You'll need to use an email ending in 'harvard.edu'."
        case 'UNKNOWN_ERROR':
          return 'Something went wrong. Try reloading the page.'
      }
    },
    signUpMode: state => state.home.signUpMode,
    passwordReset: state => state.home.passwordReset,
    working: state => state.home.signingIn || state.home.passwordReset === 'SENDING' || state.accountSetup.validating
  }),
  methods: {
    signIn () {
      if (this.signUpMode) this.$store.dispatch('launchSignUp')
      else this.$store.dispatch('signIn')
    },
    didTypeEmail (e) { this.$store.dispatch('didTypeEmail', e.target.value) },
    didTypePassword (e) { this.$store.dispatch('didTypePassword', e.target.value) },
    resetPassword () { this.$store.dispatch('resetPassword') }
  }
}
</script>

<style lang="stylus">

@import '../../styles/base.styl'

//Transitions
.sign-in-btn-enter-active, .sign-in-btn-leave-active
  transition opacity 200ms ease-in-out
  
.sign-in-btn-enter, .sign-in-btn-leave-to
  opacity 0

//Main CSS
.sign-in-form
  position absolute
  top 11vh
  left 0 
  right 0 
  // height 27vh
  width 513px
  
  margin-left auto 
  margin-right auto
  
  text-align center
  font-weight 600

  opacity 1

  input
    position relative
    width 100%
    padding-top 20px
    padding-bottom 20px
    margin-top 20px
    
    border none
    border-bottom solid 1px #EEE
    
    font-weight 600
    font-family Proxima Nova
    font-size 20px
    text-align center
    
    background-color white
    z-index 1
  
  ::-webkit-input-placeholder
    color rgba(0, 0, 0, 0.27)
    
  input:focus
    outline none
    background-color #FAFAFA

  #sign-in-btn.working
    color rgba(0, 0, 0, 0.15)
    font-weight 400
    
  #sign-in-btn
    position relative //So z-index will work
    width 100%
    height 78px
    line-height 78px
    padding-top 15px
    padding-bottom 15px

    font-size 20px
    text-align center
    color coursica-blue
    font-weight 600
    
    z-index 0
    
    .spinner
      position relative
      top 15px
      
      .path
        stroke alpha(coursica-blue, 0.2)
    
  #sign-in-btn:hover
    cursor pointer
    color fade(coursica-blue, 70%)
    
  #error
    margin-top 40px
    font-weight 400
    
    .reset-sent, .message
      font-size 18px

    .reset-sent
      color #B9B9B9

    .message
      color #F95D14
      
    .reset-btn
      color coursica-blue
      margin-top 20px
      cursor pointer
      
      
  
</style>
