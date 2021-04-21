<template>
  <el-row :gutter="20">
    <el-col :span="20" :offset="2">
      <Header></Header>
    </el-col>
    <el-col :span="20" >
      <div style="margin-left:35%;" align="center" class="app-container">
        <el-form ref="form" :model="resultsMap" label-width="auto" style="float: left;">
          <el-form-item><h2 style="margin-left:-20%">老师信息</h2></el-form-item>
          <el-form-item label="老师ID">{{resultsMap.id}}</el-form-item>
          <el-form-item label="真实姓名">{{resultsMap.realName}}</el-form-item>
          <el-form-item label="成功次数">{{resultsMap.totalSuccess}}次</el-form-item>
          <el-form-item label="总体评分">
            <el-rate
              v-model="resultsMap.satisfaction"
              disabled
              show-score
              text-color="#ff9900"
              show-text>
            </el-rate>
          </el-form-item>
          <el-form-item label="总评论次数">{{resultsMap.totalComment}}次</el-form-item>
          <el-form-item label="教学经验">{{resultsMap.experience}}年</el-form-item>
          <el-form-item label="年龄">{{resultsMap.age}}岁</el-form-item>
          <el-form-item label="擅长科目">{{resultsMap.goodAt}}</el-form-item>
          <el-form-item label="课时费用">{{resultsMap.hourPrice}}元</el-form-item>
          <el-form-item label="在读/毕业院校">{{resultsMap.school}}</el-form-item>
          <el-form-item label="所在城市">{{formatAddress(resultsMap.city)}}</el-form-item>
          <el-form-item label="审核状态">
            <span v-if="resultsMap.state ==1" style="font-weight: bolder">已提交审核</span>
            <span v-else-if="resultsMap.state ==2" style="color: #F56C6C; font-weight: bolder">审核不通过</span>
            <span v-else style="color: #67C23A; font-weight: bolder">审核通过</span>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogVisible2=true">修改</el-button>
            <span v-if="resultsMap.state ==2"><el-button type="primary" @click="handle">重新认证</el-button></span>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
    <el-dialog title="修改老师信息" :visible.sync="dialogVisible2"  width="30%" :before-close="handleClose" :append-to-body="true">
      <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2" label-width="auto" class="demo-ruleForm">
        <el-form-item label="教学经验(年)" prop="experience"><el-input v-model="ruleForm2.experience" /></el-form-item>
        <el-form-item label="年龄(岁)" prop="age"><el-input v-model="ruleForm2.age" /></el-form-item>
        <el-form-item label="擅长科目" prop="goodAt">
          <el-select v-model="ruleForm2.goodAt" placeholder="请选择" style="float: left">
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课时费用(元)" prop="hourPrice"><el-input v-model="ruleForm2.hourPrice" /></el-form-item>
        <el-form-item label="所在城市" prop="city">
          <el-cascader
            style="float: left"
            placeholder="请选择城市"
            :options="options"
            v-model="ruleForm2.city"
            :show-all-levels="false">
          </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">保存</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>
<script>
  import Header from "./Header"
  import { provinceAndCityData,CodeToText } from 'element-china-area-data'
  import axios from 'axios'
  const Token = localStorage.getItem('token');
  export default {
    name: "TeacherCenter",
    data() {
      return {
        resultsMap: {},
        tokens : [],
        catelist:'',
        dialogVisible2:false,
        ruleForm2:{
          experience:'',
          age:'',
          goodAt:'',
          hourPrice:'',
          city:''
        },
        options: provinceAndCityData,// 城市数据
        rules2: {
          experience: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
          age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
          goodAt: [{ required: true, message: '请选择擅长科目', trigger: 'blur' }],
          hourPrice: [{ required: true, message: '请输入课时费用', trigger: 'blur' }],
        },
      }
    },
    components: {
      Header
    },
    created() {
      this.getList();
      this.getCateList();
    },
    methods:{
      handle() {
        this.$router.push({ name: "Modify" });
      },
      getList(){
        axios.post('http://127.0.0.1:7001/business/teacher/information',{},{
          headers:{
            authorization:`Bearer ${Token}`
          }
        }).then((res) => {
            this.resultsMap = res.data.data;
            this.ruleForm2 = res.data.data;
            console.log(this.resultsMap)
          },
          (err) => {
            console.log(err);
          }
        )
      },
      getCateList(){
        axios.get('http://127.0.0.1:7001/business/category/List',{
          headers:{
            authorization:`Bearer ${Token}`
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
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      submitForm(formName){
        this.$refs[formName].validate(valid =>{
          console.log(this.ruleForm2)
          if (valid) {
            axios.put('http://127.0.0.1:7001/business/teacher/information',this.ruleForm2,{
              headers:{
                authorization:`Bearer ${Token}`,
                'content-type': 'application/json'
              }
            }).then(res => {
              console.log(this.ruleForm2)
              if (res.data.code === 0) {
                this.$refs[formName].resetFields()
                this.dialogVisible2 = false
                this.$message({
                  message: res.data.msg || 'Success',
                  type: 'Success',
                  duration: 3 * 1000
                })
              }else {
                this.$message({
                  message: res.data.msg || 'Error',
                  type: 'error',
                  duration: 3 * 1000
                })
              }
              console.log(res.data)
              this.getList();
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
    },
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
