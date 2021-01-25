<template>
  <el-row :gutter="20">
    <el-col :span="20" :offset="2">
      <Header></Header>
    </el-col>
    <div style="margin-top: 10px;margin-left:25%;width:20%;" align="center">
      <h2 style="margin-left:15%">个人信息</h2>
      <el-form ref="form" :model="resultsMap" label-width="auto">
        <el-form-item label="用户ID"><el-input v-model="resultsMap.id" disabled></el-input></el-form-item>
        <el-form-item label="用户昵称"><el-input v-model="resultsMap.nickName" disabled></el-input></el-form-item>
        <el-form-item label="手机号码"><el-input v-model="resultsMap.phone" disabled></el-input></el-form-item>
        <el-form-item label="邮箱"><el-input v-model="resultsMap.email" disabled></el-input></el-form-item>
        <el-form-item label="QQ"><el-input v-model="resultsMap.qq" disabled></el-input></el-form-item>
        <el-form-item label="微信号"><el-input v-model="resultsMap.wechat" disabled></el-input></el-form-item>
        <el-form-item label="地址"><el-input v-model="resultsMap.address" disabled></el-input></el-form-item>
        <el-form-item label="头像"><el-image style="height: 50px;width:50px" :src="resultsMap.image_url" fit="cover" /></el-form-item>
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
        search: '',
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
      }
    },
  }
</script>
<style scoped>
</style>
