<template>
  <div class="bottom-half">
    <div id="boxes">
      <box
        v-for="(box, index) in boxes"
        v-bind:color="box.color"
        v-bind:title="box.title"
        v-bind:subtitle="box.subtitle"
        v-bind:size="box.size"
        v-bind:key="index">
      </box>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import box from './Box.vue'

let boxes = [
  {color: 'purple', title: 'Coursica Picks', subtitle: 'The best in class'},
  {color: 'yellow', title: 'Electives', subtitle: 'Try something new'},
  {color: 'orange', title: 'Courses you may like', subtitle: "Similar to those you've taken"},
  {color: 'blue', title: 'Gen Eds', subtitle: 'Gen ed list goes here'},
  {color: 'green', title: 'Departments', subtitle: 'Department list goes here', size: 'large'}
]

boxes = boxes.map(b => ({...b, size: b.size ? b.size : 'small'}))

export default {
  components: { box },
  computed: mapState({
    boxes: _ => boxes
  })
}

</script>

<style lang="stylus">

@import '../../styles/base.styl'
   
#boxes
  absolute-center-horizontal()
  width 60%
  height 54vh
  top 10vh

  display flex
  flex-wrap wrap
  justify-content space-between
</style>
