<template>
  <div class="q-breakdown">
    <div class="left-column">
      <div id="circle-column">
        <ScoreCircle v-if="overallCircle"
          id="overall-circle" 
          :score="overallCircle.score"
          :label="'Overall'"
          :color="overallCircle.color">
        </ScoreCircle>
        <ScoreCircle v-if="workloadCircle"
          id="workload-circle" 
          :score="workloadCircle.score" 
          :label="'Workload'"
          :color="workloadCircle.color">
        </ScoreCircle>
      </div>
      <div id="response-column">
        <responseRow v-for="response in responseList" :response="response" :category="category" :key="response.label" />
      </div>
    </div>
     <div class="right-column">
       <div class="title">Q Breakdown</div>
      <selector :selectedOption="`${report.term} ${report.year}`" :options="options" :align="'right'" :handler="reportChanged"></selector>
      <!-- <div id="faculty-column">
        <faculty-row v-for="prof in info.profs" :prof="prof" :key="prof.matchName"></faculty-row>
      </div>  -->
    </div> 
    <!-- <div id="percentile-graph">
      <div v-for="bar in info.bars" class="bar" :style="bar"></div>
    </div>
    <div v-if="info.compare" id="percentile-label">
      {{ info.compare.text.beforeUnderline }}
      <div class="percentile">{{ info.compare.text.percentile }}%
        <div :style="{'background-color': info.compare.underlineColor}" class="underline"></div>
      </div>
      {{ info.compare.text.afterUnderline }}
      <select class="hidden" @input="compareCategoryChanged">
        <option v-for="option in info.compare.options" 
          :value="option.option" 
          :key="option.option" 
          :selected="option.selected">{{ option.text }}
        </option>
      </select>
      <div class="select-label">
        {{ info.compare.selectedOption }} 
        <img src="../../../assets/select_arrow_blue.png" class="select-arrow"></img>
      </div>
    </div> -->
  </div>
</template>

<script>

import ScoreCircle from '../ScoreCircle.vue'
import responseRow from './ResponseRow.vue'
import facultyRow from './FacultyRow.vue'
import selector from '@/components/Selector.vue'
import { scoreCircle } from '@/parse/common'
import { parseResponses, parseOptions } from '@/parse/report'

export default {
  components: { ScoreCircle, responseRow, facultyRow, selector },
  props: ['report', 'offering'],
  computed: {
    category () {
      return this.$route.query.category || 'size'
    },
    area () {
      return this.$route.query.area || 'overall'
    },
    responses () {
      return this.report.responses
    },
    responseList () {
      const responses = this.responses || {}
      const filtered = Object.keys(responses).filter(name => name !== 'overall' && name !== 'workload')
      return filtered.map(name => [name, responses[name]])
    },
    overallCircle () {
      try {
        return scoreCircle(this.responses.overall)
      } catch (_) {
        return null
      }
    },
    workloadCircle () {
      try {
        return scoreCircle(this.responses.workload)
      } catch (_) {
        return null
      }
    },
    options () {
      return parseOptions(this.offering, this.report)
    }
  },
  // created () {
  //   this.fetchData()
  // },
  // watch: { '$route': 'fetchData' },
  methods: {
    fetchData () {
      // this.$store.dispatch('fetchPercentiles')
    },
    reportChanged (event) {
      this.$store.dispatch('setSelectedReportId', event.target.value)
      // this.fetchData()
    },
    compareCategoryChanged (event) {
      this.$store.commit('setCompareCategory', event.target.value)
      // this.fetchData()
    }
  }
}

</script>

<style lang="stylus">

@import '../../../styles/base.styl'

.course-flex-container
  .q-breakdown
    margin-top 25px
    width 1000px
    border-bottom solid 1px #EEE
    
    display flex
    align-items flex-start
    justify-content space-between
    flex-wrap wrap
    
    .left-column      
      display flex
      position relative
      z-index 1
      align-items center
      justify-content space-between
      margin-left 80px
      
      #response-column
        width 160px
        padding-left 30px

      #circle-column      
        display flex
        flex-direction column
        align-items center
        justify-content space-between
        
        #workload-circle
          margin-top 25px

    #percentile-label
      width 100%
      margin-top -20px
      padding-bottom 30px
      text-align center
      font-weight 600
      font-size 14px
      color black
      
      display flex
      justify-content center
      
      select.hidden
        position relative
        color white
        font-size 0px
        height 24px
        width 200px
        z-index 1
        
        appearance none
        border none
        outline none
        background-color alpha(white, 0)
        cursor pointer
        
      .select-label
        margin-left -195px
        color coursica-blue
      
      .percentile
        width 28px
        text-align center
        margin-left 3px
        margin-right 3px

        .underline
          width 100%
          height 3px
          border-radius 1.5px
          background-color lightGray
          
      .comparing-to
        margin-left 4px
        color coursica-blue
        cursor pointer
          
        img.arrow
          position relative
          top -1px
          width 8px
          height 6px
        
    #percentile-graph
      position relative
      z-index 0
      top -50px
      width 100%
      height 320px
      
      display flex
      align-items flex-end
      justify-content space-between

      .bar
        width 10px
        border-radius 5px
        background-color #F5F5F5
        font-size 0px
        transition height 300ms ease-in-out

    .right-column
      margin-right 150px
      
      display flex
      flex-direction column
      align-items flex-end
      justify-content flex-start
      
      #faculty-column
        // width 120px

      .title
        font-size 30px
        font-weight bold
        text-align right
        
      .selector
        display flex
        justify-content flex-end
        margin-top 10px
        cursor pointer
        text-align right
        width 200px
        height 24px
        
        .label
          position relative
          z-index 0
          left 50%
          flex-grow 1
          width 50%
          
          color coursica-blue
          font-weight 600
          font-family Proxima Nova
          text-align right

        select
          position relative
          z-index 1
          flex-grow 1
          width 50%
          
          color white
          font-size 0px
          height 24px
          direction rtl
          
          appearance none
          border none
          outline none
          background-color alpha(white, 0)
          cursor pointer

        select::-ms-expand
          display none  
            
</style>

