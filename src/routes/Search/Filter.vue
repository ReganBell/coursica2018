<template>
<span class="filter">
  {{ prompt }}
  <img src="../../assets/disclosure_triangle.png" class="expand-arrow" :class="{ expanded }"></span>
</span>
</template>

<script>

import { mapState } from 'vuex'

export default {
  props: ['prompt'],
  computed: mapState({
    expanded: state => false
  }),
  methods: {

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
  
  .expand-arrow
    padding-left 2px

    width 6px
    height 5px

</style>
