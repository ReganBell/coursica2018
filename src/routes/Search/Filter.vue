<template>
  <div class="filter" @click="handleClick">
    <div class="header">
      <div class="title">{{ display }}</div>
      <div class="expand">{{ expanded ? 'Hide' : 'Show'}}</div>
    </div>
    <ais-refinement-list
      :style="expanded ? {} : { display: 'none' }"
      :attribute-name="name" 
      :class-names="classNames"
      :limit="100" />
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
    },
    expanded: false
  }),
  props: ['name', 'display'],
  methods: {
    handleClick () {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style lang="stylus">
.filter:hover
  background-color #FCFCFF
.filter
  padding 10px
  .header
    padding 5px
    color #959595
    display flex
    justify-content space-between

    .expand
      color #CCC
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
