<template>
<div class="search-result" @click="selectCourse">
  <div class="course-info">
    <div class="title">{{ info.title }}</div>
     <div class="info-subtitle">
      <span class="group-and-number">{{ info.groupAndNumber }}</span>
      <span class="term">{{ info.termYear }}</span>
      <span v-if="info.days" class="meets">{{ info.days }} {{ time }}</span>
      <span v-if="prof" class="prof">{{ prof.name }}</span>
      <span v-if="prof" class="profScore" v-bind:style="{ color: prof.color }">{{ prof.score }}</span>
    </div>
    <div class="description" v-html="result.description" />
  </div>
  <span v-if="overall" class="q-column score" :class="overall.class">{{ overall.score }}
    <span v-if="overall.color" class="underline" :style="{ 'background-color': overall.color }" />
  </span>
  <span v-else class="q-column score empty">N/A</span>
  <span class="q-column workload" :class="workload.class" style="workload.style">{{ workload.score }}</span>
  <span class="q-column size" :class="size.class">{{ size.size }}</span>  
</div>
</template>

<script>

import { basicInfo, profInfo, overallInfo, workloadInfo, sizeInfo, timeInfo } from '../../parse/offering'

export default {
  props: ['result'],
  methods: {
    selectCourse () {
      this.$emit('selectResult', this.result)
    }
  },
  computed: {
    info () {
      return basicInfo(this.result)
    },
    prof () {
      return profInfo(this.result.profs)
    },
    overall () {
      return overallInfo(this.result)
    },
    workload () {
      return workloadInfo(this.result)
    },
    size () {
      return sizeInfo(this.result)
    },
    time () {
      return timeInfo(this.result.sessions)
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
      	
      .meets, .time
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

  .q-column.empty
    color #DDD    
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
