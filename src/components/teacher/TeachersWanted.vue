<template>
  <el-row :gutter="20">
    <el-col :span="20" :offset="2"><TeachersWantedHeader></TeachersWantedHeader></el-col>
    <div style="margin-top: 10px" align="center">
      <el-table :data="needData.filter(data => !search || data.subject.toLowerCase().includes(search.toLowerCase()))
      .slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 82%" height="500">
        <!--height可实现固定表头的表格-->
        <el-table-column type="index" width="50" align="center"/>
        <el-table-column align="center" label="学生称呼" prop="nickName"> </el-table-column>
        <el-table-column align="center" label="授课科目" prop="subject"></el-table-column>
        <el-table-column align="center" label="所在城市区域" prop="address" :formatter="formatAddress"></el-table-column>
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="needData.length">
      </el-pagination>
    </div>
  </el-row>
</template>
<script>
  import TeachersWantedHeader from "./TeachersWantedHeader";
  import axios from 'axios'
  import { CodeToText } from 'element-china-area-data'
  const tokens = localStorage.getItem('token');
  export default {
    name: "TeachersWanted",
    data() {
      return {
        currentPage:1, //初始页
        pagesize:10,//每页的数据
        needData: [],
        search: '',
        tokens : []
      }
    },
    components: {
      TeachersWantedHeader
    },
    created(){
      this.getList()
    },
    methods:{
      getList(){
        axios.get('http://127.0.0.1:7001/business/need/list',{
          headers:{
            authorization:`Bearer ${tokens}`
          }}).then(
          (res) => {
            this.needData = res.data.data
            console.log(this.needData)
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
