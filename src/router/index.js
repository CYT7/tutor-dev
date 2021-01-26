import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/home/Login'
import RegisterParent from '@/components/home/RegisterParent'
import RegisterTutor from '@/components/home/RegisterTutor'
import Home from '@/components/home/Home'
import TeacherInfo from '@/components/teacher/TeacherInfo'
import TeachersWanted from '@/components/teacher/TeachersWanted'
import TeacherDetail from '@/components/detail/TeacherDetail'
import ParentDetail from '@/components/detail/ParentDetail'
import PersonalCenter from '@/components/personal/PersonalCenter'
import PersonalNeeds from '@/components/personal/PersonalNeeds'
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
      path: '/ParentDetail',
      name: 'ParentDetail',
      component: ParentDetail
    },
    {
      path: '/TeacherDetail',
      name: 'TeacherDetail',
      component: TeacherDetail
    },
    {
      path: '/PersonalCenter',
      name: 'PersonalCenter',
      component: PersonalCenter
    },
    {
      path: '/PersonalNeeds',
      name: 'PersonalNeeds',
      component: PersonalNeeds
    },
  ]
})
