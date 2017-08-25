<template>
  <ais-index id="container" :search-store="searchStore" :query="query">
    <searchHeader/>
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
import { createFromAlgoliaCredentials } from 'vue-instantsearch';

const searchStore = createFromAlgoliaCredentials(
  'D86FK05FUD',
  'b37975aed88941720cb0e87cbc90201d'
);
searchStore.indexName = 'offerings'

export default {
  name: 'search',
  data: () => ({ searchStore }),
  props: {
    query: {
      default: 'computer science',
    }
  },
  components: { searchHeader, results, result },
  beforeMount: function () {
    this.$store.dispatch('setSearchText', this.$route.query.q)
  },
  watch: {
    'searchStore.query'(value) {
      this.$router.push({
        name: 'Search',
        query: { q: value },
      });
    },
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
