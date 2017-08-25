<template>
  <header id="search-header">
    <router-link to="/" class="logo">Coursica</router-link>
    <span class="rbw-underline">
      <span v-for="color in colors" class="rbw-bar" :class="color"></span>
    </span>
    <searchBox id="search" />
    <!-- <input id='search' 
      v-focus="focused" 
      @focus="focused = true" 
      @blur="focused = false
      "placeholder="Search for courses" 
      :value="searchText"
      @input="searchChanged"
      @keyup.enter="submitSearch">
    </input> -->
    <!-- <div v-if="!!results" class='filter-container'>
      <searchFilter v-for="filter in filters" :filter="filter" :key="filter.prompt"></searchFilter>
    </div> -->
    <div v-if="!results" class="search-instructions">Press Enter to search!</div>
  </header>
</template>

<script>

import { mapState } from 'vuex'
import { mixin as focusMixin } from 'vue-focus'
import searchFilter from './Filter.vue'
import searchBox from './SearchBox'

const colors = ['red', 'orangered', 'orange', 'yellow', 'green', 'cyan']
const colorClasses = colors.map(c => ({[c]: true}))

const filters = [
  {
    placeholder: 'Any term',
    values: ["Fall '17", "Spring '18", "Fall '18", "Spring '19", "Fall '19", "Spring '20"]
  },
  {
    placeholder: 'Any level',
    values: ['Undergrad only', 'Grad only', 'Both']
  },
  {
    placeholder: 'Any type',
    values: []
  },
  {
    placeholder: 'Any Gen Ed status'
  },
  {
    placeholder: 'Any meeting time'
  }
]

export default {
  data: function () {
    return {
      focused: true
    }
  },
  mixins: [focusMixin],
  components: { searchFilter, searchBox },
  computed: mapState({
    colors: _ => colorClasses,
    searchText: state => state.search.text,
    filters: _ => filters,
    results: state => state.search.results
  }),
  methods: {
    searchChanged (e) {
      this.$store.dispatch('setSearchText', e.target.value)
    },
    submitSearch () {
      this.$store.dispatch('submitSearch')
    }
  }
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

    cursor default
    
  .ais-input
    margin-top 10px
    margin-left 44px
    width 639px
    height 44px
    
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

  ::-ms-clear 
    display none

  ::-webkit-search-decoration,
  ::-webkit-search-cancel-button,
  ::-webkit-search-results-button,
  ::-webkit-search-results-decoration 
    display none
  
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
