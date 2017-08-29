<template>
  <header id="search-header">
    <router-link to="/" class="logo">Coursica</router-link>
    <span class="rbw-underline">
      <span v-for="color in colors" class="rbw-bar" :class="{ [color]: true }" :key="color"></span>
    </span>
    <searchBox id="search" :searchStore="searchStore"/>
  </header>
</template>

<script>

import { mapState } from 'vuex'
import { mixin as focusMixin } from 'vue-focus'
import searchBox from './SearchBox'

const colors = ['red', 'orangered', 'orange', 'yellow', 'green', 'cyan']

export default {
  props: ['searchStore'],
  mixins: [focusMixin],
  data: () => ({ colors }),
  components: { searchBox },
  computed: mapState({
    searchText: state => state.search.text,
    results: state => state.search.results
  })
}

</script>

<style lang="stylus">

@import '../../styles/base.styl'

//Main CSS  

#search-header  
  width 100%
  height search-header-height

  position relative
  
  overflow visible
  z-index 2
  
  background-color white
  border 0px black
  border-bottom 1px #EBEBEB
  border-style solid
  
  .logo
    position absolute
    width rbw-underline-search-width
    height search-header-height
    line-height search-header-height
    vertical-align center
    right rbw-underline-search-left
    font-size 32px
    text-align center

    background-color white
    color black
    text-decoration none
    font-weight 600

    cursor pointer
  
  #search:focus
    transform scale(1.01)
    background-color #F0F0F0
  
  .filter-container, .search-instructions
    position absolute
    bottom 0px
    left 312px
    width 593px
    height 42px
    
  .filter-container
    display flex
    justify-content space-between
    align-items flex-start
    overflow visible
  
  .search-instructions
    line-height 42px
    font-size 16px
    color #AEAEAE

  .rbw-underline
    position absolute
    display flex
    justify-content space-between
    width rbw-underline-search-width
    height 4px
    bottom -1px
    right rbw-underline-search-left
    
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
