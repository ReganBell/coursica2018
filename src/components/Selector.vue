<template>
  <div class="selector" :class="{['align-' + align]: true}" :style="{ width }">
    <select v-if="align == 'left' || align == 'center'" @input="changed">
      <option v-for="(option, index) in options" :value="option.option" :key="index" :selected="option.selected">{{ option.text }}</option>
    </select>
    <span class="label" :class="selectedOption ? '' : {placeholder : true}">
      {{ selectedOption ? selectedOption : placeholder }} <img src="../assets/select_arrow_blue.png" class="select-arrow"></img>
    </span>
    <select v-if="align == 'right'" @input="changed">
      <option v-for="(option, index) in options" :value="option.option" :key="index" :selected="option.selected">{{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>

export default {
  name: 'selector',
  props: ['selectedOption', 'options', 'align', 'placeholder', 'handler', 'width'],
  methods: { changed (e) { this.handler(e) } }
}

</script>

<style lang="stylus">

@import '../styles/base.styl'

img.select-arrow
  width 8px
  height 6px
  pointer-events none

.selector
  display flex
  margin-top 10px
  cursor pointer
  height 24px
  
  .label
    position relative
    z-index 0
    flex-grow 1
    width 50%
    color coursica-blue
    font-weight 600
    font-family Proxima Nova
    
  .label.placeholder
    color #B9B9B9
    
  select
    position relative
    z-index 1
    flex-grow 1
    width 50%
    
    color white
    font-size 0px
    height 24px
    
    appearance none
    border none
    outline none
    background-color alpha(white, 0)
    cursor pointer
    

.selector.align-center
  justify-content center
  text-align left
  
  .label
    text-align center
    right 25%
    
  select
    left 25%
    
.selector.align-right
  justify-content flex-start
  text-align right
  
  .label
    text-align right
    left 50%
  
  select
    direction rtl
  
.selector.align-left
  justify-content flex-end
  text-align left
  
  .label
    text-align left
    right 50%
</style>
