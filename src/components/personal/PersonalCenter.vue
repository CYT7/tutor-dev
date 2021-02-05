<template>
  <el-row :gutter="20">
    <el-col :span="20" :offset="2">
      <Header></Header>
    </el-col>
    <div style="margin-top:8%;margin-left:35%;" align="center" class="app-container">
      <el-form ref="form" :model="resultsMap" label-width="auto" style="float: left;">
        <el-form-item><h2 style="margin-left:-20%">个人信息</h2></el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :http-request="upLoad"
            :before-upload="beforeAvatarUpload">
            <img v-if="resultsMap.image_url !== null" :src="resultsMap.image_url" class="avatar" fit="cover" style="width: 100px;height: 100px">
            <img v-else class="el-icon-plus avatar-uploader-icon" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="width: 100px;height: 100px">
          </el-upload>
        </el-form-item>
        <el-form-item label="用户昵称">{{resultsMap.nickName}}</el-form-item>
        <el-form-item label="手机号码">{{resultsMap.phone}}</el-form-item>
        <el-form-item label="邮箱">{{resultsMap.email}}</el-form-item>
        <el-form-item label="余额">{{resultsMap.balance / 100 }}元</el-form-item>
        <el-form-item label="QQ号" v-if="resultsMap.qq?'':resultsMap.qq">{{resultsMap.qq}}</el-form-item>
        <el-form-item label="微信号" v-if="resultsMap.wechat?'':resultsMap.wechat">{{resultsMap.wechat}}</el-form-item>
        <el-form-item label="性别">
          <div class="grid-content bg-purple-light">
            <span v-if="resultsMap.gender ==0">保密</span>
            <span v-else-if="resultsMap.gender ==1">男</span>
            <span v-else>女</span>
          </div>
        </el-form-item>
        <el-form-item label="地址">{{formatAddress(resultsMap.address)}}</el-form-item>
        <el-form-item>
          <span v-if="resultsMap.type ==0"><el-button type="primary" @click="handle">申请做家教</el-button></span>
          <el-button type="primary" @click="dialogVisible2=true">修改信息</el-button>
          <el-button type="primary" @click="dialogVisible3=true">充值余额</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="修改个人信息" :visible.sync="dialogVisible2"  width="30%" :before-close="handleClose" :append-to-body="true">
      <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2" label-width="auto" class="demo-ruleForm">
        <el-form-item label="昵称" prop="nickName"><el-input v-model="ruleForm2.nickName" /></el-form-item>
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="ruleForm2.oldPassword" type="password" name="oldPassword" placeholder="请输入旧密码" />
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="ruleForm2.newPassword"  type="password" name="newPassword" placeholder="请输入新密码"  />
        </el-form-item>
        <el-form-item label="确认新密码" prop="repassword"><el-input v-model="ruleForm2.repassword" type="password" name="repassword" placeholder="请再次输入密码" /></el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="ruleForm2.gender" name="gender" style="float: left">
            <el-radio v-for="item in gender" :key = "item.id" :label="item.id">{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="QQ" prop="qq"><el-input v-model="ruleForm2.qq" /></el-form-item>
        <el-form-item label="微信号" prop="wechat"><el-input v-model="ruleForm2.wechat" /></el-form-item>
        <el-form-item label="所在城市" prop="address">
          <el-cascader
            style="float: left"
            placeholder="请选择城市"
            :options="options"
            v-model="ruleForm2.address"
            :show-all-levels="false">
          </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">保存</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="充值余额" :visible.sync="dialogVisible3" :before-close="handleClose">
      <el-form ref="ruleForm3" :model="ruleForm3" label-width="auto" class="demo-ruleForm">
        <el-form-item label="金额(元)" prop="balance"><el-input v-model="ruleForm3.balance"/></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm2('ruleForm3')">充值</el-button>
          <el-button @click="resetForm2('ruleForm3')">重置</el-button>
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
    name: "PersonalCenter",
    data() {
      // 密码是否一致验证
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'))
        } else {
          if (this.ruleForm2.repassword !== '') {
            this.$refs.ruleForm2.validateField('repassword')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm2.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        resultsMap: {},
        Token : [],
        dialogVisible2:false,
        dialogVisible3:false,
        ruleForm2:{
          nickName:'',
          gender:'',
          qq:'',
          wechat:'',
          address:[],
          oldPassword:'',
          newPassword:'',
          repassword:'',
          qq:'',
          wechat:''
        },
        ruleForm3:{
          balance:''
        },
        options: provinceAndCityData,// 城市数据
        gender : [{
          id:0,
          name:'保密'
        },{
          id:1,
          name:'男'
        },{
          id:2,
          name:'女'
        }],
        rules2: {
          nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
          oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
          newPassword: [{required: true, validator: validatePass1, min: 6, message: '密码长度最少为6位', trigger: 'blur'}],
          repassword: [
            {required: true, validator: validatePass2,  trigger: 'blur'}
          ],
        },
      }
    },
    components: {
      Header
    },
    created() {
      this.getList();
    },
    methods:{
      handle() {
        this.$router.push({ name: "Apply" });
      },
      getList(){
        axios.post('http://127.0.0.1:7001/business/user/information',{},{
          headers:{
            authorization:`Bearer ${Token}`
          }
        }).then((res) => {
            this.resultsMap = res.data.data
            console.log(this.resultsMap)
            },
            (err) => {
              console.log(err);
            }
          )
      },
      upLoad(file) {
        const formData = new FormData();
        formData.append('file',file.file);
        console.log(file)
        axios.post('http://127.0.0.1:7001/business/user/saveAvatar',formData,{
          headers:{
            authorization:`Bearer ${Token}`
          }
        }).then((res) => {
          console.log(res);
          if (res.data.code ===0){
            this.$message({
              type:"success",
              message:res.data.msg
            })
          }else {
            this.$message({
              type:"warning",
              message:res.data.msg
            })
          }
            this.getList();
          },
          (err) => {
            console.log(err);
          }
        )
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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
            axios.put('http://127.0.0.1:7001/business/user/modify',this.ruleForm2,{
              headers:{
                authorization:`Bearer ${Token}`,
                'content-type': 'application/json'
              }
            }).then(res => {
              console.log(this.ruleForm2)
              if (res.data.code === 0) {
                this.$refs[formName].resetFields()
                this.dialogVisible2 = false
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
      submitForm2(formName){
        this.$refs[formName].validate(valid =>{
          console.log(this.ruleForm3)
          if (valid) {
            this.ruleForm3.balance = this.ruleForm3.balance*100
            axios.post('http://127.0.0.1:7001/business/user/balanceAdd',this.ruleForm3,{
              headers:{
                authorization:`Bearer ${Token}`,
              }
            }).then(res => {
              if (res.data.code === 0) {
                this.$refs[formName].resetFields()
                this.dialogVisible3 = false
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
      resetForm2 (formName) {
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
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
</style>
