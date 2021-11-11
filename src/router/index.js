import Vue from 'vue'
import VueRouter from 'vue-router'
import AppLayout from '@/layouts/App.vue';
import Week01Layout from '@/layouts/Week01/Layout.vue';
import Home from '../views/Home.vue'
import Week01Home from '../views/Week01/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AppLayout,
    children: [
      {
        path: '',
        component: Home,
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/Week01',
    name: 'Week01',
    component: Week01Layout,
    children: [
      {
        path: '',
        component: Week01Home,
      },
    ],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
