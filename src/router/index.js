import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/home/Login'
import RegisterParent from '@/components/home/RegisterParent'
import RegisterTutor from '@/components/home/RegisterTutor'
import Home from  '@/components/home/Home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/home',
      name:'Home',
      component:Home
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/RegisterParent',
      name: 'RegisterParent',
      component: RegisterParent
    },
    {
      path: '/RegisterTutor',
      name: 'RegisterTutor',
      component: RegisterTutor
    }
  ]
})
