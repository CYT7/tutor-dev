<template>
  <div :data="resultsMap">
    <el-col :span="20" :offset="2"><TeacherHeader></TeacherHeader></el-col>
    <el-col :span="20">
      <div style="margin-top: 20px">
        <el-row>
          <el-col :span="2"><div class="grid-content bg-purple">&nbsp;</div></el-col>
          <el-col :span="22"><div class="grid-content bg-purple-light">
            <el-header height="20px">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/TeacherAppointment' }">老师个人预约列表</el-breadcrumb-item>
                <el-breadcrumb-item>预约详情</el-breadcrumb-item>
              </el-breadcrumb>
            </el-header>
            <el-container>
              <el-container>
                <el-main>
                  <div class="body-border">
                    <el-row style="margin-top: 20px;margin-left:10px;color: #409EFF">
                      <el-col style="font-weight: bold">具体信息</el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">预约id</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.id}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">同学称呼</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.name}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">辅导科目</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.subject}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">总共上几次课</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.frequency}}次</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">上课时间</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.teach_date}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">上课几小时</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.timeHour}}小时</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">课时费用</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.hourPrice}}元</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">预约总价格</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.totalPrice}}元</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">所在城市区域</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{formatAddress(resultsMap.city)}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">授课详情地址</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.address}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">同学联系方式</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.phone}}</div></el-col>
                    </el-row>
                    <el-row v-if="resultsMap.qq?resultsMap.qq:''">
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">同学QQ</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.qq}}</div></el-col>
                    </el-row>
                    <el-row v-if="resultsMap.wechat?resultsMap.wechat:''">
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">同学微信号</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.wechat?'':resultsMap.wechat}}</div></el-col>
                    </el-row>
                    <el-row v-if="resultsMap.content?resultsMap.content:''">
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">评论</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.content}}</div></el-col>
                    </el-row>
                    <el-row v-if="resultsMap.rate?resultsMap.rate:''">
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">评分</div></el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple-light">
                          <el-rate
                            v-model="resultsMap.rate"
                            disabled
                            show-score
                            text-color="#ff9900"
                            show-text>
                          </el-rate>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">预约状态</div></el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple-light">
                          <span v-if="resultsMap.state ==0">老师尚未受理预约</span>
                          <span v-else-if="resultsMap.state ==1">老师已同意预约</span>
                          <span v-else-if="resultsMap.state ==2">预约进行中</span>
                          <span v-else-if="resultsMap.state ==3">预约已完成</span>
                          <span v-else>预约已关闭</span>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <span v-if="resultsMap.state ==0">
                        <el-popconfirm title="确定同意接受此预约吗？" @confirm="handleAgree({id:resultsMap.id})">
                          <el-button slot="reference" class="favorites" type="primary">同意</el-button>
                        </el-popconfirm>
                        <el-popconfirm title="确定不同意接受此预约吗？" @confirm="handleDisagree({id:resultsMap.id})">
                          <el-button slot="reference" class="favorites" type="warning">不同意</el-button>
                        </el-popconfirm>
                      </span>
                      <span v-else-if="resultsMap.state ==1">
                        <el-popconfirm title="确定关闭此预约吗？" @confirm="handleClose({id:resultsMap.id})">
                          <el-button slot="reference" class="favorites" type="danger">关闭</el-button>
                        </el-popconfirm>
                      </span>
                      <span v-else-if="resultsMap.state ==2">
                        <el-popconfirm title="确定你已经完成此预约吗" @confirm="handleComplete({id:resultsMap.id})">
                          <el-button slot="reference" class="favorites" type="success">完成</el-button>
                        </el-popconfirm>
                        <el-popconfirm title="确定关闭此预约吗？" @confirm="handleClose({id:resultsMap.id})">
                          <el-button slot="reference" class="favorites" type="danger">关闭</el-button>
                        </el-popconfirm>
                      </span>
                    </el-row>
                  </div>
                </el-main>
                <el-aside width="30%">
                  <div class="body-border-2" style="margin-top: 20px">
                    <el-row>
                      <el-col :span="2"><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="20"><div class="grid-content bg-purple-light" style="text-align: left; ">
                        <i class="el-icon-sunny">
                          <a style="font-size: 20px">温馨提示</a>
                        </i>
                        <br>
                        <a style="font-size: 15px ;line-height: 25px; margin-left:30px">承诺在见面第一时间出示证件，但是为了确保您的个人信息以及安全，请提高防范</a>
                      </div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                    </el-row>
                  </div>
                </el-aside>
              </el-container>
            </el-container>
          </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </div>
