<template>
  <el-row :gutter="20">
    <el-col :span="20" :offset="2"><TeachersWantedHeader></TeachersWantedHeader></el-col>
    <div style="margin-top: 10px" align="center">
      <el-table
        :data="hire_teacher_Data.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        style="width: 82%"
        height="500"
      ><!--height可实现固定表头的表格-->
        <el-table-column align="center" label="需求ID" prop="id"></el-table-column>
        <el-table-column align="center" label="家教要求" prop="subject"></el-table-column>
        <el-table-column align="center" label="需求发布时间" prop="createTime" :formatter="formatDate"></el-table-column>
        <el-table-column align="center" label="学生称呼" prop="nickName"> </el-table-column>
        <!--点击查看，跳转到招聘页面详情-->
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <router-link :to="`/parentDetail/${scope.row.id}`"><!--传俩id-->
              <el-button type="text" size="small" icon="el-icon-thumb">查看</el-button>
            </router-link>
          </template>
        </el-table-column>
        <!--搜索框（根据招聘主题即科目筛选招聘信息）-->
        <el-table-column align="right" width="190">
          <template slot="header" slot-scope="scope">
            <el-input prefix-icon="el-icon-search" v-model="search" size="mini" placeholder="输入招聘科目进行筛选"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-row>
</template>

<script>
  import TeachersWantedHeader from "./TeachersWantedHeader";
  import axios from 'axios'
  const tokens = localStorage.getItem('token');
  export default {
    name: "TeachersWanted",
    data() {
      return {
        hire_teacher_Data: [],
        search: '',
        tokens : []
      }
    },
    components: {
      TeachersWantedHeader
    },
    mounted() {
      axios.get('http://127.0.0.1:7001/business/need/list',{
        headers:{
          authorization:`Bearer ${tokens}`
        }}).then(
          (resp) => {
            this.hire_teacher_Data = resp.data.data
            //数据拿到，ok!
            console.log(this.hire_teacher_Data)
          },
          (err) => {
            console.log(err);
          }
        )
    },
    methods:{
      formatDate(row, column) {
        const date = new Date(parseInt(row.createTime) * 1000)
        const Y = date.getFullYear() + '-'
        const M =
          date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1) + '-'
            : date.getMonth() + 1 + '-'
        const D =
          date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
        const h =
          date.getHours() < 10
            ? '0' + date.getHours() + ':'
            : date.getHours() + ':'
        const m =
          date.getMinutes() < 10
            ? '0' + date.getMinutes() + ':'
            : date.getMinutes() + ':'
        const s =
          date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return Y + M + D + h + m + s
      }
    }
  }
</script>
<style scoped>
</style>
