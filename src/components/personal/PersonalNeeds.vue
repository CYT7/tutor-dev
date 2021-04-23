<template>
  <el-row :gutter="20" style="margin: 0px;padding:0">
    <el-col :span="20" :offset="2"><Header></Header></el-col>
    <el-col :span="20">
      <div class="grid-content bg-purple" style="margin-top: 15px;margin-right:-100px;float: right">
        <el-button type="primary" @click="dialogVisible2=true">+新建需求</el-button>
      </div>
    </el-col>
    <div style="margin-top: 20px" align="center">
      <el-table :data="resultsMap" style="width: 80%" height="700px"><!--height可实现固定表头的表格-->
        <el-table-column type="index" width="50" align="center" />
        <el-table-column align="center" label="需求id" prop="id"> </el-table-column>
        <el-table-column align="center" label="学生称呼" prop="nickName"> </el-table-column>
        <el-table-column align="center" label="授课科目" prop="subject"></el-table-column>
        <el-table-column align="center" label="上几次课" prop="frequency"></el-table-column>
        <el-table-column align="center" label="城市区域" prop="city" :formatter="formatAddress"></el-table-column>
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
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <span v-if="scope.row.state === 4">
              <router-link :to="{path:`/NeedDetail`,name:`NeedDetail`,params:{id:scope.row.id},query:{id:scope.row.id}}">
              <el-button type="text" size="small" icon="el-icon-thumb">查看</el-button>
            </router-link>
              <el-popconfirm title="确定此需求完成了吗？" @confirm="handleComplete({id:scope.row.id})">
                <el-button slot="reference" type="text" size="small" icon="el-icon-thumb">完成</el-button>
              </el-popconfirm>
               <el-popconfirm title="确定关闭此需求吗？" @confirm="handleShut({id:scope.row.id})">
                <el-button slot="reference" type="text" size="small" icon="el-icon-thumb">关闭</el-button>
              </el-popconfirm>
            </span>
            <span v-else-if="scope.row.state === 3">
              <router-link :to="{path:`/NeedDetail`,name:`NeedDetail`,params:{id:scope.row.id},query:{id:scope.row.id}}">
              <el-button type="text" size="small" icon="el-icon-thumb">选择老师</el-button>
            </router-link>
               <el-popconfirm title="确定关闭此需求吗？" @confirm="handleShut({id:scope.row.id})">
                <el-button slot="reference" type="text" size="small" icon="el-icon-thumb">关闭</el-button>
              </el-popconfirm>
            </span>
            <span v-else-if="scope.row.state === 2">
              <router-link :to="{path:`/NeedDetail`,name:`NeedDetail`,params:{id:scope.row.id},query:{id:scope.row.id}}">
              <el-button type="text" size="small" icon="el-icon-thumb">查看</el-button>
            </router-link>
              <el-popconfirm title="确定修改此需求吗？" @confirm="handleModify({id:scope.row.id})">
                <el-button slot="reference" type="text" size="small" icon="el-icon-thumb">修改</el-button>
              </el-popconfirm>
               <el-popconfirm title="确定关闭此需求吗？" @confirm="handleShut({id:scope.row.id})">
                <el-button slot="reference" type="text" size="small" icon="el-icon-thumb">关闭</el-button>
              </el-popconfirm>
            </span>
            <span v-else>
              <router-link :to="{path:`/NeedDetail`,name:`NeedDetail`,params:{id:scope.row.id},query:{id:scope.row.id}}">
              <el-button type="text" size="small" icon="el-icon-thumb">查看</el-button>
              </router-link>
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
    <el-dialog title="新建需求"
               :visible.sync="dialogVisible2"
               width="30%"
               :before-close="handleClose"
               :append-to-body="true">
      <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2" label-width="140px" class="demo-ruleForm">
        <el-form-item label="学生称呼" prop="nickName"><el-input v-model="ruleForm2.nickName" /></el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="ruleForm2.gender" name="gender" style="float: left">
            <el-radio v-for="item in gender" :key = "item.id" :label="item.id">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
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
            style="float: left;"></el-cascader>
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
        <el-form-item label="课时费用(元)" prop="hourPrice"><el-input v-model="ruleForm2.hourPrice" /></el-form-item>
        <el-form-item label="家教性别要求" prop="teacherGender">
          <el-radio-group v-model="ruleForm2.teacherGender" name="teacherGender" style="float: left">
            <el-radio v-for="item in gender1" :key = "item.id" :label="item.id">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone"><el-input v-model="ruleForm2.phone" /></el-form-item>
        <el-form-item label="QQ" prop="qq"><el-input v-model="ruleForm2.qq" /></el-form-item>
        <el-form-item label="微信号" prop="wechat"><el-input v-model="ruleForm2.wechat" /></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
    <el-dialog title="评论" :visible.sync="dialogVisible3" width="30%" :before-close="handleClose" :append-to-body="true">
      <el-form ref="ruleForm3" :model="ruleForm3" :rules="rules3" label-width="140px" class="demo-ruleForm">
        <el-form-item label="评论(20字以内)" prop="content"><el-input v-model="ruleForm3.content"/></el-form-item>
        <el-form-item label="评分" prop="rate">
          <el-rate
            v-model="ruleForm3.rate"
            show-text>
          </el-rate>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm2('ruleForm3')">完成</el-button>
          <el-button @click="resetForm2('ruleForm3')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>
