<template>
  <!-- <keep-alive> -->
    <div id="content">
      <div id="results-container">
        <table-header></table-header>
        <ais-results id="results">
          <template scope="{ result }">
            <result 
              :rawResult="result"
              :key="result.objectID"
              @selectResult="handleSelect">
            </result>
          </template>
        </ais-results>
      </div>
      <div id="filters">
        <searchFilter v-for="filter in filters" 
          :name="filter.name"
          :display="filter.display"
          :key="filter.name"/>
        <searchSlider v-for="slider in sliders"
          @updateSlider="handleSliderUpdate"
          :name="slider.name"
          :values="slider.values"
          :display="slider.display"
          :range="slider.range"
          :key="slider.name"/>
      </div>
    </div>
  <!-- </keep-alive> -->
</template>

<script>

const filters = [
  { name: 'termYear', display: 'Term' },
  { name: 'level', display: 'Level' },
  { name: 'primaryReason', display: 'Taken For'},
  { name: 'genEds', display: 'Gen Eds'},
  { name: 'sessionString', display: 'Meets On' },
  { name: 'primaryDepartment', display: 'Group' },
  { name: 'departments', display: 'Department' },
  { name: 'format', display: 'Format' },
]
const rangeValues = (min, max) => ({ range: { min, max }, values: [min, max] })
const sliders = [
  { display: 'Overall', name: 'topReport.responses.overall.score', ...rangeValues(2, 5) },
  { display: 'Workload', name: 'topReport.responses.workload.score' , ...rangeValues(1, 17) },
  { display: 'Size', name: 'topReport.size', ...rangeValues(1, 700) },
  { display: 'Percentile', name: 'topReport.responses.overall.percentiles.size', ...rangeValues(1, 100) }
]
console.log('sliders', sliders)

import result from './Result'
import searchFilter from './Filter'
import searchSlider from './Slider'
import tableHeader from './TableHeader'

export default {
  name: 'search-results',
  props: ['searchStore'],
  data: () => ({ filters, sliders }),
  components: { result, searchFilter, searchSlider, tableHeader },
  methods: {
    handleSelect (result) {
      this.$emit('selectResult', result)
    },
    handleSliderUpdate (name, newValues) {
      const [from, to] = newValues.map(value => Number(value))
      this.searchStore.stop()
      this.searchStore.removeNumericRefinement(name, '>')
      this.searchStore.removeNumericRefinement(name, '<')
      this.searchStore.addNumericRefinement(name, '>=', from)
      this.searchStore.addNumericRefinement(name, '<=', to)
      this.searchStore.start()
      this.searchStore.refresh()
      console.log('activeRefinements', this.searchStore.activeRefinements, this.searchStore)
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

  #filters
    margin-top search-results-header-height
    display flex
    flex-direction column
    width 400px
</style>
