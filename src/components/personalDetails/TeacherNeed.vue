<template>
  <div :data="resultsMap">
    <el-col :span="20" offset="2"><PersonalHeader></PersonalHeader></el-col>
    <el-col :span="20">
      <div style="margin-top: 20px">
        <el-row>
          <el-col :span="2"><div class="grid-content bg-purple">&nbsp;</div></el-col>
          <el-col :span="22"><div class="grid-content bg-purple-light">
            <el-header height="20px">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/PersonalNeeds' }">个人需求列表</el-breadcrumb-item>
                <el-breadcrumb-item>需求详情</el-breadcrumb-item>
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
                      <el-col :span="6"><div class="grid-content bg-purple">需求id</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.id}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">同学称呼</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.nickName}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">同学性别</div></el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple-light">
                          <span v-if="resultsMap.gender ==0">不限</span>
                          <span v-else-if="resultsMap.gender ==1">男</span>
                          <span v-else>女</span>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">辅导科目</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.subject}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">教师性别要求</div></el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple-light">
                          <span v-if="resultsMap.teacherGender ==0">不限</span>
                          <span v-else-if="resultsMap.teacherGender ==1">男</span>
                          <span v-else>女</span>
                        </div>
                      </el-col>
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
                      <el-col :span="6"><div class="grid-content bg-purple">需求总价格</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.totalPrice}}元</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">所在城市区域</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.address}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">联系方式</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.phone}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">QQ</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.qq}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">微信号</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.wechat?'':resultsMap.wechat}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">需求状态</div></el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple-light">
                          <span v-if="resultsMap.state ==1">需求审核中</span>
                          <span v-else-if="resultsMap.state ==2">需求审核不通过</span>
                          <span v-else-if="resultsMap.state ==3">需求审核通过</span>
                          <span v-else-if="resultsMap.state ==4">需求已选定老师</span>
                          <span v-else-if="resultsMap.state ==5">需求已完成</span>
                          <span v-else>需求已关闭</span>
                        </div>
                      </el-col>
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
                        <a style="font-size: 15px ;line-height: 25px; margin-left:30px">
                          请完善需求信息，家教更好应聘你的需求。
                          家教只能查看部分的需求信息而不能查看所有信息，家教如果应聘成功，会在个人中心查看到你此需求的所有信息，
                        </a>
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
  import PersonalHeader from "./PersonalHeader";
  const tokens = localStorage.getItem('token');
  export default {
    name: "TeacherNeed",
    components:{
      PersonalHeader
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
        axios.post('http://127.0.0.1:7001/business/need/information',{id:this.id},{
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
      }
    }
  }
</script>
<style scoped>
</style>
