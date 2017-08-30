<template>
  <div id="q-comments">
    <div id="q-sidebar">
      <div class="title">Q Comments</div>
      <selector :selectedOption="selectedOption" :options="options" :align="'left'" :handler="reportChanged"></selector>
      <div class="filters">
        <div class="filter" v-for="filter in filters"
          :key="filter.name"
          @click="handleFilterChange">
            {{ filter.name }}</div>
      </div>
    </div>
    <div id="comment-column">
      <div class="comments" v-if="comments">
        <div class="comment-container" v-for="comment in commentItems" :key="comment.key">
          <div class="comment" :class="selectedFilter !== 'All' ? 'filtered' : ''" v-html="comment.text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import $ from 'jQuery'
import Selector from '@/components/Selector.vue'
import { parseOptions } from '@/parse/report'
import { mapComments } from '@/parse/comments'

export default {
  name: 'q-comments',
  components: { Selector },
  props: ['offering', 'report'],
  data: () => ({
    filters: ['All', 'Lecture', 'Section', 'Work', 'Exam', 'Reading', 'TF'].map(name => ({ name })),
    selectedFilter: 'All'
  }),
  computed: {
    comments () {
      return this.$store.state.course.comments
    },
    commentItems () {
      const mapped = mapComments(this.comments, this.selectedFilter)
      return Object.keys(mapped).map(key => { 
        const { text } = mapped[key]
        return { text, key }
      })
    },
    options () {
      return parseOptions(this.offering, this.report)
    },
    selectedOption () {
      return this.report.term + ' ' + this.report.year.replace('20', "'")
    },
  },
  methods: {
    handleFilterChange (event) {
      this.selectedFilter = event.target.innerText
    },
    reportChanged (event) {
      this.$router.push({ 
        query: {
          report: event.target.value
        }
      })
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
          
          .comment.filtered
            color #999
          .comment
            padding-left 25px
            padding-right 15px
            padding-top 15px
            padding-bottom 15px
            font-family Source Sans Pro
            font-size 14px
            color black

            .mention
              color black
              .match
                font-weight 600

                 
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

