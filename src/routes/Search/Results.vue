<template>
  <!-- <keep-alive> -->
    <div id="content">
      <div id="results-container">
        <table-header></table-header>
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
  { name: 'year', display: 'Year' },
  { name: 'departments', display: 'Department' }
]

import result from './Result'
import searchFilter from './Filter'
import tableHeader from './TableHeader'

export default {
  name: 'search-results',
  props: ['results'],
  data: () => ({ filters }),
  components: { result, searchFilter, tableHeader }
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
    display flex
    flex-direction column
    width 400px
      
</style>