</template>
<script>
  import axios from 'axios'
  import TeacherHeader from "./TeacherHeader";
  import { CodeToText } from 'element-china-area-data'
  const tokens = localStorage.getItem('token');
  export default {
    name: "TeacherAppoint",
    components:{
      TeacherHeader
    },
    data(){
      return{
        resultsMap: [],
        tokens : [],
        id:[]
      }
    },
    created(){
      this.getParams()
    },
    methods:{
      getParams(){
        this.id =this.$route.query.id
        axios.post('http://127.0.0.1:7001/business/appoint/teacherSee',{id:this.id},{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(
          (res) => {
            const data = res.data.data;
            this.resultsMap = data
            console.log(this.resultsMap)
          },
          (err) => {
            console.log(err);
          }
        )
      },
      // 同意预约
      handleAgree(id) {
        this.id = id
        axios.post('http://127.0.0.1:7001/business/appoint/agree',this.id,{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(res => {
          if (res.data.code === 0){
            this.$message({
              title:'成功',
              message:res.data.msg,
              type:'success'
            })
          }else{
            this.$message({
              title:'失败',
              message:res.data.msg,
              type:'error'
            })
          }
          this.getParams()
        })
      },
      // 不同意预约
      handleDisagree(id) {
        axios.post('http://127.0.0.1:7001/business/appoint/disagree',id,{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(res => {
          if (res.data.code === 0){
            this.$message({
              title:'成功',
              message:res.data.msg,
              type:'success'
            })
          }else{
            this.$message({
              title:'失败',
              message:res.data.msg,
              type:'error'
            })
          }
          this.getParams()
        })
        console.log(id)
      },
      // 关闭预约
      handleClose(id) {
        axios.post('http://127.0.0.1:7001/business/appoint/teacherClose',id,{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(res => {
          if (res.data.code === 0){
            this.$message({
              title:'成功',
              message:res.data.msg,
              type:'success'
            })
          }else{
            this.$message({
              title:'失败',
              message:res.data.msg,
              type:'error'
            })
          }
          this.getParams()
        })
        console.log(id)
      },
      // 完成预约
      handleComplete(id) {
        axios.post('http://127.0.0.1:7001/business/appoint/finish',id,{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(res => {
          if (res.data.code === 0){
            this.$message({
              title:'成功',
              message:res.data.msg,
              type:'success'
            })
          }else{
            this.$message({
              title:'失败',
              message:res.data.msg,
              type:'error'
            })
          }
          this.getParams()
        })
        console.log(id)
      },
      formatAddress: function (value) {
        if (value === null) {
          return null
        }
        let area = ''
        switch (value.length) {
          case 1:
            area += CodeToText[value[0]]
            break
          case 2:
            area += CodeToText[value[0]] + '/' + CodeToText[value[1]]
            break
          case 3:
            area += CodeToText[value[0]] + '/' + CodeToText[value[1]] + '/' + CodeToText[value[2]]
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
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .el-header, .el-footer {
    /*background-color: #B3C0D1;*/
    color: #333;
    text-align: center;
    line-height: 40px;
  }
  .el-aside {
    /*background-color: #D3DCE6;*/
    color: #333;
    /* text-align: left;*/
    line-height: 40px;

  }

  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: left;
    line-height: 10px;
  }
  /*去掉连接下滑线*/
  .router-link {
    text-decoration: none;
    color: aliceblue;
  }
  .router-link2 {
    text-decoration: none;
    color: black;
  }
  .top-border{
    border:1px solid #B3C0D1;
    border-radius: 4px;
    margin-top: 2px;
    background-color: #F2F6FC;
  }
  .top-text{
    margin-top: 20px;
    margin-left: 10px;
    font-family: '微软雅黑';
    font-size: 20px;
    font-weight: bold
  }
  .body-border{
    border:1px solid #B3C0D1;
    border-radius: 4px;
    /*margin-top: 2px*/
  }
  .body-border-2{
    border:1px solid #B3C0D1;
    border-radius: 4px;
    margin-top: 2px;
    background-color: #F2F6FC;
  }
  .favorites{
    margin-top: 8px;
    margin-bottom: 8px;
    margin-right: 40px;
    float: right
  }
</style>
