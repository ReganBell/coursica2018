<template>
  <!-- <keep-alive> -->
    <div id="content">
      <div id="results-container">
        <table-header></table-header>
        <ais-results id="results" :stack="true">
          <template scope="{ result }">
            <result 
              :result="result"
              :key="result.objectID"
              @selectResult="handleSelect">
            </result>
          </template>
        </ais-results>
        <div class="load-more" v-if="canLoadMore" v-observe-visibility="loadMore">Loading more...</div>
      </div>
      <div id="filters">
        <template v-for="filter in filters">
          <filterList v-if="filter.threshold"
            :attributeName="filter.name"
            :display="filter.display"
            :threshold="filter.threshold"
            :key="filter.name"
            :query="filter.query"
            :searchStore="searchStore"
          />
          <searchSlider v-else
            @updateSlider="handleSliderUpdate"
            :name="filter.name"
            :query="filter.query"
            :values="filter.values"
            :display="filter.display"
            :range="filter.range"
            :key="filter.name"
          />
        </template>
      </div>
    </div>
  <!-- </keep-alive> -->
</template>

<script>

const rangeValues = (min, max) => ({ range: { min, max }, values: [min, max] })
const filterTemplates = [
  { display: 'Term', name: 'termYear', threshold: 2 },
  { display: 'Level', name: 'level', threshold: 5 },
  { display: 'Overall', query: 'q', name: 'topReport.responses.overall.score', ...rangeValues(2, 5) },
  { display: 'Workload', query: 'workload', name: 'topReport.responses.workload.score' , ...rangeValues(1, 17) },
  { display: 'Size', query: 'size', name: 'topReport.size', ...rangeValues(1, 700) },
  { display: 'Taken For', query: 'takenFor', name: 'primaryReason', threshold: 3 },
  { display: 'Gen Eds', name: 'genEds', threshold: 3},
  { display: 'Meets On', query: 'days', name: 'sessionString', threshold: 5 },
  { display: 'Percentile', query: 'percentile', name: 'topReport.responses.overall.percentiles.size', ...rangeValues(1, 100) },
  { display: 'Department', name: 'departments', threshold: 5 },
  { display: 'Format', name: 'format', threshold: 3 },
]


import result from './Result.vue'
import filterList from './FilterList'
import searchSlider from './Slider'
import tableHeader from './TableHeader'

export default {
  name: 'search-results',
  props: ['searchStore'],
  data: () => ({ page: 1 }),
  components: { result, filterList, searchSlider, tableHeader },
  computed: {
    canLoadMore () {
      return this.searchStore.page === this.searchStore.totalPages
    },
    filters () {
      return filterTemplates.map(template => {
        return template
      })
    }
  },
  methods: {
    handleSelect (result) {
      this.$emit('selectResult', result)
    },
    handleSliderUpdate (name, newValues, query, range) {
      const [from, to] = newValues.map(value => Number(value))
      const queryUpdate = {
        [`${query}-from`]: from,
        [`${query}-to`]: to
      }
      const queries = this.$route.query
      this.$router.push({
        query: { ...queryUpdate, ...queries}
      })
      this.searchStore.stop()
      this.searchStore.clearRefinements(name)
      this.searchStore.addNumericRefinement(name, '>=', from)
      this.searchStore.addNumericRefinement(name, '<=', to)
      this.searchStore.start()
      this.searchStore.refresh()
    },
    loadMore (visible) {
      if (visible) {
        this.searchStore.page += 1
      }
    }
  }
}

</script>

<style lang="stylus">

@import '../../styles/base.styl'

#content
  display flex
  flex-direction row
  margin-left 44px

  #results-container
    display flex
    flex-direction column

    .load-more
      width 100%
      text-align center
      margin-top 25px
      color #BBB

  #filters
    margin-top search-results-header-height
    display flex
    flex-direction column
    width 400px
</style>
