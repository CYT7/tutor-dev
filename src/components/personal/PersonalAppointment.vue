<template>
  <el-row :gutter="20">
    <el-col :span="20" :offset="2"><Header></Header></el-col>
    <div style="margin-top: 10px" align="center">
      <el-table :data="resultsMap" style="width: 82%" height="500"><!--height可实现固定表头的表格-->
        <el-table-column type="index" width="50" align="center" />
        <el-table-column align="center" label="预约id" prop="id"> </el-table-column>
        <el-table-column align="center" label="学生称呼" prop="name"> </el-table-column>
        <el-table-column align="center" label="授课科目" prop="subject"></el-table-column>
        <el-table-column align="center" label="所在城市区域" prop="address" :formatter="formatAddress" ></el-table-column>
        <el-table-column align="center" label="预约总报价(元)" prop="totalPrice"></el-table-column>
        <el-table-column align="center" label="预约发布时间" prop="createTime" :formatter="formatDate"></el-table-column>
        <el-table-column label="预约状态" prop="state" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.state === 0" style="font-weight: bolder">未回应预约</div>
            <div v-else-if="scope.row.state === 1" style="color: #409EFF; font-weight: bolder">已预约 待付款</div>
            <div v-else-if="scope.row.state === 2" style="color: #E6A23C; font-weight: bolder">进行中</div>
            <div v-else-if="scope.row.state === 3" style="color: #67C23A; font-weight: bolder">已完成</div>
            <div v-else style="color: #F56C6C; font-weight: bolder">已关闭</div>
          </template>
        </el-table-column>
        <!--点击查看，跳转到预约页面详情-->
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <router-link :to="{path:`/AppointDetail`,name:`AppointDetail`,params:{id:scope.row.id},query:{id:scope.row.id}}">
              <el-button type="text" size="small" icon="el-icon-thumb">查看</el-button>
            </router-link>
            <span v-if="scope.row.state == 1">
              <el-popconfirm title="确定支付此预约吗？" @confirm="handlePay({id:scope.row.id})">
                <el-button slot="reference" type="text" size="small" icon="el-icon-thumb">支付</el-button>
              </el-popconfirm>
              <el-popconfirm title="确定关闭此预约吗？" @confirm="handleClose({id:scope.row.id})">
                <el-button slot="reference" type="text" size="small" icon="el-icon-thumb">关闭</el-button>
              </el-popconfirm>
            </span>
            <span v-else-if="scope.row.state != 3">
              <el-popconfirm title="确定关闭此预约吗？" @confirm="handleClose({id:scope.row.id})">
                <el-button slot="reference" type="text" size="small" icon="el-icon-thumb">关闭</el-button>
              </el-popconfirm>
            </span>
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
  import Header from "./Header";
  import axios from 'axios'
  import { CodeToText } from 'element-china-area-data'
  const tokens = localStorage.getItem('token');
  export default {
    name: "PersonalAppointment",
    data() {
      return {
        page:1, //初始页
        resultsMap: [],
        list:[],
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
        axios.get('http://127.0.0.1:7001/business/appoint/userList',{
          headers:{
            authorization:`Bearer ${tokens}`
          }}).then(
          (res) => {
            this.resultsMap = res.data.data
            this.list = res.data
            console.log(this.resultsMap)
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
        axios.get('http://127.0.0.1:7001/business/appoint/userList?page='+this.page,{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(
          (res) => {
            this.resultsMap = res.data.data
            this.list = res.data
            console.log(this.resultsMap)
          },
          (err) => {
            console.log(err);
          }
        )
      },
      // 支付预约
      handlePay(id) {
        axios.post('http://127.0.0.1:7001/business/appoint/pay',id,{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(res => {
          console.log(res)
        })
        console.log(id)
      },
      // 关闭预约
      handleClose(id) {
        axios.post('http://127.0.0.1:7001/business/appoint/userClose',id,{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(res => {
          console.log(res)
        })
        console.log(id)
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
