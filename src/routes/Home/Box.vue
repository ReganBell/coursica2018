<template>
  <span class="box" :class="size">
    <div class="top-bar" :class="color"></div>
    <div class="text-container">
      <div class="title">{{ title }}</div>
      <div class="subtitle">{{ subtitle }}</div>
    </div>
  </span>
</template>

<script>

export default {
  props: ['title', 'subtitle', 'color', 'size']
}

</script>

<style lang="stylus">

@import '../../styles/base.styl'
   
top-bar(name, color)
  .top-bar.{name}
    background-color color

.box:hover
  background-color #F9F9F9
  cursor pointer
  transform translateY(-3px)
  
.box.small
  width 30%
  
.box.large
  width 65%

.box
  height 178px
  background-color white
  transition transform 200ms ease-in-out
  
  .top-bar
    background-color red
    height 6px
    width 100%
    border-radius 4px
    
  top-bar('purple', home-purple)
  top-bar('yellow', home-yellow)
  top-bar('orange', home-orange)
  top-bar('blue', coursica-blue)
  top-bar('green', home-green)
  
  .text-container
    width 100%
    height 170px
    display flex
    flex-direction column
    justify-content center
    align-items center

    .title, .subtitle
      width 80%
      text-align center
      padding 5px
      padding-left 0px
      padding-right 0px

    .title
      font-size 32px
      font-weight 600
      
    .subtitle
      color #B3B3B3
      font-size 18px
      font-weight 400


</style>
