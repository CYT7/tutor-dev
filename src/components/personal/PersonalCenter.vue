<template>
  <el-row :gutter="20">
    <el-col :span="20" :offset="2">
      <Header></Header>
    </el-col>
    <div style="margin-top:8%;margin-left:25%;" align="center" class="app-container">
      <el-form ref="form" :model="resultsMap" label-width="auto" style="float: left;">
        <el-form-item><h2 style="margin-left:-20%">个人信息</h2></el-form-item>
        <el-form-item label="头像">
          <span v-if="resultsMap.image_url !== null"><el-image style="height: 100px;width:100px" :src="resultsMap.image_url" fit="cover" /></span>
          <span v-else><el-image style="height: 100px;width:100px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-image></span>
        </el-form-item>
        <el-form-item label="用户ID">{{resultsMap.id}}</el-form-item>
        <el-form-item label="用户昵称">{{resultsMap.nickName}}</el-form-item>
        <el-form-item label="手机号码">{{resultsMap.phone}}</el-form-item>
        <el-form-item label="邮箱">{{resultsMap.email}}</el-form-item>
        <el-form-item label="QQ号">{{resultsMap.qq}}</el-form-item>
        <el-form-item label="微信号">{{resultsMap.wechat}}</el-form-item>
        <el-form-item label="性别">
          <div class="grid-content bg-purple-light">
            <span v-if="resultsMap.gender ==0">不限</span>
            <span v-else-if="resultsMap.gender ==1">男</span>
            <span v-else>女</span>
          </div>
        </el-form-item>
        <el-form-item label="地址">{{resultsMap.address}}</el-form-item>
      </el-form>
    </div>
  </el-row>
</template>
<script>
  import Header from "./Header"
  import axios from 'axios'
  const Token = localStorage.getItem('token');
  export default {
    name: "PersonalCenter",
    data() {
      return {
        resultsMap: {},
        tokens : []
      }
    },
    components: {
      Header
    },
    created() {
      this.getList();
    },
    methods:{
      getList(){
        axios.post('http://127.0.0.1:7001/business/user/information',{},{
          headers:{
            authorization:`Bearer ${Token}`
          }
        }).then((res) => {
            this.resultsMap = res.data.data
            console.log(this.resultsMap)
            },
            (err) => {
              console.log(err);
            }
          )
      },
    },
  }
</script>
<style scoped>
</style>
