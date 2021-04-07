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
                <el-breadcrumb-item :to="{ path: '/PersonalNeeds' }">个人需求列表</el-breadcrumb-item>
                <el-breadcrumb-item>需求详情</el-breadcrumb-item>
              </el-breadcrumb>
            </el-header>
            <el-container>
              <el-container>
                <el-main>
                  <div class="body-border" :data="resultsMap">
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
                          <span v-if="resultsMap.gender ==1">不限</span>
                          <span v-else-if="resultsMap.gender ==2">男</span>
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
                          <span v-if="resultsMap.teacherGender ==1">不限</span>
                          <span v-else-if="resultsMap.teacherGender ==2">男</span>
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
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{formatAddress(resultsMap.city)}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">详情地址</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.address}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">联系方式</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.phone}}</div></el-col>
                    </el-row>
                    <el-row v-if="resultsMap.qq?'':resultsMap.qq">
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">QQ</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.qq}}</div></el-col>
                    </el-row>
                    <el-row v-if="resultsMap.wechat?'':resultsMap.wechat">
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">微信号</div></el-col>
                      <el-col :span="4"><div class="grid-content bg-purple-light">{{resultsMap.wechat?'':resultsMap.wechat}}</div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                      <el-col :span="6"><div class="grid-content bg-purple">需求状态</div></el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple-light">
                          <span v-if="resultsMap.state ==1" style="font-weight: bolder">需求审核中</span>
                          <span v-else-if="resultsMap.state ==2" style="color: #F56C6C; font-weight: bolder">需求审核不通过</span>
                          <span v-else-if="resultsMap.state ==3" style="color: #67C23A; font-weight: bolder">需求审核通过</span>
                          <span v-else-if="resultsMap.state ==4" style="color: #E6A23C; font-weight: bolder">需求已选定老师</span>
                          <span v-else-if="resultsMap.state ==5" style="color: #409EFF; font-weight: bolder">需求已完成</span>
                          <span v-else style="color: #F56C6C; font-weight: bolder">需求已关闭</span>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row style="margin-top: 20px">
                      <span v-if="resultsMap.state == 4">
                        <el-popconfirm title="确定此需求完成了吗？" @confirm="handleComplete({id:resultsMap.id})">
                          <el-button slot="reference" class="favorites" type="primary">完成</el-button>
                        </el-popconfirm>
                      </span>
                      <span v-if="resultsMap.state == 2">
                        <el-popconfirm title="确定修改此需求吗？" @confirm="handleModify({id:resultsMap.id})">
                          <el-button slot="reference" class="favorites" type="primary">修改</el-button>
                        </el-popconfirm>
                        <el-popconfirm title="确定关闭此需求吗？" @confirm="handleShut({id:resultsMap.id})">
                          <el-button slot="reference" class="favorites" type="danger">关闭</el-button>
                        </el-popconfirm>
                      </span>
                      <span v-else>
                        <el-popconfirm title="确定关闭此需求吗？" @confirm="handleShut({id:resultsMap.id})">
                          <el-button slot="reference" class="favorites" type="danger">关闭</el-button>
                        </el-popconfirm>
                      </span>
                    </el-row>
                  </div>
                  <div v-if="teacherMap != ''&&resultsMap.state ==3">
                    <el-divider content-position="left">
                      <i class="el-icon-menu" style="color: #409EFF"></i>选择家教
                    </el-divider>
                    <div v-for="(list,index) in teacherMap" :key="index" style="width: 25%;height:100%;float: left;margin-left:20px;line-height: 20px;">
                      <el-card class="box-card">
                        <div slot="header" class="clearfix">
                          <span>老师信息</span>
                          <el-popconfirm title="确定选择此老师吗？" @confirm="handleConfirm({_id:list._id})">
                            <el-button slot="reference" type="text" style="float: right; padding: 3px 0">选择</el-button>
                          </el-popconfirm>
                        </div>
                        <router-link :to="{path:`/TeacherDetail`,name:`TeacherDetail`,params:{id:list.id},query:{id:list.id}}" class="router-link">
                          <div>老师id：{{list.Teacher.id}}</div>
                          <div>老师名字：{{list.Teacher.realName}}</div>
                          <div>成功次数：{{list.Teacher.totalSuccess}}</div>
                          <div>擅长科目：{{list.Teacher.goodAt}}</div>
                        </router-link>
                      </el-card>
                    </div>
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
            <el-dialog title="修改需求"
                       :visible.sync="dialogVisible4"
                       width="30%"
                       :before-close="handleClose"
                       :append-to-body="true">
              <el-form ref="ruleForm4" :model="ruleForm4" :rules="rules4" label-width="140px" class="demo-ruleForm">
                <el-form-item label="学生称呼" prop="nickName"><el-input v-model="ruleForm4.nickName" /></el-form-item>
                <el-form-item label="性别" prop="gender">
                  <el-radio-group v-model="ruleForm4.gender" name="gender" style="float: left">
                    <el-radio v-for="item in gender" :key = "item.id" :label="item.id">{{item.name}}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="科目" prop="subject">
                  <el-select v-model="ruleForm4.subject" placeholder="请选择" style="float: left">
                    <el-option
                      v-for="item in catelist"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="预约上几次家教" prop="frequency"><el-input v-model="ruleForm4.frequency" /></el-form-item>
                <el-form-item label="上课时间" prop="teach_date">
                  <el-cascader
                    v-model="ruleForm4.teach_date"
                    :options="times"
                    style="float: left;"></el-cascader>
                </el-form-item>
                <el-form-item label="每次上几小时" prop="timeHour"><el-input v-model="ruleForm4.timeHour" /></el-form-item>
                <el-form-item label="所在城市区域" prop="city">
                  <el-cascader
                    style="float: left"
                    placeholder="请选择城市"
                    :options="options"
                    v-model="ruleForm4.city"
                    :show-all-levels="false">
                  </el-cascader>
                </el-form-item>
                <el-form-item label="上课详情地址/区域" prop="address"><el-input v-model="ruleForm4.address" /></el-form-item>
                <el-form-item label="课时费用" prop="hourPrice"><el-input v-model="ruleForm4.hourPrice" /></el-form-item>
                <el-form-item label="家教性别要求" prop="teacherGender">
                  <el-radio-group v-model="ruleForm4.teacherGender" name="teacherGender" style="float: left">
                    <el-radio v-for="item in gender1" :key = "item.id" :label="item.id">{{item.name}}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone"><el-input v-model="ruleForm4.phone" /></el-form-item>
                <el-form-item label="QQ" prop="qq"><el-input v-model="ruleForm4.qq" /></el-form-item>
                <el-form-item label="微信号" prop="wechat"><el-input v-model="ruleForm4.wechat" /></el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm3('ruleForm4')">立即修改</el-button>
                  <el-button @click="resetForm3('ruleForm4')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
            <el-dialog title="评论" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose" :append-to-body="true">
              <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2" label-width="140px" class="demo-ruleForm">
                <el-form-item label="评论" prop="content"><el-input v-model="ruleForm2.content"/></el-form-item>
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
          </el-col>
        </el-row>
      </div>
    </el-col>
  </div>
