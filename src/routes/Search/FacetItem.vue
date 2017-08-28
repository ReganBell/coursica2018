<template>
<label class="label">
  <input type="checkbox"
          class="checkbox"
          v-model="facet.isRefined"
          @change="toggleRefinement(facet)"
          :value="facet.name"
  >
  <slot :count="facet.count" :active="facet.isRefined" :value="facet.name">
    <span class="value">{{facet.name}}</span>
    <span class="count">{{facet.count}}</span>
  </slot>
</label>
</template>

<script>
export default {
  props: ['facet'],
  methods: {
    toggleRefinement (facet) {
      this.$emit('toggleRefinement', facet)
    }
  }
}
</script>
