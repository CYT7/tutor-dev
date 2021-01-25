<template>
  <el-row :gutter="20">
    <el-col :span="20" :offset="2">
      <Header></Header>
    </el-col>
    <div style="margin-top: 10px;margin-left:25%;width:20%;" align="center">
      <el-form ref="form" :model="resultsMap" label-width="auto">
        <el-form-item label="用户ID"><el-input v-model="resultsMap.id" disabled></el-input></el-form-item>
        <el-form-item label="用户昵称"><el-input v-model="resultsMap.nickName" disabled></el-input></el-form-item>
        <el-form-item label="旧密码" :rules="{ required: true, message: '旧密码不能为空', trigger: 'blur' }">
          <el-input placeholder="请输入正在使用的密码" v-model="oldPassword" show-password clearable></el-input>
        </el-form-item>
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
