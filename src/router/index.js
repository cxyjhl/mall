import Vue from 'vue'
import VueRoute from 'vue-router'

Vue.use(VueRoute);

const home = () => import("views/home/home.vue");
const category = () => import("views/category/category.vue");
const shopcart = () => import("views/shopcart/shopcart.vue");
const profile = () => import("views/profile/profile.vue");


const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/category',
    component: category
  },
  {
    path: '/shopcart',
    component: shopcart
  },
  {
    path: '/profile',
    component: profile
  }
]

export default new VueRoute({
  routes,
  mode: 'history'
})