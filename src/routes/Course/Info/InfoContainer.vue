<template>
  <div class="course-info">
    <div class="header">
      <div class="titles-column">
        <div class="group-and-number">{{ info.groupAndNumber }}</div>
        <div class="title">{{ info.title }}</div>
        <div @click="addToShopping" class="shopping-button">Add to shopping list</div>
      </div>
      <div class="circle-column">
        <score-circle v-if="info.scoreCircle"
          :score="info.scoreCircle.score" 
          :textColor="info.scoreCircle.textColor"
          :diameter="130" 
          :color="info.scoreCircle.color" 
          :scoreSize="'40px'" 
          :labelSize="'12px'" 
          :label="'Predicted Q Overall'" 
          id="info-circle">
        </score-circle>
      </div>
    </div>
    <div class="offering-rows">
      <select class="hidden">
        <option v-for="option in info.offerings" 
          :value="option.option" 
          :key="option.option" 
          :selected="option.option == info.objectID">{{ option.text }}</option>
      </select>
      <div class="term-year">
        <img src="../../../assets/select_arrow_blue.png" class="select-arrow"></img>
        {{ info.termYear }}
      </div>
      <div class="meeting-time">{{ info.meetingTime }}</div>
      <template v-for="prof in info.profs">
        <span class="prof">
          <router-link :to="'a'" class="name">{{ prof.name }}</router-link>
          <span class="score" :style="{color: prof.color}">{{ prof.score }}</span>
        </span>
      </template>
    </div>
    <div class="description" v-html="info.description"></div>
    <div class="info-block">
      <template v-for="bullet in info.bullets">
        <div class="bullet">
          <img src="../../../assets/bullet.png" class="point"></img><div class="info" v-html="bullet"></div>
        </div>
      </template>
      <div class="more-info-btn">More details...</div>
    </div>
  </div>
</template>

<script>

import ScoreCircle from '../ScoreCircle.vue'
import Selector from '../../../components/Selector.vue'
import Auth from '@/api/auth'

export default {
  name: 'course-info',
  props: ['info'],
  components: { ScoreCircle, Selector },
  methods: {
    addToShopping: function () {
      Auth.addToShoopingList(this.info)
    }
  },
  mounted: function () { if (this.objectID) this.$store.commit('persistOffering', this.objectID) }
}

</script>

<style lang="stylus">

@import '../../../styles/base.styl'

.course-flex-container
  .course-info
    margin-top 50px
    width 50%
    min-width 700px
    border-bottom solid 1px #EEE
    
    display flex
    flex-direction column
    align-items flex-start
    justify-content flex-start
    
    .header
      width 100%
      display flex
      align-items flex-start
      justify-content space-between
    
    .titles-column
      display flex
      flex-direction column
      justify-content flex-start

      .group-and-number
        color #B9B9B9
        font-size 14px
        font-weight 600
        padding-top 10px
        padding-bottom 10px
        
      .title
        color black
        font-size 36px
        font-weight bold
        padding-top 10px
        padding-bottom 10px

      .shopping-button
        color coursica-blue
        font-weight 600
        padding-top 10px
        padding-bottom 10px
        cursor pointer
    
    .circle-column
      width 172px
      display flex
      justify-content flex-end
        
    .offering-rows
      padding-top 20px
      padding-bottom 20px
      width 100%
      
      display flex
      align-items flex-start
      
      select.hidden
        position relative
        color white
        font-size 0px
        height 24px
        width 100px
        left -20px
        z-index 1
        
        appearance none
        border none
        outline none
        background-color alpha(white, 0)
        cursor pointer
        
      .term-year
        position relative
        color coursica-blue
        font-weight 600
        margin-left -110px
        width 100px
        height 24px
        z-index 0
        
        .select-arrow
          position relative
          top -2px
          left -5px
          transform rotate(-90deg)
          
      .meeting-time
        color #B9B9B9
        margin-right 10px
      
      .prof
        padding-left 10px
        padding-right 10px
        
        a
          text-decoration none
          color coursica-blue
          font-weight 600
          
        .score
          padding-left 4px
          font-weight 600
          
        .score.green
          color #46D654
          
        .score.orange
          color #E67824
      
    .description
      padding-top 10px
      padding-bottom 10px
      
      font-family Source Sans Pro
      font-size 16px

    .info-block
      padding-top 20px
      padding-bottom 20px
      font-size 14px
      
      display flex
      flex-direction column
      justify-content flex-start
      align-items flex-start
      // font-family Source Sans Pro
      
      a
        text-decoration none
        color coursica-blue
        font-weight 600

      .bullet
        padding-top 5px
        padding-bottom 5px
        display flex
        justify-content flex-start
        align-items center
        
        .point
          width 5px
          height 5px

        .info
          padding-left 10px
          line-height 16px
          
          .paren
            color #B9B9B9
    
      .more-info-btn
        color coursica-blue
        font-weight 600
        cursor pointer
        padding-top 7px
        padding-left 13px
        padding-bottom 10px
      
</style>
