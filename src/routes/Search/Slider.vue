<template>
  <div class="filter">
    <div class="header">
      <div class="title">{{ display }}</div>
    </div>
    <div class="container">
      <div>
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
    expanded: true,
    tempValues: [1, 5]
  }),
  props: ['name', 'display', 'values', 'range', 'query'],
  methods: {
    handleClick () {
      this.expanded = !this.expanded
    },
    handleChange (newValues) {
      this.tempValues = newValues
    },
    handleEndDrag () {
      this.$emit('updateSlider', this.name, this.tempValues, this.query, this.range)
    }
  },
  computed: {
    id: function () { return 'slider-' + this.name }
  },
  mounted () {
    this.slider = document.getElementById(this.id)
    const [queryFrom, queryTo] = ['-from', '-to'].map(suffix => this.$route.query[this.query + suffix])
    this.tempValues = this.values
    if (queryFrom && queryTo) {
      this.tempValues = [queryFrom, queryTo].map(strValue => parseFloat(strValue))
      this.$emit('updateSlider', this.name, this.tempValues, this.query, this.range)
    }
    const options = { 
      connect: true,
      range: this.range,
      start: this.tempValues,
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
    margin-top 30px
    margin-bottom 20px
    .slider
      width 200px
      .noUi-connect
        background-color #1E91FA
        border none
        box-shadow none
      // .noUi-horizontal
      //   height 14px
      // .noUi-handle:after, .noUi-handle:before
      //   height 10px
      .noUi-handle
        border 1px solid #DDD
        box-shadow none
        // height 24px
</style>
