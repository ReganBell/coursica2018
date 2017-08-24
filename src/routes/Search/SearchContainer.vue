<template>
  <div class="search-view">
    <searchHeader></searchHeader>
    <results v-if="results" :results="results"></results>
  </div>
</template>

<script>

import searchHeader from './Header.vue'
import results from './Results.vue'
import { mapState } from 'vuex'

export default {
  name: 'search',
  components: { searchHeader, results },
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
