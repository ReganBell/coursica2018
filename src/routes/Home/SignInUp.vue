<template>
  <div v-else class="bottom-half" key="signIn">
    <transition :name="accountSetupTransition" mode="out-in">
      <component :is="formView"></component>
    </transition>
    <div id="sign-up-toggle" v-if="!allDone" @click="toggleSignUpMode">{{ signUpToggleText }}</div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import signInForm from './SignInForm.vue'
import accountSetup from './AccountSetup/AccountSetupContainer.vue'

export default {
  components: { signInForm, accountSetup },
  computed: mapState({
    signUpToggleText: state => state.home.signUpMode ? 'Just kidding, I do have an account' : "I don't have an account yet",
    formView: state => state.route.query.accountSetup ? 'accountSetup' : 'signInForm',
    allDone: state => state.route.query.accountSetup === 'all-done',
    accountSetupTransition: state => state.accountSetup.transition
  }),
  methods: {
    toggleSignUpMode () {
      this.$store.dispatch('toggleSignUpMode')
    }
  }
}

</script>

<style lang="stylus">

@import '../../styles/base.styl'

.bottom-half
  #sign-up-toggle
    position absolute
    bottom 4vh
    width 100%
    
    text-align center
    color coursica-blue
    font-size 14px
    font-weight 600
    cursor pointer

</style>
