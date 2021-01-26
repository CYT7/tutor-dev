<template>
  <el-row :gutter="20">
    <el-col :span="20" :offset="2"><Header></Header></el-col>
    <div style="margin-top: 10px" align="center">
      <el-table :data="resultsMap" style="width: 82%" height="500"><!--height可实现固定表头的表格-->
        <el-table-column type="index" width="50" align="center" />
        <el-table-column align="center" label="预约id" prop="id"> </el-table-column>
        <el-table-column align="center" label="学生称呼" prop="name"> </el-table-column>
        <el-table-column align="center" label="授课科目" prop="subject"></el-table-column>
        <el-table-column align="center" label="所在城市区域" prop="address"></el-table-column>
        <el-table-column align="center" label="预约总报价(元)" prop="totalPrice"></el-table-column>
        <el-table-column align="center" label="预约发布时间" prop="createTime" :formatter="formatDate"></el-table-column>
        <!--点击查看，跳转到预约页面详情-->
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <router-link :to="{path:`/parentDetail`,name:`ParentDetail`,params:{id:scope.row.id},query:{id:scope.row.id}}">
              <el-button type="text" size="small" icon="el-icon-thumb">查看详情</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-row>
</template>
<script>
  import Header from "./Header";
  import axios from 'axios'
  const tokens = localStorage.getItem('token');
  export default {
    name: "TeacherAppointment",
    data() {
      return {
        resultsMap: [],
        search: '',
        tokens : []
      }
    },
    components: {
      Header
    },
    mounted() {
      axios.get('http://127.0.0.1:7001/business/appoint/userList',{
        headers:{
          authorization:`Bearer ${tokens}`
        }}).then(
        (resp) => {
          this.resultsMap = resp.data.data
          //数据拿到，ok!
          console.log(this.resultsMap)
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
