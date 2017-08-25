<template>
  <div class="filter">
    <div class="header">{{ display }}</div>
    <ais-refinement-list 
      :attribute-name="name" 
      :class-names="classNames"
      :limit="100"></ais-refinement-list>  
  </div>
</template>

<script>
export default {
  name: 'filter',
  data: () => ({
    classNames: {
      'ais-refinement-list': 'list',
      'ais-refinement-list__item': 'item',
      'ais-refinement-list__label': 'label',
      'ais-refinement-list__checkbox': 'checkbox',
      'ais-refinement-list__value': 'value',
      'ais-refinement-list__count': 'count',
      'ais-refinement-list__item--active': 'active'
    }
  }),
  props: ['name', 'display']
}
</script>

<style lang="stylus">
.filter
  margin 10px
  .header
    padding 5px
    color #959595
  .list
    .item
      margin-left 10px
      margin-top 7px
      .value
        padding-left 8px
      .count
        color #959595
    .item.active
      .value
        font-weight 600
</style>
