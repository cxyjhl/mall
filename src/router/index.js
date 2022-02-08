import Vue from 'vue'
import VueRoute from 'vue-router'

Vue.use(VueRoute);

const home = () => import("views/home/home.vue");
const category = () => import("views/category/category.vue");
const shopcart = () => import("views/shopcart/shopcart.vue");
const profile = () => import("views/profile/profile.vue");
const detail = () => import("views/detail/detail.vue");


const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home,
    meta: {
      footShow: true
    }
  },
  {
    path: '/category',
    component: category,
    meta: {
      footShow: true
    }
  },
  {
    path: '/shopcart',
    component: shopcart,
    meta: {
      footShow: true
    }
  },
  {
    path: '/profile',
    component: profile,
    meta: {
      footShow: true
    }
  },
  {
    path: '/detail/:iid',
    component: detail,
    meta: {
      footShow: false
    }
  }
]

export default new VueRoute({
  routes,
  mode: 'history'
})