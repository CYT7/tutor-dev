<template>
  <el-row :gutter="20">
    <el-col :span="20" :offset="2"><Header></Header></el-col>
    <div style="margin-top: 10px" align="center">
      <el-table
        :data="resultsMap.filter(data => !search || data.subject.toLowerCase().includes(search.toLowerCase()))"
        style="width: 82%"
        height="500"
      ><!--height可实现固定表头的表格-->
        <el-table-column type="index" width="50" align="center" />
        <el-table-column align="center" label="学生称呼" prop="nickName"> </el-table-column>
        <el-table-column align="center" label="授课科目" prop="subject"></el-table-column>
        <el-table-column align="center" label="所在城市区域" prop="address"></el-table-column>
        <el-table-column align="center" label="需求总报价(元)" prop="totalPrice"></el-table-column>
        <el-table-column align="center" label="需求发布时间" prop="createTime" :formatter="formatDate"></el-table-column>
        <!--点击查看，跳转到招聘页面详情-->
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <router-link :to="{path:`/parentDetail`,name:`ParentDetail`,params:{id:scope.row.id},query:{id:scope.row.id}}">
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
  import Header from "./Header"
  import axios from 'axios'
  const Token = localStorage.getItem('token');
  export default {
    name: "PersonalNeeds",
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
        axios.get('http://127.0.0.1:7001/business/need/list',{
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
    },
  }
</script>

<style scoped>

</style>
