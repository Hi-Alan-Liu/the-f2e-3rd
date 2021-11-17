import Vue from 'vue'
import VueRouter from 'vue-router'
import AppLayout from '@/layouts/App.vue';
import Week01Layout from '@/layouts/Week01/Layout.vue';
import Week02Layout from '@/layouts/Week02/Layout.vue';
import Home from '@/views/Home.vue'
import Week01Home from '@/views/Week01/Home.vue'
import Week01About from '@/views/Week01/About.vue'
import Week02Home from '@/views/Week02/Home.vue'
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
        meta: {
          title: 'Alan - The F2E 3rd'
        }
      },
    ],
  },
  {
    path: '/Week01',
    name: 'Home',
    component: Week01Layout,
    children: [
      {
        path: '',
        component: Week01Home,
        meta: {
          title: '台灣旅遊景點導覽'
        }
      },
    ],
  },
  {
    path: '/Week01/:type/:name',
    name: 'About',
    component: Week01Layout,
    children: [
      {
        path: '',
        component: Week01About,
        props: true,
        meta: {
          title: '台灣旅遊景點導覽'
        }
      }
    ]
  },
  {
    path: '/Week02',
    name: 'Home',
    component: Week02Layout,
    children: [
      {
        path: '',
        component: Week02Home,
        meta: {
          title: '自行車道地圖資訊整合網'
        }
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})

export default router