<template>
  <div>
    <el-col :span="20" :offset="2"><PersonalHeader></PersonalHeader></el-col>
    <el-col :span="20">
      <div style="margin-top: 20px">
        <el-row>
          <el-col :span="2"><div class="grid-content bg-purple">&nbsp;</div></el-col>
          <el-col :span="22"><div class="grid-content bg-purple-light">
            <el-header height="20px">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/PersonalAppointment' }">个人预约列表</el-breadcrumb-item>
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
                      <el-col :span="6"><div class="grid-content bg-purple">老师id</div></el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple-light">
                          <router-link :to="{path:`/TeacherDetail`,name:`TeacherDetail`,params:{id:resultsMap.teacher.id},query:{id:resultsMap.teacher.id}}" class="router-link">
                            {{resultsMap.teacher.id}}
                          </router-link>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">老师姓名</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.teacher.realName}}</div></el-col>
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
                      <el-col :span="6"><div class="grid-content bg-purple">你的联系方式</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.phone}}</div></el-col>
                    </el-row>
                    <el-row v-if="resultsMap.qq?resultsMap.qq:''">
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">你的QQ</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.qq}}</div></el-col>
                    </el-row>
                    <el-row v-if="resultsMap.wechat?resultsMap.wechat:''">
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">你的微信号</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.wechat?'':resultsMap.wechat}}</div></el-col>
                    </el-row>
                    <el-row v-if="resultsMap.content?resultsMap.content:''">
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">你的评论</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.content}}</div></el-col>
                    </el-row>
                    <el-row v-if="resultsMap.rate?resultsMap.rate:''">
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">老师评分</div></el-col>
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
                          <span v-if="resultsMap.state ===0">老师尚未受理预约</span>
                          <span v-else-if="resultsMap.state ===1">老师已同意预约</span>
                          <span v-else-if="resultsMap.state ===2">预约进行中</span>
                          <span v-else-if="resultsMap.state ===3">预约已完成</span>
                          <span v-else>预约已关闭</span>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <span v-if="resultsMap.state === 1">
                        <el-popconfirm title="确定支付此预约吗？" @confirm="handlePay({id:resultsMap.id})">
                          <el-button slot="reference" class="favorites" type="primary">支付预约</el-button>
                        </el-popconfirm>
                        <el-popconfirm title="确定关闭此预约吗？" @confirm="handleShut({id:resultsMap.id})">
                          <el-button slot="reference" class="favorites" type="danger">关闭</el-button>
                        </el-popconfirm>
                      </span>
                      <span v-if="resultsMap.state === 2">
                        <el-popconfirm title="确定此预约完成吗？" @confirm="handleComplete({id:resultsMap.id})">
                          <el-button slot="reference" class="favorites" type="primary">完成</el-button>
                        </el-popconfirm>
                        <el-popconfirm title="确定关闭此预约吗？" @confirm="handleShut({id:resultsMap.id})">
                          <el-button slot="reference" class="favorites" type="danger">关闭</el-button>
                        </el-popconfirm>
                      </span>
                      <span v-else-if="resultsMap.state ===3 && resultsMap.state ===4">
                        <el-popconfirm title="确定关闭此预约吗？" @confirm="handleShut({id:resultsMap.id})">
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
                        <a style="font-size: 15px ;line-height: 25px; margin-left:30px">填写完善预约信息，家教老师受理预约概率大大提高，预约进行中请务必提高警惕,发现不对劲请立刻关闭预约并报警</a>
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
        <el-dialog title="评论" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose" :append-to-body="true">
          <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2" label-width="140px" class="demo-ruleForm">
            <el-form-item label="评论(20字以内)" prop="content"><el-input v-model="ruleForm2.content"/></el-form-item>
            <el-form-item label="评分" prop="rate">
              <el-rate
                v-model="ruleForm2.rate"
                show-text>
              </el-rate>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">完成</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </el-col>
  </div>
</template>
<script>
  import axios from 'axios'
  import PersonalHeader from "./PersonalHeader";
  import { CodeToText } from 'element-china-area-data'
  const tokens = localStorage.getItem('token');
  export default {
    name: "AppointDetail",
    components:{
      PersonalHeader
    },
    data(){
      return{
        resultsMap: [],
        tokens : [],
        dialogVisible2:false,
        ruleForm2:{
          content:'',
          rate:'',
          id:''
        },
        rules2: {
          content: [{ required: true,message: '请输入你的评论内容', trigger: 'blur' },{max: 20,message: '超过字数限制' }]
        },
      }
    },
    created(){
      this.getParams()
    },
    methods:{
      getParams: function () {
        this.id = this.$route.query.id;
        axios.post('http://127.0.0.1:7001/business/appoint/userSee', {id: this.id}, {
          headers: {
            authorization: `Bearer ${tokens}`
          }
        }).then(
          (res) => {
            const data = res.data.data;
            this.resultsMap = data;
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
      // 完成预约
      handleComplete(id){
        this.dialogVisible2 = true;
        this.ruleForm2 = id;
        console.log(id)
      },
      submitForm(formName){
        this.$refs[formName].validate(valid =>{
          if (valid) {
            console.log(this.ruleForm2.id);
            axios.post('http://127.0.0.1:7001/business/appoint/finish',this.ruleForm2,{
              headers:{
                authorization:`Bearer ${tokens}`
              }
            }).then(res => {
              if (res.data.code === 0) {
                this.$refs[formName].resetFields();
                this.dialogVisible2 = false;
                this.getParams();
                this.$message({
                  title:'成功',
                  message:res.data.msg,
                  type:'success'
                })
              } else {
                this.$message({
                  title:'失败',
                  message:res.data.msg,
                  type:'error'
                })
              }
              console.log(res.data)
            })
          } else {
            console.log('error submit!!');
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      // 关闭预约
      handleShut(id) {
        axios.post('http://127.0.0.1:7001/business/appoint/userClose',id,{
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
      formatAddress: function (value) {
        if (value === null) {
          return null
        }
        let area = '';
        switch (value.length) {
          case 1:
            area += CodeToText[value[0]];
            break;
          case 2:
            area += CodeToText[value[0]] + '/' + CodeToText[value[1]];
            break;
          case 3:
            area += CodeToText[value[0]] + '/' + CodeToText[value[1]] + '/' + CodeToText[value[2]];
            break;
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
    font-family: '微软雅黑',serif;
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
