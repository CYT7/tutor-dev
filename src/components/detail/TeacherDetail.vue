<template>
  <div>
    <el-col :span="20" :offset="2"><teacher-header></teacher-header></el-col>
    <el-col :span="20">
      <div class="teacher" style="margin-top: 20px">
        <el-row >
          <el-col :span="2"><div class="grid-content bg-purple">&nbsp;</div></el-col>
          <div class="grid-content bg-purple-light">
            <el-container>
              <el-header height="20px">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item :to="{ path: '/TeacherInfo' }">家教信息库</el-breadcrumb-item>
                  <el-breadcrumb-item>家教详情</el-breadcrumb-item>
                </el-breadcrumb>
              </el-header>
              <el-container>
                <el-aside width="25%">
                  <div class="body-border-3" style="margin-left:10px;">
                    <el-row >
                      <el-col :span="2"><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="20"><div class="grid-content bg-purple-light" style="text-align: left;margin-top: 20px ;font-size: 18px ;line-height: 30px">
                        <i class="el-icon-user">
                          <a style="font-size: 20px;margin-top: 20px">{{teacherList.realName}}老师</a>
                        </i>
                        <div class="grid-content bg-purple" v-if="teacherList.User.phone != null"><i class=" el-icon-phone-outline"></i>手机已验证畅通</div><br>
                      </div>
                        <el-row>
                          <el-col :span="8"><div class="grid-content bg-purple" style="font-weight: bold;color: #409EFF">身份验证</div></el-col>
                          <el-col :span="8"><div class="grid-content bg-purple">
                            <div v-if="teacherList.StudentCard != null"><i class="el-icon-success"></i>学生证认证</div>
                            <div v-if="teacherList.identityCard != null"><i class="el-icon-success"></i>身份证认证</div>
                            <div v-else>暂未进行认证或没通过学生证和身份证认证,请谨慎预约老师</div>
                          </div></el-col>
                        </el-row>
                      </el-col>
                      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                    </el-row>
                  </div>
                </el-aside>
                <el-main class="left" width="10%" >
                  <div class="body-border">
                    <el-row style="margin-top: 20px">
                      <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">家教编号</div></el-col>
                      <el-col :span="10"><div class="grid-content bg-purple">{{teacherList.id}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">家教姓名</div></el-col>
                      <el-col :span="10"><div class="grid-content bg-purple">{{teacherList.realName}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">家教年龄</div></el-col>
                      <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.age}}岁</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">教师性别</div></el-col>
                      <el-col :span="10">
                        <div class="grid-content bg-purple-light">
                          <span v-if="teacherList.User.gender ==0">不限</span>
                          <span v-else-if="teacherList.User.gender ==1">男</span>
                          <span v-else>女</span>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">就读院校</div></el-col>
                      <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.school}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">教学年龄</div></el-col>
                      <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.experience}}年</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">成功次数</div></el-col>
                      <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.totalSuccess}}次</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">评论次数</div></el-col>
                      <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.totalComment}}次</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">总体评分</div></el-col>
                      <el-col :span="10">
                        <div class="grid-content bg-purple-light">
                          <el-rate
                            v-model="teacherList.satisfaction / 100"
                            disabled
                            show-score
                            text-color="#ff9900"
                            show-text>
                          </el-rate>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">所在城市</div></el-col>
                      <el-col :span="10"><div class="grid-content bg-purple-light">{{formatAddress(teacherList.city)}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">辅导科目</div></el-col>
                      <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.goodAt}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple">授课价格</div></el-col>
                      <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.hourPrice /100 }}元/小时</div></el-col>
                    </el-row>
                    <el-row>
                      <el-button type="primary" class="favorites" @click="dialogVisible2=true">预约</el-button>
                    </el-row>
                  </div>
                </el-main>
                <el-aside width="20%">
                  <div class="body-border-2" style="margin-top: 20px">
                    <el-row >
                      <el-col :span="2"><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="20">
                        <div class="grid-content bg-purple-light" style="text-align: left;margin-top: 20px ;line-height: 30px">
                          <i class="el-icon-sunny"><a style="font-size: 20px;margin-top: 20px">家长预约使用帮助</a></i>
                          <br><a style="font-size: 15px ;line-height: 25px; margin-left:30px">该家教承诺在见面第一时间出示证件，但是为了确保您的个人信息以及孩子的信息安全，请提高防范</a>
                        </div>
                      </el-col>
                      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                    </el-row>
                  </div>
                </el-aside>
              </el-container>
            </el-container>
          </div>
        </el-row>
        <el-dialog title="新建预约" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
          <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2" label-width="140px" class="demo-ruleForm">
            <el-form-item label="老师编号" prop="id"><el-input v-model="ruleForm2.id=teacherList.id" disabled /></el-form-item>
            <el-form-item label="学生称呼" prop="name"><el-input v-model="ruleForm2.name" /></el-form-item>
            <el-form-item label="科目" prop="subject">
              <el-select v-model="ruleForm2.subject" placeholder="请选择" style="float: left">
                <el-option
                  v-for="item in catelist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预约上几次家教" prop="frequency"><el-input v-model="ruleForm2.frequency" /></el-form-item>
            <el-form-item label="上课时间" prop="teach_date">
              <el-cascader
                v-model="ruleForm2.teach_date"
                :options="times"
                style="float: left;"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="每次上几小时" prop="timeHour"><el-input v-model="ruleForm2.timeHour" /></el-form-item>
            <el-form-item label="所在城市区域" prop="city">
              <el-cascader
                style="float: left"
                placeholder="请选择城市"
                :options="options"
                v-model="ruleForm2.city"
                :show-all-levels="false">
              </el-cascader>
            </el-form-item>
            <el-form-item label="上课详情地址/区域" prop="address"><el-input v-model="ruleForm2.address" /></el-form-item>
            <el-form-item label="课时费用" prop="hourPrice"><el-input v-model="ruleForm2.hourPrice" /></el-form-item>
            <el-form-item label="联系方式" prop="phone"><el-input v-model="ruleForm2.phone" /></el-form-item>
            <el-form-item label="QQ" prop="qq"><el-input v-model="ruleForm2.qq" /></el-form-item>
            <el-form-item label="微信号" prop="wechat"><el-input v-model="ruleForm2.wechat" /></el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </el-col>
  </div>
