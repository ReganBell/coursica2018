<template>
  <ais-index id="container" app-id="D86FK05FUD" api-key="b37975aed88941720cb0e87cbc90201d" index-name="offerings">
    <searchHeader />
    <results />
    <!-- <searchHeader></searchHeader>
    <results v-if="results" :results="results"></results> -->
  </ais-index>
</template>

<script>

import searchHeader from './Header'
import results from './Results'
import result from './Result'
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

</style>
