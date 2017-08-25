<template>
<div class="search-result" @click="selectCourse">
  <div class="course-info">
    <div class="title">{{ result.title }}</div>
     <div class="info-subtitle">
      <span class="group-and-number">{{ result.groupAndNumber }}</span>
      <span class="term">{{ result.termYear }}</span>
      <span v-if="result.meets" class="meets">{{ result.meets }}</span>
      <span v-if="result.prof" class="prof">{{ result.prof.name }}</span>
      <span v-if="result.prof" class="profScore" v-bind:style="{ color: result.prof.color }">{{ result.prof.score }}</span>
    </div>
    <div class="description" v-html="result.description"></div> 
  </div>
   <span v-if="result.overall" class="q-column score">{{ result.overall.score }}
    <span class="underline" :style="{ 'background-color': result.overall.underlineColor }"></span>
  </span>
  <span v-else class="q-column score" style="color: lightGray">N/A</span>
  <span v-if="result.workload" class="q-column workload">{{ result.workload.score }}</span>
  <span v-else class="q-column workload" style="color: lightGray">N/A</span>
  <span v-if="result.size" class="q-column size">{{ result.size }}</span>
  <span v-else class="q-column size" style="color: lightGray">N/A</span> 
</div>
</template>

<script>

import { parseResult } from '../../parse/searchResults'

export default {
  name: 'search-result',
  computed: {
    result: function() {
      return parseResult(this.rawResult)
    }
  },
  props: ['rawResult'],//['title', 'groupAndNumber', 'termYear', 'meets', 'prof', 'description', 'overall', 'workload', 'size', 'objectID'],
  methods: {
    selectCourse: function () {
      this.$store.dispatch('selectOffering', this.rawResult)
      this.$router.push({ path: '/course/' + this.rawResult.objectID })
    }
  }
}

</script>

<style lang="stylus">

@import '../../styles/base.styl'

.search-result:hover
  background-color #FAFAFA
  cursor pointer

.search-result
  width search-results-width
  border-bottom solid 1px #EEE
    
  transition background-color 100ms ease-in-out
  
  display: flex
  align-items: center
  
  .course-info
    width 70%
    height 100%
    
    .title
      padding-top 16px
      width 90%
            
      color coursica-blue
      font-weight 600
      font-size 16px
      
    .info-subtitle
      padding-top 5px
      height 24px
      width 90%
      
      span
      	font-size 14px
      	font-weight 600
      	padding-right 8px
      	
      .group-and-number, .term
      	color #B9B9B9
      	
      .meets
      	color black
      	
      .prof
        color coursica-blue
        padding-right 4px  
    
    .description
      width 90%
      overflow hidden
      text-overflow ellipsis
      line-height 19px
      padding-top 8px
      margin-bottom 16px
      
      display block
      display -webkit-box
      -webkit-line-clamp 2
      -webkit-box-orient vertical
      
  .q-column
    width 10%
    font-size 18px
    font-weight 600  
    text-align center    
    
  .q-column.score
    display flex
    flex-direction column
    align-items center
    justify-content center
    
    .underline
      margin-top 3px
      border-radius 2px
      height 4px
      width 52px
      background-color home-green	

</style>
