<template>
  <div class="course-view">
    <nav-header></nav-header>
    <div id="course-scroll-container">
      <div class="course-flex-container">
        <infoContainer :offering="offering"></infoContainer>
        <!-- <breakdown v-if="breakdown" :info="breakdown"></breakdown>
        <comments v-if="commentInfo" :info="commentInfo"></comments> -->
      </div>
    </div>
  </div>
</template>

<script>

import NavHeader from '@/components/NavHeader.vue'
import infoContainer from './Info/InfoContainer.vue'
import breakdown from './Q/Breakdown.vue'
import comments from './Q/Comments.vue'

export default {
  name: 'course',
  components: { NavHeader, infoContainer, breakdown, comments },
  computed: {
    offering () { 
      console.log('offering', this.$store.state.course.offering)
      return this.$store.state.course.offering
    },
    breakdown () { return this.$store.state.course.breakdown },
    commentInfo () { return this.$store.state.course.commentInfo }
  }
}

</script>

<style lang="stylus">

@import '../../styles/base.styl'

#course-scroll-container
  position fixed
  left 0
  right 0
  bottom 0
  min-height 0px
  top header-height
  
  overflow scroll

  .course-flex-container
    display flex
    align-items center
    justify-content flex-start
    flex-direction column

</style>
