<template>
  <el-row :gutter="20">
    <el-col :span="20" :offset="2"><Header></Header></el-col>
    <div style="margin-top: 10px" align="center">
      <el-table :data="resultsMap.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 82%" height="500"><!--height可实现固定表头的表格-->
        <el-table-column type="index" width="50" align="center" />
        <el-table-column align="center" label="需求id" prop="id"> </el-table-column>
        <el-table-column align="center" label="学生称呼" prop="nickName"> </el-table-column>
        <el-table-column align="center" label="授课科目" prop="subject"></el-table-column>
        <el-table-column align="center" label="所在城市区域" prop="address" :formatter="formatAddress" ></el-table-column>
        <el-table-column align="center" label="需求总报价(元)" prop="totalPrice"></el-table-column>
        <el-table-column align="center" label="需求发布时间" prop="createTime" :formatter="formatDate"></el-table-column>
        <el-table-column label="需求状态" prop="state" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.state === 1" style="font-weight: bolder">审核中</div>
            <div v-else-if="scope.row.state === 2" style="color: #F56C6C; font-weight: bolder">审核不通过</div>
            <div v-else-if="scope.row.state === 3" style="color: #67C23A; font-weight: bolder">审核通过</div>
            <div v-else-if="scope.row.state === 4" style="color: #E6A23C; font-weight: bolder">已选定</div>
            <div v-else-if="scope.row.state === 5" style="color: #409EFF; font-weight: bolder">已完成</div>
            <div v-else style="color: #F56C6C; font-weight: bolder">已关闭</div>
          </template>
        </el-table-column>
        <!--点击查看，跳转到预约页面详情-->
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <router-link :to="{path:`/TeacherNeed`,name:`TeacherNeed`,params:{id:scope.row.id},query:{id:scope.row.id}}">
              <el-button type="text" size="small" icon="el-icon-thumb">查看详情</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="resultsMap.length">
      </el-pagination>
    </div>
  </el-row>
</template>
<script>
  import Header from "./Header";
  import axios from 'axios';
  import { CodeToText } from 'element-china-area-data'
  const tokens = localStorage.getItem('token');
  export default {
    name: "TeacherNeeds",
    data() {
      return {
        currentPage:1, //初始页
        pagesize:10,//每页的数据
        resultsMap: [],
        search: '',
        tokens : []
      }
    },
    components: {
      Header
    },
    created(){
      this.getList()
    },
    methods:{
      getList(){
        axios.get('http://127.0.0.1:7001/business/need/Userlist',{
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
      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
        this.pagesize = size;
        console.log(this.pagesize)  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        console.log(this.currentPage)  //点击第几页
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
      },
      formatAddress(row) {
        if (row.address === null) {
          return null
        }
        let area = ''
        switch (row.address.length) {
          case 1:
            area += CodeToText[row.address[0]]
            break
          case 2:
            area += CodeToText[row.address[0]] + '/' + CodeToText[row.address[1]]
            break
          case 3:
            area += CodeToText[row.address[0]] + '/' + CodeToText[row.address[1]] + '/' + CodeToText[row.address[2]]
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
