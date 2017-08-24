<template>
  <div id="q-comments" v-if="info">
    <div id="q-sidebar">
      <div class="title">Q Comments</div>
      <selector 
        :selectedOption="info.selectedOption" 
        :options="info.options" 
        :align="'left'"
        :handler="reportChanged"></selector>
      <div class="filters">
        <div class="filter" v-for="filter in filters">{{ filter.name }}</div>
      </div>
    </div>
    <div id="comment-column">
      <div class="comments" v-if="info.comments">
        <div class="comment-container" v-for="comment in comments"><div class="comment">{{ comment.text }}</div></div>
      </div>
    </div>
  </div>
</template>

<script>

import $ from 'jQuery'
import Selector from '@/components/Selector.vue'

export default {
  name: 'q-comments',
  components: { Selector },
  props: ['info'],
  computed: {
    filters: () => ['All', 'Lecture', 'Section', 'Work', 'Exam', 'Reading', 'TF'].map(f => ({name: f})),
    comments () {
      const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)
      return Object.values(this.info.comments).map(c => ({text: capitalize(c.text), helpful: c.helpful || 0}))
    }
  },
  created () {
    this.fetchData()
  },
  watch: { '$route': 'fetchData' },
  methods: {
    fetchData () {
      this.$store.dispatch('fetchComments')
    },
    reportChanged (event) {
      this.$store.dispatch('setSelectedReportId', event.target.value)
    },
    limitTop () {
      return this.scrollTarget.offset().top > 85
    },
    handleScroll () {
      if (this.target.hasClass('is-sticky') && this.limitTop()) {
        this.unstick()
      } else if (!this.limitTop()) {
        this.stick()
      }
    },
    stick () {
      const left = (this.scrollParent.outerWidth() - this.parent.outerWidth()) / 2 + 25
      this.target.addClass('is-sticky').css({ position: 'fixed', top: 85, left })
    },
    unstick (bottom) {
      this.target.removeClass('is-sticky').css({ position: '', top: '', left: '' })
    }
  },
  mounted () {
    $('#course-scroll-container').on('scroll', this.handleScroll)
    this.scrollParent = $('#course-scroll-container')
    this.parent = $('#q-comments')
    this.target = $('#q-sidebar')
    this.scrollTarget = $('#comment-column')
    this.targetWidth = this.target.outerWidth()
  },
  destroyed () {
    $('#course-scroll-container').off('scroll')
  }
}

</script>

<style lang="stylus">

@import '../../../styles/base.styl'

.course-flex-container
  #q-comments
    position relative
    margin-top 25px
    width 750px
    // border-bottom solid 1px #EEE
    min-height 800px

    #comment-column 
      
      position absolute
      right 25px
      width 62%

      display flex
      flex-direction column
      align-items center
      justify-content flex-start

      .comments
        width 100%
        margin-top 15px
        min-height 775px
        margin-bottom 20px
        
        .comment-container
          width 100%          
          border-bottom solid 1px #E8E8E8
          
          .comment
            padding-left 25px
            padding-right 15px
            padding-top 15px
            padding-bottom 15px
            font-family Source Sans Pro
            font-size 14px
            color black

                 
    #q-sidebar
      position absolute
      left 25px
      width 300px
      
      .title
        font-size 30px
        font-weight bold
        text-align left
        
      .filters
        margin-left 40px
        margin-top 15px

        .filter
          width 100px
          font-size 18px
          color #999999
          padding-top 8px
          padding-bottom 8px
          padding-left 8px
          border-radius 8px
          border solid 1px white
          transition color 100ms ease-in-out
          
        .filter:hover
          // border solid 1px #DDDDDD
          color black
            
</style>

