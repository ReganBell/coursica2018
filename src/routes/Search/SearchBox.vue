<template>
  <form role="search" action="" @submit.prevent="onFormSubmit">
    <slot>
      <ais-input :search-store="searchStore" :placeholder="placeholder" :autofocus="autofocus"></ais-input>
      <ais-clear id="clear" :search-store="searchStore">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20">
          <title>{{ clearTitle }}</title>
          <path
            d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"
            fillRule="evenodd"
          />
        </svg>
      </ais-clear>
    </slot>
  </form>
</template>

<script>

import { SearchBox } from 'vue-instantsearch'

export default {
  extend: SearchBox,
}
</script>

<style lang="stylus">

.ais-clear--disabled
  opacity 0

#clear
  position relative  
  left -40px
  z-index 10

  background-color rgba(white, 0)
  -webkit-appearance none
  border none
</style>
