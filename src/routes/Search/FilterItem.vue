<template>
  <div class="item" @click="handleClick">{{ value }}</div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  props: ['value'],
  methods: {
    handleClick: function (event) {
      console.log('Clicked', this.value)
    }
  }
}

</script>

<style lang="stylus">

@import '../../styles/base.styl'

.filter

    .item:hover
      color #A9A9A9

    .item
      padding-top 5px
      padding-bottom 5px
</style>
