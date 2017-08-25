<template>
  <div id="header">
    <span class="course">Course</span>
    <span class="q-overall">Q</span>
    <span class="q-workload">Workload</span>
    <span class="size">Size</span>
  </div>
</template>

<script>

</script>

<style lang="stylus">

@import '../../styles/base.styl'

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
      
</style>
