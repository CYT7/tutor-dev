<template>
  <el-row :gutter="20">
    <el-col :span="20" :offset="2">
      <Header></Header>
    </el-col>
    <div style="margin-top:8%;margin-left:35%;" align="center" class="app-container">
      <el-form ref="form" :model="resultsMap" label-width="auto" style="float: left;">
        <el-form-item><h2 style="margin-left:-20%">个人信息</h2></el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :http-request="upLoad"
            :before-upload="beforeAvatarUpload">
            <img v-if="resultsMap.image_url !== null" :src="resultsMap.image_url" class="avatar" fit="cover">
            <img v-else class="el-icon-plus avatar-uploader-icon" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
          </el-upload>
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
        tokens : [],
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
      upLoad(file) {
        const formData = new FormData();
        formData.append('file',file.file);
        console.log(file)
        axios.post('http://127.0.0.1:7001/business/user/saveAvatar',formData,{
          headers:{
            authorization:`Bearer ${Token}`
          }
        }).then((res) => {
          console.log(res);
          if (res.data.code ===0){
            this.$message({
              type:"success",
              message:res.data.msg
            })
          }else {
            this.$message({
              type:"warning",
              message:res.data.msg
            })
          }
          },
          (err) => {
            console.log(err);
          }
        )
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    },
  }
</script>
<style scoped>
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>
