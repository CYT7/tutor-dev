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
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{formatAddress(resultsMap.address)}}</div></el-col>
                    </el-row>
                    <el-row v-if="resultsMap.phone !== ''">
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">联系方式</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.phone}}</div></el-col>
                    </el-row>
                    <el-row v-if="resultsMap.qq !== ''">
<!--                      <span v-if="resultsMap.qq !== ''"></span>-->
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">QQ</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.qq}}</div></el-col>
                    </el-row>
                    <el-row v-if="resultsMap.wechat !== ''">
                        <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                        <el-col :span="6"><div class="grid-content bg-purple">微信号</div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.wechat}}</div></el-col>
                      </span>
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
                        <el-popconfirm title="确定关闭此预约吗？" @confirm="handleAgree({id:resultsMap.id})">
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
    name: "TeacherAppoint",
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
          console.log(res)
          this.request()
        })
        console.log(this.id)
      },
      // 不同意预约
      handleDisagree(id) {
        axios.post('http://127.0.0.1:7001/business/appoint/disagree',id,{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(res => {
          console.log(res)
          this.request()
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
          console.log(res)
          this.request()
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
          console.log(res)
          this.request()
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
  .favorites{
    margin-top: 8px;
    margin-bottom: 8px;
    margin-right: 40px;
  }
</style>
