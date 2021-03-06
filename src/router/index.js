import Vue from 'vue'
import Router from 'vue-router'
import HomeContainer from '@/routes/Home/HomeContainer'
import SearchContainer from '@/routes/Search/SearchContainer'
import CourseContainer from '@/routes/Course/CourseContainer'
import ContactContainer from '@/routes/Home/Contact'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/manageAccount',
      name: 'ManageAccount',
      component: HomeContainer
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchContainer,
      props: route => ({ query: route.query.q })
    },
    {
      path: '/course/:objectID',
      name: 'Course',
      component: CourseContainer
    },
    {
      path: '/contact',
      name: 'Contact',
      component: ContactContainer
    },
    {
      path: '/',
      name: 'Home',
      component: HomeContainer
    }
  ]
})
