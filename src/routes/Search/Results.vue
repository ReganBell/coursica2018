<template>
  <!-- <keep-alive> -->
    <div id="content">
      <div id="results-container">
        <div id="header">
          <span class="course">Course</span>
          <span class="q-overall">Q</span>
          <span class="q-workload">Workload</span>
          <span class="size">Size</span>
        </div>
        <ais-results id="results">
          <template scope="{ result }">
            <result :rawResult="result" :key="result.objectID"></result>
          </template>
        </ais-results>
      </div>
      <div id="filters">
        <searchFilter v-for="filter in filters" :name="filter.name" :display="filter.display" :key="filter.name"/>
      </div>
    </div>
  <!-- </keep-alive> -->
</template>

<script>

const filters = [
  { name: 'term', display: 'Term' },
  { name: 'format', display: 'Format' },
  { name: 'level', display: 'Level' },
  { name: 'sessions.days', display: 'Meets On' },
  { name: 'year', display: 'Year' }
]

import result from './Result'
import searchFilter from './Filter'

export default {
  name: 'search-results',
  props: ['results'],
  data: () => ({ filters }),
  components: { result, searchFilter }
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

    #header
      height search-results-header-height
      width search-results-width
      border-bottom solid 1px #EEE
            
      display flex
      align-items center

      span
        text-align center
        color #959595
        font-size 18px
    
      .course
        width 70%

      .q-overall, .q-workload, .size
        width 10%

  #filters
    display flex
    flex-direction column

    width 400px

    // .header
      
</style>
