import Vue from 'vue'
import VueRouter from 'vue-router'
// import AppLayout from '@/layouts/App.vue';
import Week01Layout from '@/layouts/Week01/Layout.vue';
// import Home from '@/views/Home.vue'
import Week01Home from '@/views/Week01/Home.vue'
import Week01About from '@/views/Week01/About.vue'
Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: AppLayout,
  //   children: [
  //     {
  //       path: '',
  //       component: Home,
  //       meta: {
  //         title: '台灣旅遊景點導覽'
  //       }
  //     },
  //   ],
  // },
  // {
  //   path: '/about',
  //   name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/',
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
    path: '/:type/:name',
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
  }
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