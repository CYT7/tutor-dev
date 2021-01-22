<template>
  <div id="tutorRegister">
    <el-row type="flex" justify="center" class="tutorRegisterForm">
      <el-col :span="10">
        <el-card shadow="hover">
          <el-row>
            <div style="width: auto;height: 60px;display:flex;">
              <img src="../../assets/styles/images/logo.png" class="logo" style="width: 180px;height: 60px;float: left">
              <h2 style="float: left">家教网-家长注册</h2>
            </div>
            <el-divider></el-divider>
            <el-form  label-width="80px"  :model="parentRegisterForm" :rules="rules" ref="parentRegisterForm">
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="parentRegisterForm.phone" name="phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="parentRegisterForm.email" name="phone" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="parentRegisterForm.password" type="password" name="password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="repassword">
                <el-input v-model="parentRegisterForm.repassword" type="password" name="repassword" placeholder="请再次输入密码"></el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="nickName">
                <el-input v-model="parentRegisterForm.nickName" name="nickName" placeholder="请输入昵称"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="parentRegisterForm.gender" name="gender">
                  <el-radio v-for="item in gender" :key = "item.id" :label="item.id">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="城市" prop="city">
                <el-cascader
                  style="float: left"
                  placeholder="请选择城市"
                  :options="options"
                  v-model="parentRegisterForm.address"
                  :show-all-levels="false">
                </el-cascader>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('parentRegisterForm')">提&nbsp;&nbsp;交</el-button>
                <el-button @click="resetForm('parentRegisterForm')">重&nbsp;&nbsp;置</el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import { provinceAndCityData } from 'element-china-area-data'
export default {
  name: 'RegisterParent',
  data () {
    // 验证手机号的校验规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1(3|5|7|8)\d{9}$/;// 验证手机号的正则表达式
      if (regMobile.test(value)) {
        return callback()// 合法的手机号
      }
      callback(new Error('请输入合法的手机号'))// 不合法
    }
    // 验证邮箱的校验规则
    var checkEmail = (rule, value, callback) => {
      const regEmail =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;// 验证邮箱的正则表达式
      if (regEmail.test(value)) {
        return callback()// 合法的邮箱
      }
      callback(new Error('请输入合法的邮箱'))// 不合法的邮箱
    }
    // 密码是否一致验证
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.parentRegisterForm.repassword !== '') {
          this.$refs.parentRegisterForm.validateField('repassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.parentRegisterForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 城市数据
      options: provinceAndCityData,
      gender : [{
        id:0,
        name:'未知'
      },{
        id:1,
        name:'男'
      },{
        id:2,
        name:'女'
      }],
      parentRegisterForm: {
        phone: '',
        email: '',
        password: '',
        repassword: '',
        gender: '',
        nickName: '',
        address:[]
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur',validator: checkMobile, trigger: 'blur' },
        ],
        email:[
          { required: true, message: '请输入邮箱', trigger: 'blur',validator: checkEmail, trigger: 'blur' },
        ],
        password: [
          {required: true, validator: validatePass1, min: 6, message: '密码长度最少为6位', trigger: 'blur'}
        ],
        repassword: [
          {required: true, validator: validatePass2,  trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://127.0.0.1:7001/business/user/create', this.parentRegisterForm)
            .then(res => {
              if (res.data.code === 0 ){
                this.$router.push('/')
                this.$message({
                  message: res.data.msg || 'Success',
                  type: 'Success',
                  duration: 3 * 1000
                })
                console.log(res.data)
              }else if (res.data.code !== 0) {
                this.$message({
                  message: res.data.msg || 'Error',
                  type: 'error',
                  duration: 3 * 1000
                })
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped="scoped">
</style>
