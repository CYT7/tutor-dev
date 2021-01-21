import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import RegisterParent from '@/components/RegisterParent'
import RegisterTutor from '@/components/RegisterTutor'
import Home from '@/components/Home'
import TeacherInfo from '@/components/TeacherInfo'
import TeachersWanted from '@/components/TeachersWanted'
import TeacherDetail from '@/components/TeacherDetail'
import ParentDetail from '@/components/ParentDetail'
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
    },
    {
      path: '/TeacherInfo',
      name: 'TeacherInfo',
      component: TeacherInfo
    },{
      path: '/TeachersWanted',
      name: 'TeachersWanted',
      component: TeachersWanted
    },
    {
      path: '/TeacherDetail',
      name: 'TeacherDetail',
      component: TeacherDetail
    },
    {
      path: '/ParentDetail',
      name: 'ParentDetail',
      component: ParentDetail
    },
  ]
})
