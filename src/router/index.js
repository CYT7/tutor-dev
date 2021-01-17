import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/home/Login'
import RegisterParent from '@/components/home/RegisterParent'
import RegisterTutor from '@/components/home/RegisterTutor'
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
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
