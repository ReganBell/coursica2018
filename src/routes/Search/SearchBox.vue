<template>
  <form role="search" action="" @submit.prevent="onFormSubmit">
    <slot>
      <!-- <ais-input :search-store="searchStore" :placeholder="placeholder" :autofocus="autofocus"></ais-input> -->
      <input class="search-box" type="search"
         autocorrect="off"
         autocapitalize="off"
         autocomplete="off"
         spellcheck="false"
         :value="query"
         @keyup.enter="handleEnter"/>
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
  data: function () {
    return { query: this.searchStore.query }
  },
  methods: {
    handleEnter (event) {
      this.$store.dispatch('setSearchText', event.target.value)
      this.$store.dispatch('submitSearch')
    }
  }
}
</script>

<style lang="stylus">

.search-box
  margin-top 10px
  margin-left 44px
  width 639px
  height 44px
  
  color #888
  font-weight 400
  font-size 18px
  font-family Proxima Nova
  text-align left

  background-color #F3F3F3
  border-radius 8px
  padding-left 20px
  border-style none
  outline none

::-ms-clear 
  display none

::-webkit-search-decoration,
::-webkit-search-cancel-button,
::-webkit-search-results-button,
::-webkit-search-results-decoration 
  display none

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
