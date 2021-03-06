// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Auth from './api/auth'
import VueKeepScrollPosition from 'vue-keep-scroll-position'
import { sync } from 'vuex-router-sync'
import InstantSearch from 'vue-instantsearch'
import 'vue-nouislider/dist/vue-nouislider.css'
import VueNoUISlider from 'vue-nouislider/dist/vue-nouislider.common'
import VueObserveVisibility from 'vue-observe-visibility/dist/vue-observe-visibility'

Vue.use(VueObserveVisibility)
Vue.use(VueNoUISlider)
Vue.use(InstantSearch)

sync(store, router)

Vue.config.productionTip = false
Vue.use(VueKeepScrollPosition)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  beforeCreate: function () {
    Auth.listenForUser(user => {
      store.commit('setUser', user)
      store.commit('authReady', true)
    }, () => {
      store.commit('setUser', null)
      store.commit('authReady', true)
    })
  }
})
