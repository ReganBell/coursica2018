<template>
  <ais-index id="container" :search-store="searchStore">
    <searchHeader :searchStore="searchStore"/>
    <results :searchStore="searchStore" @selectResult="handleSelect"/>
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
  components: { searchHeader, results, result },
  beforeMount: function () {
    searchStore.query = this.$route.query.q
  },
  methods: {
    handleSelect (result) {
      const q = this.searchStore.query
      this.$router.push({
        query: { q }
      })
      this.$store.dispatch('selectOffering', result)
      this.$router.push({ path: '/course/' + result.objectID })
    }
  },
  computed: mapState({
    results: state => state.search.results
  })
}

</script>

<style lang="stylus">

@import '../../styles/base.styl'

</style>
