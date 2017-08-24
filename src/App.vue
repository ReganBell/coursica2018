<template>
  <div id="app">
    <router-view v-if="authReady"></router-view>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'app',
  computed: mapState({
    authReady: state => state.authReady
  })
}
</script>

<style lang="stylus">
@import './styles/base'

@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600')

body
  font-family Proxima Nova
  font-weight 400
  -webkit-font-smoothing antialiased

::-webkit-input-placeholder
  color alpha(black, 0.27)
  
@font-face 
  font-family: Proxima Nova
  src: url("./assets/fonts/ProximaNova-Regular.woff") format("woff")
  font-weight: 400
  font-style: normal


@font-face 
  font-family: Proxima Nova
  src: url("./assets/fonts/ProximaNova-Semibold.woff") format("woff")
  font-weight: 600
  font-style: normal


@font-face 
  font-family: Proxima Nova
  src: url("./assets/fonts/ProximaNova-Bold.woff") format("woff")
  font-weight: 700
  font-style: normal


@font-face 
  font-family: Proxima Nova
  src: url("./assets/fonts/ProximaNova-Light.woff") format("woff")
  font-weight: 200
  font-style: normal

</style>
