<template>
  <el-row :gutter="20">
    <el-col :span="20" :offset="2">
      <Header></Header>
    </el-col>
    <div style="margin-top:8%;margin-left:25%;" align="center" class="app-container">
      <el-form ref="form" :model="resultsMap" label-width="auto" style="float: left;">
        <el-form-item><h2 style="margin-left:-20%">老师信息</h2></el-form-item>
        <el-form-item label="老师ID">{{resultsMap.id}}</el-form-item>
        <el-form-item label="成功次数">{{resultsMap.totalSuccess}}次</el-form-item>
        <el-form-item label="教学经验">{{resultsMap.experience}}年</el-form-item>
        <el-form-item label="年龄">{{resultsMap.age}}岁</el-form-item>
        <el-form-item label="擅长科目">{{resultsMap.goodAt}}</el-form-item>
        <el-form-item label="课时费用">{{resultsMap.hourPrice}}</el-form-item>
        <el-form-item label="在读/毕业院校">{{resultsMap.school}}</el-form-item>
        <el-form-item label="所在城市">{{resultsMap.city}}</el-form-item>
      </el-form>
    </div>
  </el-row>
</template>
<script>
  import Header from "./Header"
  import axios from 'axios'
  const Token = localStorage.getItem('token');
  export default {
    name: "TeacherCenter",
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
        axios.post('http://127.0.0.1:7001/business/teacher/information',{},{
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
