<template>
  <div class="course-view">
    <nav-header></nav-header>
    <div id="course-scroll-container">
      <div class="course-flex-container">
        <info v-if="offering" :offering="offering" />
        <breakdown v-if="offering && report" :offering="offering" :report="report" />
        <div class="empty-breakdown" v-else>No Q data available.</div>
        <!-- <comments v-if="commentInfo" :info="commentInfo"></comments> -->
      </div>
    </div>
  </div>
</template>

<script>

import NavHeader from '@/components/NavHeader.vue'
import info from './Info/Info.vue'
import breakdown from './Q/Breakdown.vue'
import comments from './Q/Comments.vue'

export default {
  name: 'course',
  components: { NavHeader, info, breakdown, comments },
  computed: {
    offering () { 
      return this.$store.state.course.offering
    },
    report () { 
      const { topReport, reports } = this.offering
      const selectedId = this.$route.query.report
      if (selectedId) {
        const selected = [topReport, ...reports].filter(report => report.reportId === selectedId)
        if (!selected) {
          console.log('Could not find report matching the selected reportId', selectedId, 'in', reports)
          return topReport
        }
        return selected[0]
      }
      return topReport
    },
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

    .empty-breakdown
      margin-top 50px
      height 350px
      line-height 350px
      color #AAA

</style>
