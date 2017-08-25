<template>
  <div id="search-view">
    <ais-index
      id="container"
      app-id="D86FK05FUD"
      api-key="b37975aed88941720cb0e87cbc90201d"
      index-name="offerings"
    >
      <div id="header">
        <ais-search-box id="search-box"></ais-search-box>
      </div>
      <ais-refinement-list attribute-name="term"></ais-refinement-list>
      <ais-refinement-list attribute-name="format"></ais-refinement-list>
      <ais-refinement-list attribute-name="level"></ais-refinement-list>
      <ais-refinement-list attribute-name="sessions.days"></ais-refinement-list>
      <ais-refinement-list attribute-name="year"></ais-refinement-list>
      <div id="content">
        <ais-results id="results">
          <template scope="{ result }">
            <result :rawResult="result" :key="result.objectID"></result>
          </template>
        </ais-results>
      </div>
    </ais-index>
    <!-- <searchHeader></searchHeader>
    <results v-if="results" :results="results"></results> -->
  </div>
</template>

<script>

import searchHeader from './Header.vue'
import results from './Results.vue'
import result from './Result.vue'
import { mapState } from 'vuex'

export default {
  name: 'search',
  components: { searchHeader, results, result },
  beforeMount: function () {
    this.$store.dispatch('setSearchText', this.$route.query.q)
  },
  computed: mapState({
    results: state => {
      return state.search.results
    }
  })
}

</script>

<style lang="stylus">

@import '../../styles/base.styl'

#search-view
  #container
    position absolute
    top 25px
    left 44px

    #content
      display flex
      flex-direction row

      #filters
        display flex
        flex-direction column

        width 400px


</style>
