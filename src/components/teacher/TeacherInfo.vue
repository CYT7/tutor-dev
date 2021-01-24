<template>
  <el-row :gutter="20">
    <el-col :span="20" :offset="2">
      <TeacherInfoHeader></TeacherInfoHeader>
    </el-col>
    <div style="margin-top: 10px" align="center">
      <el-table
        :data="teacher_jian_Data.filter(data => !search || data.goodAt.toLowerCase().includes(search.toLowerCase()))"
        style="width: 82%"
        height="500"
      ><!--height可实现固定表头的表格-->
        <el-table-column align="center" label="家教 ID"  prop="id"></el-table-column>
        <el-table-column align="center" label="教授科目" prop="goodAt"></el-table-column>
        <el-table-column align="center" label="教学经验(年)" prop="experience"></el-table-column>
        <el-table-column align="center" label="成功次数" prop="totalSuccess"></el-table-column>
        <el-table-column align="center" label="在读/毕业院校" prop="school"></el-table-column>
        <el-table-column align="center" label="年龄" prop="age"></el-table-column>
        <el-table-column align="center" label="授课费用(时)" prop="hourPrice"></el-table-column>
        <el-table-column align="center" label="所在城市" prop="city"></el-table-column>
        <!--点击查看，跳转到家教页面详情-->
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <router-link :to="{path:`/TeacherDetail`,name:`TeacherDetail`,params:{id:scope.row.id},query:{id:scope.row.id}}">
              <el-button type="text" size="small" icon="el-icon-thumb">查看</el-button>
            </router-link>
          </template>
        </el-table-column>
        <!--搜索框（根据教授科目筛选家教信息）-->
        <el-table-column align="right" width="190">
          <template slot="header" slot-scope="scope">
            <el-input prefix-icon="el-icon-search" v-model="search" size="mini" placeholder="输入教授科目进行筛选"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-row>
</template>
<script>
  import TeacherInfoHeader from "./TeacherInfoHeader";
  import axios from 'axios'
  const tokens = localStorage.getItem('token');
  export default {
    name: "TeacherInfo",
    data() {
      return {
        teacher_jian_Data: [],
        search: '',
        tokens : []
      }
    },
    components:{
      TeacherInfoHeader
    },
    mounted() {
      axios.get('http://127.0.0.1:7001/business/teacher/list',{
        headers:{
          authorization:`Bearer ${tokens}`
        }
      })
        .then(
          (res) => {
            this.teacher_jian_Data = res.data.data
            //数据拿到，ok!
            console.log(this.teacher_jian_Data)
          },
          (err) => {
            console.log(err);
          }
        )
    }
  }
</script>
<style scoped>
</style>
