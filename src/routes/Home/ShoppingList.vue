<template>
  <div class="bottom-half">
    <div class="shopping-list-container">
      <div class="shopping-list-title">My Shopping List</div>
      <template v-if="courses.length > 0">
        <table-header></table-header>
        <result v-for="course in courses" :key="course.objectID" :rawResult="course"></result>
      </template>
      <div v-else>Your shopping list is empty. Try adding some courses.</div>
    </div>
  </div>
</template>

<script>

import result from '../Search/Result.vue'
import tableHeader from '../Search/TableHeader.vue'
import Auth from '../../api/auth.js'
import Search from '../../api/search.js'

export default {
  components: { result, tableHeader },
  data: function() {
    return {
      courses: []
    }
  },
  mounted: function () {
    Auth.getShoppingList().then(courseIds => {
      return Search.getShoppingListCourses(courseIds)
    }).then( courses => {
        this.courses = courses
    })
  }
}

</script>

<style lang="stylus">

@import '../../styles/base.styl'

.shopping-list-container
  width search-results-width
  margin: 0 auto;

.shopping-list-title
  font-size: 36px;
  font-weight: bold;
  padding-top: 50px;
  padding-bottom: 10px;
  text-align: center;

</style>
