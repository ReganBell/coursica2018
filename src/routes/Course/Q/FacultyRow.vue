<template>
  <div class="faculty-row">
    <span class="label">{{ prof.displayName }}</span>
    <span class="score-container">
      <span class="score">{{ prof.score }}</span>
      <span class="color-line" :style="{'background-color': prof.color}"></span>
    </span>
  </div>
</template>

<script>

export default {
  name: 'faculty-row',
  props: ['prof']
}

</script>

<style lang="stylus">

@import '../../../styles/base.styl'

.course-flex-container
  .q-breakdown
    
    .faculty-row:hover
      background-color #F9F9F9
      cursor pointer
      border-radius 2px

    .faculty-row
      height 30px
      color black
      
      .score, .label
        height 30px
        line-height 30px
        font-size 12px
        
      .label
        margin-left 8px
        margin-right 8px

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
          background-color home-green
          margin-top 3px
          // margin-bottom 4px
          margin-left 7px
        

</style>

