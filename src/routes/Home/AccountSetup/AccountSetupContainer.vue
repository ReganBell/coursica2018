<template>
  <div id="account-setup">
    <transition name="switch" mode="out-in">
      <div id="in-progress" key="in-progress" v-if="status !== 'all-done'">
        <div class="header">
          <div class="title">Account Setup</div>
          <div class="progress-bg">
            <div class="progress" :style="{ width }"></div>
          </div>
        </div>
        <div class="nav-btns">
          <div class="back btn" @click="backButtonClicked">&lt; Back</div>
          <div class="skip btn" @click="skipButtonClicked">Next &gt;</div>
        </div>
        <pages :transition="transition" :page="parseInt(status)"></pages>
      </div>
      <div id="all-done" key="all-done" v-else>
        <transition appear appear-active-class="springish">
          <img src="../../../assets/checkmark_green_large.png" id="big-checkmark">
        </transition>
        <transition appear appear-active-class="appear-2-active" appear-class="appear-enter">
          <div class="big-message">All done!</div>
        </transition>
        <transition appear appear-active-class="appear-3-active" appear-class="appear-enter">
          <div>
            To make sure you’re a Harvard student,<br>
            we’ve sent an activation email to:
            <div class="email">{{ email }}</div>
            Click the link and you'll be good to go!
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import pages from './Pages.vue'

export default {
  components: { pages },
  computed: mapState({
    status: state => state.route.query.accountSetup,
    transition: state => state.accountSetup.transition,
    width: state => Math.min(String(100 * state.route.query.accountSetup / 6.0), 100) + '%',
    email: state => state.accountSetup.email
  }),
  methods: {
    backButtonClicked (event) { this.$store.dispatch('accountSetupBack') },
    skipButtonClicked (event) { this.$store.dispatch('accountSetupNext') }
  }
}
</script>

<style lang="stylus">

@import '../../../styles/base.styl'

.switch-enter-active
  transition all 0s ease-in-out

.switch-leave-active
  transition all .5s ease-in-out
  
.switch-enter, .switch-leave-to
  opacity 0

.account-setup-forward-enter-active, 
.account-setup-forward-leave-active, 
.account-setup-backward-enter-active,
.account-setup-backward-leave-active
  transition all 300ms ease-in-out
  
.appear-2-active
  transition all 500ms ease-in-out .5s

.appear-3-active
  transition all 500ms ease-in-out 800ms

.appear-enter
  opacity 0
  
.account-setup-forward-enter, .account-setup-backward-leave-to
  opacity 0
  transform translateX(50px)
  
.account-setup-forward-leave-to, .account-setup-backward-enter
  opacity 0
  transform translateX(-50px)

#account-setup
  position absolute
  top 7vh
  left 0 
  right 0 
  width 513px
  margin-left auto 
  margin-right auto
  
  text-align center
  font-weight 600
  
  #all-done
    font-weight 400

    #big-checkmark
      width 56px
      height 56px
      
    .big-message
      margin-top 4vh
      margin-bottom 4vh
      font-size 24px
      
    .email
      color #7B7B7B
      margin-top 4vh
      margin-bottom 4vh
      font-size 14px

  .nav-btns
    position absolute
    top 0
    width 100%
    display flex
    justify-content space-between
    
    color coursica-blue
    font-size 14px
    font-weight 400
    
    .btn
      cursor pointer

  .header
    position absolute
    top 0
    width 100%
    
    display flex
    flex-direction column
    align-items center
    
    .title
      font-size 20px
      
    .progress-bg
      width 210px
      height 7px
      background-color #F0F0F0
      border-radius 3.5px
      margin-top 15px
      
      .progress
        width 0%
        height 100%
        background-color #13D655
        border-radius 3.5px
        transition width 400ms ease-in-out
        
@keyframes springish {
  0.00% {transform: scale(0.5);}
  17.25% {transform: scale(1.1);}
  37.94% {transform: scale(0.9829);}
  58.63% {transform: scale(1.0029);}
  79.31% {transform: scale(0.9995);}
  100.00% {transform: scale(1.0001);}
}

.springish
  animation springish
  animation-iteration-count 1
  animation-duration 1.42s
  animation-timing-function cubic-bezier(0.445,  0.050, 0.550, 0.950)
    
</style>
