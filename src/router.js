import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('./views/Home.vue')
const audioPage = () => import('./views/audio.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/audio',
      name: 'audio',
      component: audioPage
    }
  ]
})
