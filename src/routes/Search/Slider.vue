<template>
  <div class="filter" @click="handleClick">
    <div class="header">
      <div class="title">{{ display }}</div>
      <div class="expand">{{ expanded ? 'Hide' : 'Show'}}</div>
    </div>
    <div class="container" :style="expanded ? {} : { display: 'none' }">
      <div @click.stop>
        <div class="slider" :id="id" />
      </div>
    </div>
  </div>
</template>

<script>
const noUiSlider = require('nouislider')

export default {
  name: 'filter',
  data: () => ({
    slider: null,
    expanded: false,
    tempValues: [1, 5]
  }),
  props: ['name', 'display', 'values', 'range'],
  methods: {
    handleClick () {
      this.expanded = !this.expanded
    },
    handleChange (newValues) {
      this.tempValues = newValues
    },
    handleEndDrag () {
      this.$emit('updateSlider', this.name, this.tempValues)
    }
  },
  computed: {
    id: function () { return 'slider-' + this.name }
  },
  mounted () {
    this.slider = document.getElementById(this.id)
    this.tempValues = this.range
    const options = { 
      connect: true,
      range: this.range,
      start: this.values,
      tooltips: true,
      format: {
        to: value => parseFloat(value).toFixed(1),
        from: value => parseFloat(value).toFixed(1)
      }
    }
    noUiSlider.create(this.slider, options)
    this.slider.noUiSlider.on('end', () => {
      this.handleEndDrag()
    })
    this.slider.noUiSlider.on('change', (newValues) => {
      this.handleChange(newValues)
    })
  }
}
</script>

<style lang="stylus">
.filter:hover
  background-color #FCFCFF
.filter
  padding 10px
  .container
    display flex
    justify-content center
    margin-top 20px
    margin-bottom 20px
    .slider
      width 200px
      .noUi-connect
        background-color #1E91FA
        border none
      // .noUi-horizontal
      //   height 14px
      // .noUi-handle:after, .noUi-handle:before
      //   height 10px
      .noUi-handle
        border 1px solid #DDD
        box-shadow none
        // height 24px
</style>
