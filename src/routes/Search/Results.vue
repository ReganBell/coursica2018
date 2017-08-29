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
            :searchStore="searchStore"
          />
          <searchSlider v-else
            @updateSlider="handleSliderUpdate"
            :name="filter.name"
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
const filters = [
  { name: 'termYear', display: 'Term', threshold: 2 },
  { name: 'level', display: 'Level', threshold: 5 },
  { display: 'Overall', name: 'topReport.responses.overall.score', ...rangeValues(2, 5) },
  { display: 'Workload', name: 'topReport.responses.workload.score' , ...rangeValues(1, 17) },
  { display: 'Size', name: 'topReport.size', ...rangeValues(1, 700) },
  { name: 'primaryReason', display: 'Taken For', threshold: 3 },
  { name: 'genEds', display: 'Gen Eds', threshold: 3},
  { name: 'sessionString', display: 'Meets On', threshold: 5 },
  { display: 'Percentile', name: 'topReport.responses.overall.percentiles.size', ...rangeValues(1, 100) },
  { name: 'departments', display: 'Department', threshold: 5 },
  { name: 'format', display: 'Format', threshold: 3 },
]


import result from './Result.vue'
import filterList from './FilterList'
import searchSlider from './Slider'
import tableHeader from './TableHeader'

export default {
  name: 'search-results',
  props: ['searchStore'],
  data: () => ({ filters, page: 1 }),
  components: { result, filterList, searchSlider, tableHeader },
  computed: {
    canLoadMore () {
      return this.searchStore.page === this.searchStore.totalPages
    }
  },
  methods: {
    handleSelect (result) {
      this.$emit('selectResult', result)
    },
    handleSliderUpdate (name, newValues) {
      const [from, to] = newValues.map(value => Number(value))
      this.searchStore.stop()
      this.searchStore.clearRefinements(name)
      this.searchStore.addNumericRefinement(name, '>=', from)
      this.searchStore.addNumericRefinement(name, '<=', to)
      this.searchStore.start()
      this.searchStore.refresh()
      console.log('activeRefinements', this.searchStore.activeRefinements, this.searchStore)
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
