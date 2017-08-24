<template>
  <div class="response-row" @click="clickedResponse">
    <span class="label">{{ response.label }}</span>
    <span class="score-container">
      <span class="score">{{ response.score }}</span>
      <span class="color-line" :style="{'background-color': response.color}"></span>
    </span>
  </div>
</template>

<script>

export default {
  name: 'response-row',
  props: ['response'],
  methods: {
    clickedResponse (event) { this.$store.commit('setCompareArea', this.response.label.toLowerCase()) }
  }
}

</script>

<style lang="stylus">

@import '../../../styles/base.styl'

.course-flex-container
  .q-breakdown
    
    .response-row:hover
      background-color #F9F9F9
      cursor pointer
      border-radius 2px

    .response-row
      height 30px
      color black
      
      .score, .label
        height 30px
        line-height 30px
        font-size 12px
        
      .label
        margin-left 8px

      .score-container
        float right
        height 100%
        
        .score
          font-weight 600
        
        .color-line
          float right
          height 22px
          width 3px
          border-radius 1.5px
          background-color lightGray
          margin-top 3px
          // margin-bottom 4px
          margin-left 7px
        

</style>

