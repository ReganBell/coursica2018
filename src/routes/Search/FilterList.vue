<template>
  <div class="filter" @click="handleClick">
    <div class="header">
        <div class="title">{{ display }}</div>
        <div class="expand">{{ expanded ? 'Hide' : 'Show'}}</div>
      </div>
    <div class="list" @click.stop :style="{ display: expanded ? '' : 'none' }">
      <div v-for="facet in trimmedValues" :key="facet.name" :class="facet.isRefined ? 'item active' : 'item'">
        <facetItem @toggleRefinement="toggleRefinement" :facet="facet" />
      </div>
      <div class="show-more" v-if="canShowMore" @click.stop="toggleShowMore">{{ showingMore ? 'Show fewer' : 'Show more' }}</div>
    </div>
  </div>
</template>

<script>

import facetItem from './FacetItem.vue'

export default {
  data: () => ({
    sortBy: ['isRefined:desc', 'count:desc', 'name:asc'],
    limit: 100,
    operator: 'or', // can also be 'and',
    expanded: true,
    showingMore: false
  }),
  props: ['name', 'display', 'attributeName', 'query', 'searchStore', 'threshold'],
  components: { facetItem },
  created () {
    this.searchStore.addFacet(this.attributeName, this.operator)
    const query = this.$route.query[this.queryKey]
    if (query) {
      const facets = query.split('_')
      facets.forEach(facet => this.searchStore.toggleFacetRefinement(this.attributeName, facet))
    }
  },
  destroyed () {
    this.searchStore.removeFacet(this.attributeName)
  },
  computed: {
    queryKey () {
      return this.query || this.attributeName
    },
    facetValues() {
      return this.searchStore.getFacetValues(
        this.attributeName,
        this.sortBy,
        this.limit
      )
    },
    trimmedValues () {
      return this.showingMore ? this.facetValues : this.facetValues.slice(0, this.threshold)
    },
    canShowMore () {
      return this.facetValues.length > this.threshold
    },
    queryFacets () {
      const query = this.$route.query[this.queryKey]
      if (query) {
        return query.split('_')
      } else {
        return []
      }
    }
  },
  methods: {
    setFacets (facets) {
      const queries = JSON.parse(JSON.stringify(this.$route.query))
      if (facets.length === 0) {
        delete queries[this.queryKey]
      } else {
        queries[this.queryKey] = facets.join('_')
      }
      this.$router.push({ query: queries })
    },
    toggleRefinement(value) {
      this.searchStore.toggleFacetRefinement(
        this.attributeName,
        value.name
      )
      let facets = this.queryFacets
      if (value.isRefined) {
        facets.push(value.name)
      } else {
        facets = facets.filter(facet => facet !== value.name)
      }
      this.setFacets(facets)
    },
    toggleShowMore () {
      this.showingMore = !this.showingMore
    },
    handleClick () {
      this.expanded = !this.expanded
    }
  },
  watch: {
    operator() {
      this.searchStore.addFacet(this.attributeName, this.operator)
    },
  },
}
</script>

<style lang="stylus">

.show-more
  color #1E91FA
  margin-top 8px
  margin-left 39px
  font-weight 600
  font-size 14px

  cursor pointer

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
      cursor pointer
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
