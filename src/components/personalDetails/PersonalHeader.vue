<template>
  <div style="margin-top: 0px">
    <div style="width: 580px;height: 60px">
      <img src="../../assets/styles/images/logo.png" class="logo">
    </div>
    <div class="menu">
      <el-menu :default-active="activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect"
               text-color="#303133"
               active-text-color="#409eff">
        <el-menu-item index="1">
          <router-link tag="div" :to="{name: 'Home'}">
            <i class="el-icon-s-home"></i>首页
          </router-link>
        </el-menu-item>
        <el-menu-item index="2" >
          <router-link tag="div" :to="{path:'/TeacherInfo'}">
            <i class="el-icon-s-home"></i>家教信息库
          </router-link>
        </el-menu-item>
        <el-menu-item index="3" >
          <router-link tag="div" :to="{path:'/TeachersWanted'}">
            <i class="el-icon-s-operation"></i>需求信息库
          </router-link>
        </el-menu-item>
        <el-submenu index="4">
          <template slot="title" ><i class="el-icon-user-solid"></i><span>个人中心</span></template>
          <el-menu-item index="4-1"  style="text-align: center">
            <router-link tag="div" :to="{path:'/PersonalCenter'}">
              <i class="el-icon-s-custom"></i><span style="font-size: 16px">个人信息</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="4-2" style="text-align: center">
            <router-link tag="div" :to="{path:'/PersonalNeeds'}">
              <i class="el-icon-s-order"></i><span style="font-size: 16px">个人需求列表</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="4-3" style="text-align: center">
            <router-link tag="div" :to="{path:'/PersonalAppointment'}">
              <i class="el-icon-tickets"></i><span style="font-size: 16px">个人预约列表</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="4-3" style="text-align: center">
            <router-link tag="div" :to="{path:'/TeacherCenter'}">
              <i class="el-icon-s-custom"></i><span style="font-size: 16px">老师个人中心列表</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="4-3" style="text-align: center">
            <router-link tag="div" :to="{path:'/TeacherNeeds'}">
              <i class="el-icon-s-order"></i><span style="font-size: 16px">老师个人需求列表</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="4-3" style="text-align: center">
            <router-link tag="div" :to="{path:'/TeacherAppointment'}">
              <i class="el-icon-tickets"></i><span style="font-size: 16px">老师个人预约列表</span>
            </router-link>
          </el-menu-item>
          <el-menu-item index="4-4" style="text-align: center">
            <el-dropdown-item @click.native="logout">
              <i class="el-icon-close"></i><span style="font-size: 16px">退出</span>
            </el-dropdown-item>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
  export default {
    name: "PersonalHeader",
    data() {
      return {
        activeIndex: '4',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      async logout(){
        localStorage.clear()
        this.$router.push('/')
        this.$message({
          message: '退出登录成功' || 'Success',
          type: 'Success',
          duration: 3 * 1000
        })
      }
    }
  }
</script>
<style scoped>
  a{
    text-decoration: none;
  }
  *{
    font-size: 18px;
  }
  .logo,.block{
    display: flex;
    float: left;
  }
  .logo{
    width: 160px;
  }
  .block{
    width: 150px;
    margin-left: 20px;
  }
  .search{
    float: right;
    display: inline-block;
    width: 200px;
    margin-right: 20px;
  }
  .searchinput{
    display: inline;
  }
  .searchbutton{
    display: inline;
    position: absolute;
    margin-left: 10px
  }
</style>
