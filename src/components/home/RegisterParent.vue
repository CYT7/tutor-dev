<template>
  <div id="tutorRegister">
    <el-row type="flex" justify="center" class="tutorRegisterForm">
      <el-col :span="10">
        <el-card shadow="hover">
          <el-row>
            <div style="width: auto;height: 60px;display:flex;">
              <img src="../../assets/styles/images/logo.png" class="logo"  style="width: 180px;height: 60px;float: left">
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
              <el-form-item label="密 码" prop="password">
                <el-input v-model="parentRegisterForm.password" type="password" name="password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="repassword">
                <el-input v-model="parentRegisterForm.repassword" type="password" name="repassword" placeholder="请再次输入密码"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名" prop="realName">
                <el-input v-model="parentRegisterForm.realName" name="realName" placeholder="请输入真实姓名"></el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="nickName">
                <el-input v-model="parentRegisterForm.nickName" name="nickName" placeholder="请输入昵称"></el-input>
              </el-form-item>
              <el-form-item label="性 别" prop="gender">
                <el-radio-group v-model="parentRegisterForm.gender" name="gender" size="medium">
                  <el-radio  label="未知"></el-radio>
                  <el-radio  label="男"></el-radio>
                  <el-radio  label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="城市" prop="city">
                <el-cascader
                  style="float: left"
                  placeholder="请选择城市"
                  :options="options"
                  v-model="parentRegisterForm.city"
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
    // 手机号验证
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
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
      parentRegisterForm: {
        nickName: '',
        password: '',
        repassword: '',
        gender: '',
        phone: '',
        email: '',
        city: ''
      },
      rules: {
        nickName: [
          // { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10个字符', trigger: 'blur' }
        ],
        password: [
          {required: true, validator: validatePass1, min: 6, message: '密码长度最少为6位', trigger: 'blur'}
        ],
        repassword: [
          {required: true, validator: validatePass2, min: 6, message: '密码长度最少为6位', trigger: 'blur'}
        ],
        phone: [
          {validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const registerData = axios.post('parentRegister', this.login_form)
            .then(function (response) {
              console.log(response)
            })
            .catch(function (error) {
              console.log(error)
            })
          console.log(registerData)
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
