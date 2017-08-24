<template>
  <!-- <keep-alive> -->
    <div id="search-results-container" v-keep-scroll-position>
      <div id="search-results-header">
        <span class="course">Course</span>
        <span class="q-overall">Q</span>
        <span class="q-workload">Workload</span>
        <span class="size">Size</span>
      </div>
      <result v-for="result in results" 
        :title="result.title"
        :groupAndNumber="result.groupAndNumber"
        :termYear="result.termYear"
        :meets="result.meets"
        :prof="result.prof"
        :description="result.description"
        :overall="result.overall"
        :workload="result.workload"
        :size="result.size"
        :objectID="result.objectID" 
        :key="result.objectID">
      </result>
    </div>
  <!-- </keep-alive> -->
</template>

<script>

['title', 'groupAndNumber', 'termYear', 'meets', 'prof', 'description', 'overall', 'workload', 'size', 'objectID']

import result from './Result.vue'

export default {
  name: 'search-results',
  props: ['results'],
  components: { result }
}

</script>

<style lang="stylus">

@import '../../styles/base.styl'

#search-results-container
  position absolute
  left 0
  top search-header-height
  
  #search-results-header
    height search-results-header-height
    width search-results-width
    border-bottom solid 1px #EEE
    
    margin-left rbw-underline-search-left
    
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

</style>