</template>
<script>
  //导入一个ajax的请求库
  import { regionData,CodeToText } from 'element-china-area-data'
  import axios from 'axios'
  import TeacherHeader from "./TeacherHeader.vue";
  const tokens = localStorage.getItem('token');
  export default {
    name: "ParentDetail",
    components:{
      TeacherHeader,
    },
    data(){
      // 验证手机号的校验规则
      var checkMobile = (rule, value, callback) => {
        const regMobile = /^1(3|5|7|8)\d{9}$/;// 验证手机号的正则表达式
        if (regMobile.test(value)) {
          return callback()// 合法的手机号
        }
        callback(new Error('请输入合法的手机号'))// 不合法
      }
      return{
        teacherList:[],
        // 城市数据
        options: regionData,
        times: [{
          label:'星期一',
          value: '星期一',
          children: [{
            label:'上午',
            value:'上午'
          },{
            value:'下午',
            label:'下午'
          },{
            value:'晚上',
            label:'晚上'
          }
          ]
        }, {
          value: '星期二',
          label: '星期二',
          children: [{
            label:'上午',
            value:'上午'
          },{
            value:'下午',
            label:'下午'
          },{
            value:'晚上',
            label:'晚上'
          }
          ]
        }, {
          value: '星期三',
          label: '星期三',
          children: [{
            label:'上午',
            value:'上午'
          },{
            value:'下午',
            label:'下午'
          },{
            value:'晚上',
            label:'晚上'
          }
          ]
        }, {
          value: '星期四',
          label: '星期四',
          children: [{
            label:'上午',
            value:'上午'
          },{
            value:'下午',
            label:'下午'
          },{
            value:'晚上',
            label:'晚上'
          }
          ]
        }, {
          value: '星期五',
          label: '星期五',
          children: [{
            label:'上午',
            value:'上午'
          },{
            value:'下午',
            label:'下午'
          },{
            value:'晚上',
            label:'晚上'
          }
          ]
        }, {
          value: '星期六',
          label: '星期六',
          children: [{
            label:'上午',
            value:'上午'
          },{
            value:'下午',
            label:'下午'
          },{
            value:'晚上',
            label:'晚上'
          }
          ]
        }, {
          value: '星期日',
          label: '星期日',
          children: [{
            label:'上午',
            value:'上午'
          },{
            value:'下午',
            label:'下午'
          },{
            value:'晚上',
            label:'晚上'
          }
          ]
        }],
        dialogVisible2:false,
        catelist:'',
        ruleForm2:{
          name:'',
          frequency:'',
          timeHour:'',
          teach_date:'',
          hourPrice:'',
          phone:'',
          qq:'',
          wechat:'',
          address:'',
          city:[],
          subject:'',
          id:''
        },
        rules2: {
          name: [{ required: true, message: '请输入学生称呼', trigger: 'blur' }],
          subject:[{ required: true, message: '请选择科目', trigger: 'blur' }],
          frequency: [{ required: true, message: '请输入要上几次课', trigger: 'blur' }],
          timeHour: [{ required: true, message: '请输入要上几小时', trigger: 'blur' }],
          teach_date: [{ required: true, message: '请选择周几什么时段上课', trigger: 'blur' }],
          city:[{ required: true, message: '请输入所在城市', trigger: 'blur' }],
          address:[{ required: true, message: '请输入上课详情地址/区域', trigger: 'blur' }],
          hourPrice:[{ required: true, message: '请输入课时费用', trigger: 'blur' }],
          phone: [{ required: true, message: '请输入手机号码', trigger: 'blur',validator: checkMobile, trigger: 'blur' },],
        },
      }
    },
    created(){
      this.getParams();
      this.getCateList();
    },
    methods:{
      getParams(){
        this.id =this.$route.query.id
        axios.post('http://127.0.0.1:7001/business/teacher/Information',{id:this.id},{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(
          (res) => {
            const data = res.data.data;
            this.teacherList = data
            console.log(this.teacherList)
          },
          (err) => {
            console.log(err);
          }
        )
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      getCateList(){
        axios.get('http://127.0.0.1:7001/business/category/List',{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(
          (res) => {
            const data = res.data.data;
            this.catelist = data
            console.log(this.catelist)
          },
          (err) => {
            console.log(err);
          }
        )
      },
      submitForm(formName){
        this.$refs[formName].validate(valid =>{
          if (valid) {
            axios.post('http://127.0.0.1:7001/business/appoint/create',this.ruleForm2,{
              headers:{
                authorization:`Bearer ${tokens}`
              }
            }).then(res => {
              if (res.data.code === 0) {
                this.$refs[formName].resetFields()
                this.dialogVisible2 = false
                this.$message({
                  message: res.data.msg || 'Success',
                  type: 'Success',
                  duration: 3 * 1000
                })
              }
              console.log(res)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
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
  .body-border-3{
    border:1px solid #B3C0D1;
    border-radius: 10px;
    margin-top: 20px;
    background-color: #F2F6FC;
  }
  .body-border{
    border:1px solid #B3C0D1;
    border-radius: 4px;
  }
  .favorites{
    margin-top: 8px;
    margin-bottom: 8px;
    margin-right: 40px;
    float: right
  }
</style>
