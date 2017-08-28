<template>
  <div class="bottom-half">
    <div class="shopping-list-container">
      <div class="shopping-list-title">My Shopping List</div>
      <template v-if="courses">
        <template v-if="courses.length > 0">
          <table-header></table-header>
          <result v-for="course in courses" :key="course.objectID" :rawResult="course"></result>
        </template>
        <div v-else class="shopping-list-subtitle">Your shopping list is empty. Try adding some courses.</div>
      </template>
    </div>
  </div>
</template>

<script>

import result from '../Search/Result.vue'
import tableHeader from '../Search/TableHeader.vue'
import Auth from '../../api/auth.js'
import Search from '../../api/search'

export default {
  components: { result, tableHeader },
  data: function() {
    return {
      courses: undefined
    }
  },
  mounted: function () {
    Auth.getShoppingList().then(courseIds => {
      return courseIds.length > 0 ? Search.getShoppingListCourses(courseIds) : []
    }).then( courses => {
        this.courses = courses
    })
  }
}

</script>

<style lang="stylus">

@import '../../styles/base.styl'
.bottom-half
  overflow auto

.shopping-list-container
  width search-results-width
  margin 0 auto

.shopping-list-title
  font-size 36px
  font-weight bold
  padding-top 70px
  padding-bottom 20px
  text-align center

.shopping-list-subtitle
  font-size 20px
  font-weight 500
  padding-top 20px
  text-align center
  color #b9b9b9

</style>
