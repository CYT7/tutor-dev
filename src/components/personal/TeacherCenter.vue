<template>
  <el-row :gutter="20">
    <el-col :span="20" :offset="2">
      <Header></Header>
    </el-col>
    <div style="margin-top:8%;margin-left:15%;width:60%;" align="center" class="app-container">
      <h2 style="margin-left:8%">老师信息</h2>
      <el-form ref="form" :model="resultsMap" label-width="auto">
        <el-form-item label="老师ID"><el-input v-model="resultsMap.id" disabled></el-input></el-form-item>
        <el-form-item label="成功次数"><el-input v-model="resultsMap.totalSuccess" disabled></el-input></el-form-item>
        <el-form-item label="教学经验"><el-input v-model="resultsMap.experience" disabled></el-input></el-form-item>
        <el-form-item label="年龄"><el-input v-model="resultsMap.age" disabled></el-input></el-form-item>
        <el-form-item label="擅长科目"><el-input v-model="resultsMap.goodAt" disabled></el-input></el-form-item>
        <el-form-item label="课时费用"><el-input v-model="resultsMap.hourPrice" disabled></el-input></el-form-item>
        <el-form-item label="在读/毕业院校"><el-input v-model="resultsMap.school" disabled></el-input></el-form-item>
        <el-form-item label="所在城市"><el-input v-model="resultsMap.city" disabled></el-input></el-form-item>
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
