<template>
<div class="search-result" @click="selectCourse">
  <div class="course-info">
    <div class="title">{{ title }}</div>
    <div class="info-subtitle">
      <span class="group-and-number">{{ groupAndNumber }}</span>
      <span class="term">{{ termYear }}</span>
      <span v-if="meets" class="meets">{{ meets }}</span>
      <span v-if="prof" class="prof">{{ prof.name }}</span>
      <span v-if="prof" class="profScore" v-bind:style="{ color: prof.color }">{{ prof.score }}</span>
    </div>
    <div class="description" v-html="description"></div>
  </div>
  <span v-if="overall" class="q-column score">{{ overall.score }}
    <span class="underline" :style="{ 'background-color': overall.underlineColor }"></span>
  </span>
  <span v-else class="q-column score" style="color: lightGray">N/A</span>
  <span v-if="workload" class="q-column workload">{{ workload.score }}</span>
  <span v-else class="q-column workload" style="color: lightGray">N/A</span>
  <span v-if="size" class="q-column size">{{ size }}</span>
  <span v-else class="q-column size" style="color: lightGray">N/A</span>
</div>
</template>

<script>

export default {
  name: 'search-result',
  props: ['title', 'groupAndNumber', 'termYear', 'meets', 'prof', 'description', 'overall', 'workload', 'size', 'objectID'],
  methods: {
    selectCourse: function () {
      this.$store.dispatch('selectOffering', this.objectID)
      this.$router.push({ path: '/course/' + this.objectID })
    }
  }
}

</script>

<style lang="stylus">

@import '../../styles/base.styl'

.search-result:hover
  background-color #FAFAFA

.search-result
  width search-results-width
  border-bottom solid 1px #EEE
  
  padding-left rbw-underline-search-left
  
  transition background-color 100ms ease-in-out
  
  display: flex
  align-items: center
  
  .course-info
    width 70%
    height 100%
    
    .title
      padding-top 16px
      width 90%
      
      cursor pointer
      
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
        cursor pointer
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
