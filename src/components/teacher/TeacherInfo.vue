<template>
  <el-row :gutter="20">
    <el-col :span="20" :offset="2">
      <TeacherInfoHeader></TeacherInfoHeader>
    </el-col>
    <div style="margin-top: 10px" align="center">
      <el-table :data="teacherData.filter(data => !search || data.goodAt.toLowerCase().includes(search.toLowerCase()))" style="width: 80%" height="500"><!--height可实现固定表头的表格-->
        <el-table-column type="index" width="50" align="center" />
        <el-table-column align="center" label="家教 ID"  prop="id"></el-table-column>
        <el-table-column align="center" label="教授科目" prop="goodAt"></el-table-column>
        <el-table-column align="center" label="在读/毕业院校" prop="school"></el-table-column>
        <el-table-column align="center" label="成功次数" prop="totalSuccess"></el-table-column>
        <el-table-column align="center" label="所在城市" prop="city" :formatter="formatAddress"></el-table-column>
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :hide-on-single-page="true"
        :page-size="list.per_page"
        layout="total, prev, pager, next, jumper"
        :page-count="list.totals"
      ></el-pagination>
    </div>
  </el-row>
</template>
<script>
  import TeacherInfoHeader from "./TeacherInfoHeader";
  import { CodeToText } from 'element-china-area-data'
  import axios from 'axios'
  const tokens = localStorage.getItem('token');
  export default {
    name: "TeacherInfo",
    data() {
      return {
        page:1, //初始页
        teacherData: [],
        list:[],
        search: '',
        tokens : []
      }
    },
    components:{
      TeacherInfoHeader
    },
    created(){
      this.getList()
    },
    methods:{
      getList(){
        axios.get('http://127.0.0.1:7001/business/teacher/list',{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(
          (res) => {
            this.teacherData = res.data.data
            this.list = res.data
            if (res.data.code !== 0){
              this.$message({
                message: res.data.msg || 'Error',
                type: 'error',
                duration: 3 * 1000
              })
            }
          },
          (err) => {
            console.log(err);
          }
        )
      },
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange: function(val){
        this.page = val
        axios.get('http://127.0.0.1:7001/business/teacher/list?page='+this.page,{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(
          (res) => {
            this.teacherData = res.data.data
            this.list = res.data
            console.log(this.teacherData)
          },
          (err) => {
            console.log(err);
          }
        )
      },
      formatAddress(row) {
        if (row.city === null) {
          return null
        }
        let area = ''
        switch (row.city.length) {
          case 1:
            area += CodeToText[row.city[0]]
            break
          case 2:
            area += CodeToText[row.city[0]] + '/' + CodeToText[row.city[1]]
            break
          case 3:
            area += CodeToText[row.city[0]] + '/' + CodeToText[row.city[1]] + '/' + CodeToText[row.city[2]]
            break
          default:
            break
        }
        return area
      },

    }

  }
</script>
<style scoped>
</style>