</template>
<script>
  import axios from 'axios'
  import PersonalHeader from "./PersonalHeader";
  import { regionData,CodeToText } from 'element-china-area-data'
  const tokens = localStorage.getItem('token');
  export default {
    name: "NeedDetail",
    components:{
      PersonalHeader
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
        resultsMap: [],
        teacherMap:[],
        tokens : [],
        id:[],
        dialogVisible2:false,
        dialogVisible4:false,
        ruleForm2:{
          content:'',
          rate:null,
          id:''
        },
        rules2: {
          content: [{ required: true,message: '请输入你的评论内容', trigger: 'blur' },{max: 5,message: '超过字数限制' }]
        },
        ruleForm4:{
          nickName:'',
          gender:'',
          teacherGender:'',
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
        },
        rules4: {
          nickName: [{ required: true, message: '请输入学生称呼', trigger: 'blur' }],
          frequency: [{ required: true, message: '请输入要上几次课', trigger: 'blur' }],
          timeHour: [{ required: true, message: '请输入要上几小时', trigger: 'blur' }],
          teach_date: [{ required: true, message: '请选择周几什么时段上课', trigger: 'blur' }],
          subject: [{ required: true, message: '请选择科目', trigger: 'blur' }],
          city:[{ required: true, message: '请输入所在城市', trigger: 'blur' }],
          address:[{ required: true, message: '请输入上课详情地址/区域', trigger: 'blur' }],
          hourPrice:[{ required: true, message: '请输入课时费用', trigger: 'blur' }],
          phone: [{ required: true, message: '请输入手机号码', trigger: 'blur',validator: checkMobile, trigger: 'blur' },],
        },
        options: regionData,// 城市数据
        gender : [{
          id:1,
          name:'保密'
        },{
          id:2,
          name:'男'
        },{
          id:3,
          name:'女'
        }],
        gender1 : [{
          id:1,
          name:'不限'
        },{
          id:2,
          name:'男'
        },{
          id:3,
          name:'女'
        }],
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
        catelist:'',
      }
    },
    created(){
      this.getParams()
      this.getTeacherList()
      this.getCateList()
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
            this.ruleForm4 = res.data.data;
          },
          (err) => {
            console.log(err);
          }
        )
      },
      getTeacherList(){
        this.id =this.$route.query.id
        axios.post('http://127.0.0.1:7001/business/need/application',{id:this.id},{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(
          (res) => {
            const data = res.data.data;
            this.teacherMap = data
            console.log(this.teacherMap)
          },
          (err) => {
            console.log(err);
          }
        )
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
      // 关闭预约
      handleShut(id) {
        axios.post('http://127.0.0.1:7001/business/need/userClose',id,{
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
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      // 修改需求
      handleModify(id){
        this.dialogVisible4 = true;
        console.log(id)
      },
      submitForm3(formName){
        this.$refs[formName].validate(valid =>{
          if (valid) {
            axios.put('http://127.0.0.1:7001/business/need/modify',this.ruleForm4,{
              headers:{
                authorization:`Bearer ${tokens}`
              }
            }).then(res => {
              if (res.data.code === 0) {
                this.$refs[formName].resetFields()
                this.dialogVisible4 = false
                this.getParams()
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
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm3 (formName) {
        this.$refs[formName].resetFields()
      },
      // 完成预约
      handleComplete(id) {
        this.dialogVisible2 = true;
        this.ruleForm2 = id;
        console.log(id)
      },
      submitForm(formName){
        this.$refs[formName].validate(valid =>{
          if (valid) {
            console.log(this.ruleForm2.id)
            axios.post('http://127.0.0.1:7001/business/need/finish',this.ruleForm2,{
              headers:{
                authorization:`Bearer ${tokens}`
              }
            }).then(res => {
              if (res.data.code === 0) {
                this.$refs[formName].resetFields()
                this.dialogVisible2 = false
                this.getParams()
                this.$message({
                  title:'成功',
                  message:res.data.msg,
                  type:'success'
                })
              } else {
                this.dialogVisible2 = false
                this.$message({
                  title:'失败',
                  message:res.data.msg,
                  type:'error'
                })
              }
              console.log(res.data)
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
      // 确定老师
      handleConfirm(_id){
        axios.post('http://127.0.0.1:7001/business/need/confirm',{_id:_id},{
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
    margin-bottom: 16px;
  }
  .el-col {
    border-radius: 4px;
  }
  .el-header, .el-footer {
    /*background-color: #B3C0D1;*/
    color: #333;
    text-align: center;
    line-height: 20px;
  }
  .el-aside {
    /*background-color: #D3DCE6;*/
    color: #333;
    /* text-align: left;*/
    line-height: 20px;

  }

  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: left;
    line-height: 8px;
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
    margin-top: 16px;
    margin-left: 8px;
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
