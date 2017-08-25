<template>
  <div class="bottom-half">
    <result v-for="course in courses" :key="course.objectID" :rawResult="course"></result>
  </div>
</template>

<script>

import result from '../Search/Result.vue'
import Auth from '../../api/auth.js'
import Search from '../../api/search.js'

export default {
  components: { result },
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