<script>
  import Header from "./Header";
  import { regionData,CodeToText } from 'element-china-area-data'
  import axios from 'axios'
  const tokens = localStorage.getItem('token');
  export default {
    name: "PersonalNeeds",
    data() {
      // 验证手机号的校验规则
      var checkMobile = (rule, value, callback) => {
        const regMobile = /^1(3|5|7|8)\d{9}$/;// 验证手机号的正则表达式
        if (regMobile.test(value)) {
          return callback()// 合法的手机号
        }
        callback(new Error('请输入合法的手机号'))// 不合法
      }
      return {
        page:1, //初始页
        resultsMap: [],
        list:[],
        tokens : [],
        dialogVisible2:false,
        dialogVisible3:false,
        dialogVisible4:false,
        ruleForm2:{
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
        rules2: {
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
        ruleForm3:{
          content:'',
          rate:null,
          id:''
        },
        rules3: {
          content: [{ required: true,message: '请输入你的评论内容', trigger: 'blur' },{max: 20,message: '超过字数限制' }]
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
    components: {
      Header
    },
    created(){
      this.getList()
      this.getCateList()
    },
    methods:{
      getList(){
        axios.get('http://127.0.0.1:7001/business/need/Userlist',{
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
        axios.get('http://127.0.0.1:7001/business/need/Userlist?page='+this.page,{
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
          this.getList()
        })
        console.log(id)
      },
      handleModify(id){
        this.dialogVisible4 = true;
        axios.post('http://127.0.0.1:7001/business/need/information',id,{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(
          (res) => {
            this.ruleForm4 = res.data.data;
          },
          (err) => {
            console.log(err);
          }
        )
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
                this.getList()
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
        this.dialogVisible3 = true;
        this.ruleForm3 = id;
        console.log(id)
      },
      submitForm2(formName){
        this.$refs[formName].validate(valid =>{
          if (valid) {
            console.log(this.ruleForm3.id)
            axios.post('http://127.0.0.1:7001/business/need/finish',this.ruleForm3,{
              headers:{
                authorization:`Bearer ${tokens}`
              }
            }).then(res => {
              if (res.data.code === 0) {
                this.$refs[formName].resetFields()
                this.dialogVisible3 = false
                this.getList()
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
      resetForm2 (formName) {
        this.$refs[formName].resetFields()
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
            axios.post('http://127.0.0.1:7001/business/need/create',this.ruleForm2,{
              headers:{
                authorization:`Bearer ${tokens}`
              }
            }).then(res => {
              if (res.data.code === 0) {
                this.$refs[formName].resetFields()
                this.dialogVisible2 = false
                this.getList()
                this.$message({
                  title:'成功',
                  message:res.data.msg,
                  type:'success'
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
      formatAddress(row) {
        if (row.city === null) {
          return null
        }
        let area = ''
        switch (row.city.length) {
          case 1:
            area += CodeToText[row.city[0]]
            break
          case 2:
            area += CodeToText[row.city[0]] + '/' + CodeToText[row.city[1]]
            break
          case 3:
            area += CodeToText[row.city[0]] + '/' + CodeToText[row.city[1]] + '/' + CodeToText[row.city[2]]
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
