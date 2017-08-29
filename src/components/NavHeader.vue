<template>
  <header class="nav-header">
    <router-link to="/" class="logo">Coursica</router-link>
    <span class="rbw-underline">
      <span v-for="color in colors" class="rbw-bar" :class="color"></span>
    </span>
    <div class="links">
      <!-- <router-link to="/planner">Planner</router-link>
      <router-link to="/calendar">Calendar</router-link>
      <router-link to="/requirements">Requirements</router-link> -->
      <span class="user-info">
        <div id="full-name">{{ fullName }}</div>
        <a id="sign-out" v-on:click="signOut">{{ signOutText }}</a>
      </span>
    </div>
  </header>
</template>

<script>

import { mapState } from 'vuex'

const colors = ['red', 'orangered', 'orange', 'yellow', 'green', 'cyan']
const colorClasses = colors.map(c => ({[c]: true}))

export default {
  name: 'nav-header',
  computed: mapState({
    colors: _ => colorClasses,
    signedIn: state => !!state.user || state.signingOut,
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

@import '../styles/base.styl'

//Main CSS  

.nav-header
  position fixed
  left 0
  top 0
  
  width 100%
  height header-height
  
  overflow hidden
  z-index 2

  background-color white
  border 0px black
  border-bottom 1px #EBEBEB
  border-style solid
    
  .links
    display flex
    position fixed
    top 0
    right 1%
    height header-height
    width 504px
    justify-content flex-end
    align-items center
    
    a
      color coursica-blue
      font-family Proxima Nova
      font-weight 600
      text-decoration none
      font-size 16px
      transition color 200ms ease-in-out
      
    a:hover
      color alpha(coursica-blue, 0.8)
      cursor pointer
      
    .user-info
      
      #full-name
        font-weight 600
        color alpha(black, 0.9)
        padding-bottom 5px

      #sign-out
        font-weight 400
        
  .logo
    position absolute
    height header-height
    line-height header-height
    vertical-align center
    left 52px
    font-size 30px
    text-align center

    background-color white
    color black
    text-decoration none
    font-weight 600

    cursor default
    
  #search
    position absolute
    top 17px
    left 294px
    width 639px
    height 51px
    
    color #888
    font-weight 400
    font-size 18px
    font-family Proxima Nova
    text-align left

    background-color #F3F3F3
    border-radius 8px
    padding-left 20px
    border-style none
    outline none

  #search:focus
    transform scale(1.01)
    background-color #F0F0F0

  .rbw-underline
    position absolute
    display flex
    justify-content space-between
    width 159px
    height 4px
    bottom -1px
    left 32px
    
    .rbw-bar
      width 14%
      height 100%
      border-radius 2px
      
    .rbw-bar.red
      background-color #F90918
    
    .rbw-bar.orangered
      background-color #F95D14
    
    .rbw-bar.orange
      background-color #FAA103
      
    .rbw-bar.yellow
      background-color #F2FF1F
      
    .rbw-bar.green
      background-color #9CFF00
      
    .rbw-bar.cyan
      background-color #46FFE8
    

</style>
