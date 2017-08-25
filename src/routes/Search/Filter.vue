<template>
<div class="filter"  @click="handleClick">
  <div class="selection">
     {{ filter.placeholder }} 
    <img src="../../assets/disclosure_triangle.png" class="expand-arrow" :class="{ expanded }"></span>
  </div>
  <div v-if="expanded" class="list">
    <filterItem v-for="value in filter.values" :value="value" :key="value"></filterItem>
  </div>
</div>
</template>

<script>

import { mapState } from 'vuex'
import filterItem from './FilterItem'

export default {
  props: ['filter'],
  components: { filterItem },
  data: () => ({
    expanded: false
  }),
  methods: {
    handleClick: function (event) {
      this.$data.expanded = !this.$data.expanded
    },
    handleItemClick: function (event) {
      console.log(event.target.value)
    }
  }
}

</script>

<style lang="stylus">

@import '../../styles/base.styl'

.filter
  font-weight 600
  color #B9B9B9
  font-size 14px
  cursor pointer
  margin-top 14px
  padding-left 10px
  padding-right 10px

  position relative
  z-index 10
  display flex
  flex-direction column
  overflow visible

  background-color white

  .selection
    height 100%

  .list
    margin-top 8px
    margin-bottom 8px

    .item:hover
      color #A9A9A9

    .item
      padding-top 5px
      padding-bottom 5px
  
  .expand-arrow
    padding-left 2px

    width 6px
    height 5px

</style>
