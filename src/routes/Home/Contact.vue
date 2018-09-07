<template>
  <div class="home-view">
    <div class="top-half">
      <homeHeader :signedIn="signedIn"></homeHeader>
      <router-link to="/" class="logo" :class="{movedUp: signedIn}">Coursica</router-link>
      <transition name="search-slide">
        <input v-if="signedIn" id='search' placeholder="Search for courses" @keyup.enter="searchChanged"></input>
      </transition>
      <span class="rbw-underline">
        <span v-for="color in colors" class="rbw-bar" :class="color"></span>
      </span>
    </div>
    <transition name="bottom-half-fade" mode="out-in">
        <div class="contact-info">
          Coursica is brought to you by
          <br>
          Regan Bell, Akshay Saini, and Matthew Beatty.
           <div class="link">
            <a href="https://www.m.me/regan.bell1">Comments, Questions, or Bugs?</a>
           </div> 
        </div>
    </transition>
  </div>
</template>

<script>

import homeHeader from './Header.vue'
import boxContainer from './BoxContainer.vue'
import { mapState } from 'vuex'

const colors = ['red', 'orangered', 'orange', 'yellow', 'green', 'cyan']
const colorClasses = colors.map(c => ({[c]: true}))

export default {
  name: 'home-view',
  components: { homeHeader, boxContainer },
  computed: mapState({
    colors: _ => colorClasses,
    signedIn: state => !!state.user || state.signingOut,
  }),
  methods: {
    searchChanged (event) {
      const query = event.target.value
      this.$router.push({
        path: '/search',
        query: {
          q: query
        }})
    },
    toggleSignUpMode () {
      this.$store.dispatch('toggleSignUpMode')
    }
  }
}

</script>

<style lang="stylus">

@import '../../styles/base.styl'

//Transitions

// .sign-up-launch-enter-active, .sign-up-launch-leave-active
//   transition all 300ms ease-in-out
  
// .sign-up-launch-enter
//   opacity 0
//   transform translateX(50px)
  
// .sign-up-launch-leave-to
//   opacity 0
//   transform translateX(-50px)

.search-slide-enter-active
  transition opacity .3s ease-in-out 1s

.search-slide-leave-active
  transition opacity .3s ease-in-out

.search-slide-enter, .search-slide-leave-to
  opacity 0
  
.bottom-half-fade-enter-active
  transition opacity .5s ease-in-out .5s
  
.bottom-half-fade-leave-active
  transition opacity .5s ease-in-out .5s

.bottom-half-fade-enter, .bottom-half-fade-leave-to
  opacity 0

.logo
  transition transform 1.3s ease-in-out

.logo.movedUp
  transform translateY(-7vh)

//Main CSS

.contact-info
  position absolute
  top top-fraction
  padding-top 25vh
  width 100%
  text-align center
  line-height 28px
  font-size 18px
  font-weight 600
  color black

  .link a
    color coursica-blue
    font-weight 600
    text-decoration none


.top-half 
  position absolute
  width 100%
  height top-fraction
  overflow hidden
  background-color coursica-blue
  top 0
  left 0
  
  @media (max-height 500px)
    .logo
      font-size 64px
      
  @media (min-height 501px)
    .logo
      font-size 100px

  .logo
    absolute-center-horizontal()
    width rbw-underline-home-width
    bottom 5vh

    text-align center

    background-color coursica-blue
    color white
    text-decoration none
    font-weight 600

    cursor default
    
  #search
    absolute-center-horizontal()
    width 639px
    height 51px
    bottom 4vh
    
    color white
    font-weight 400
    font-size 18px
    font-family Proxima Nova
    text-align center

    background-color alpha(black, 0.1)
    border-radius 8px
    padding-left 20px
    border-style none
    outline none
    
  #search:focus
    transform scale(1.01)
    background-color alpha(black, 0.12)
  
  .rbw-underline
    absolute-center-horizontal()
    width rbw-underline-home-width
    height 5px
    bottom -1px
    
    display flex
    justify-content space-between
    
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
      
  .header
    position fixed
    left 0
    top 0
    
    width 100%
    height header-height
    
    background-color coursica-blue
    
    .logo
      color white
      text-decoration none
      font-weight 600
      font-size 30px
      line-height header-height
      
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
      
.bottom-half
  position absolute
  width 100%
  height bottom-fraction
  top top-fraction
  left 0
  background-color white

</style>
