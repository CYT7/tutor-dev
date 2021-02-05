<template>
  <div>
    <el-col :span="20" :offset="2"><parent-header></parent-header></el-col>
    <el-col :span="20">
      <div style="margin-top: 20px">
      <el-row>
        <el-col :span="2"><div class="grid-content bg-purple">&nbsp;</div></el-col>
        <el-col :span="22">
          <div class="grid-content bg-purple-light">
            <el-header height="20px">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">家教网首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/TeachersWanted' }">需求信息库</el-breadcrumb-item>
                <el-breadcrumb-item>需求详情</el-breadcrumb-item>
              </el-breadcrumb>
            </el-header>
            <el-container>
              <el-container>
                <el-main>
                  <div class="body-border">
                    <el-row style="margin-top: 20px;margin-left:10px;color: #409EFF">
                      <el-col style="font-weight: bold">具体要求</el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">同学称呼</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.nickName}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">同学性别</div></el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple-light">
                          <span v-if="parentList.gender ==0">保密</span>
                          <span v-else-if="parentList.gender ==1">男</span>
                          <span v-else>女</span>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">辅导科目</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.subject}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">教师性别要求</div></el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple-light">
                          <span v-if="parentList.teacherGender ==0">不限</span>
                          <span v-else-if="parentList.teacherGender ==1">男</span>
                          <span v-else>女</span>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">总共上几次课</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.frequency}}次</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">上课时间</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.teach_date}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">上课几小时</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.timeHour}}小时</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">课时费用</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.hourPrice /100}}元</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">需求总价格</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.totalPrice /100}}元</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">所在城市区域</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{formatAddress(parentList.city)}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">详情地址</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.address}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-popconfirm title="确定应聘需求嘛？" @confirm="handleApply({id:parentList.id})">
                        <el-button slot="reference" class="favorites" type="primary">应聘</el-button>
                      </el-popconfirm>
                    </el-row>
                  </div>
                </el-main>
                <el-aside width="30%">
                  <div class="body-border-2" style="margin-top: 20px">
                    <el-row>
                      <el-col :span="2"><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="20"><div class="grid-content bg-purple-light" style="text-align: left; ">
                        <i class="el-icon-sunny">
                          <a style="font-size: 20px">应聘提示</a>
                        </i>
                        <br>
                        <a style="font-size: 15px ;line-height: 25px; margin-left:30px">家教只能查看部分的需求信息而不能查看所有信息，家教如果应聘成功，会在个人中心查看到该需求的所有信息</a>
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
  import ParentHeader from "./ParentHeader";
  const tokens = localStorage.getItem('token');
  import { CodeToText } from 'element-china-area-data'
  export default {
    name: "ParentDetail",
    components:{
      ParentHeader
    },
    data(){
      return{
        parentList: [],
        tokens : [],
      }
    },
    created(){
      this.getParams()
    },
    methods:{
      getParams(){
        this.id =this.$route.query.id
        axios.post('http://127.0.0.1:7001/business/need/information',{id:this.id},{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(
          (res) => {
            const data = res.data.data;
            this.parentList = data
            console.log(this.parentList)
          },
          (err) => {
            console.log(err);
          }
        )
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
      handleApply(id) {
        axios.post('http://127.0.0.1:7001/business/need/apply',id,{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(res =>{
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
        })
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
