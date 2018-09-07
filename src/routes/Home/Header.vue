<template>
    <transition name="header-fade">
    <header v-if="signedIn" class="header">
    <div class="links">
      <!-- <router-link to="/planner">Planner</router-link>
      <router-link to="/calendar">Calendar</router-link> -->
      <router-link to="/contact">Contact us</router-link>
      <span class="user-info">
        <div id="full-name">{{ fullName }}</div>
        <a id="sign-out" v-on:click="signOut">{{ signOutText }}</a>
      </span>
    </div>
    </header>
  </transition>
</template>

<script>

import { mapState } from 'vuex'

export default {
  props: ['signedIn'],
  computed: mapState({
    fullName: state => state.user ? state.user.displayName : '',
    signOutText: state => state.signingOut ? 'Signing out...' : 'Sign out'
  }),
  methods: {
    signOut () {
      this.$store.dispatch('signOut')
    }
  }
}

</script>

<style lang="stylus">

@import '../../styles/base.styl'
  
//Transitions

.header-fade-enter-active
  transition opacity .5s ease-in-out .8s
  
.header-fade-leave-active
  transition opacity 250ms ease-in-out

.header-fade-enter, .header-fade-leave-to
  opacity 0

//Main CSS  

.top-half
  .header
    position fixed
    left 0
    top 0
    
    width 100%
    height header-height
    
    background-color coursica-blue
      
    .links
      display flex
      position fixed
      right 3%
      height header-height
      width 200px
      justify-content space-between
      align-items center
      
      a
        color rgba(0, 0, 0, 0.3)
        font-family Proxima Nova
        font-weight 600
        text-decoration none
        font-size 16px
        transition color 200ms ease-in-out
        
      a:hover
        color white
        cursor pointer
        
      .user-info
        
        #full-name
          font-weight 600
          color white
          padding-bottom 5px

        #sign-out
          font-weight 400

</style>
