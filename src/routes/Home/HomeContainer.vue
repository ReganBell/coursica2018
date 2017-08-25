<template>
  <div class="home-view">
    <div class="top-half">
      <homeHeader :signedIn="signedIn"></homeHeader>
      <router-link to="/" class="logo" :class="{movedUp: signedIn}">Coursica</router-link>
      <transition name="search-slide">
        <input v-if="signedIn" id='search' placeholder="Search for courses" @input="searchChanged"></input>
      </transition>
      <span class="rbw-underline">
        <span v-for="color in colors" class="rbw-bar" :class="color"></span>
      </span>
    </div>
    <transition name="bottom-half-fade" mode="out-in">
      <div class="bottom-half">
        <!-- <component :is="bottomHalfView" :results="shoppingListCourses"></component> -->
        <result v-for="course in shoppingListCourses" :key="course.objectID" :rawResult="course"></result>
      </div>
    </transition>
  </div>
</template>

<script>

import result from '../Search/Result.vue'
import Auth from '../../api/auth.js'
import Search from '../../api/search.js'
import signInUp from './SignInUp.vue'
import homeHeader from './Header.vue'
import boxContainer from './BoxContainer.vue'
import { mapState } from 'vuex'

const colors = ['red', 'orangered', 'orange', 'yellow', 'green', 'cyan']
const colorClasses = colors.map(c => ({[c]: true}))

export default {
  name: 'home-view',
  components: { signInUp, homeHeader, boxContainer, result },
  data: function() {
    return {
      shoppingListCourses: []
    }
  },
  mounted: function () {
    Auth.getShoppingList().then(courseIds => {
      return Search.getShoppingListCourses(courseIds)
    }).then( courses => {
        this.shoppingListCourses = courses
    })

    if (this.$route.query.mode === 'verifyEmail' && this.$route.query.oobCode) {
      this.$store.dispatch('verifyEmail', this.$route.query.oobCode)
    }
  },
  computed: mapState({
    colors: _ => colorClasses,
    signedIn: state => !!state.user || state.signingOut,
    bottomHalfView: function () { return this.signedIn ? 'results' : 'signInUp' }
  }),
  methods: {
    searchChanged (event) {
      const letter = event.target.value
      this.$router.push({
        path: '/homeSearch',
        query: {
          q: letter
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
      width 504px
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
  overflow hidden
  background-color white

</style>
