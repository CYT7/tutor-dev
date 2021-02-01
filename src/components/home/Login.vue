<template>
  <div id="login">
    <el-row :gutter="20">
      <el-col :span="10" :offset="7" class="header">
        <div style="width: 180px;height: 60px">
          <img src="../../assets/styles/images/logo.png" class="logo" style="width: 180px;height: 60px">
        </div>
      </el-col>
      <el-col :span="10" :offset="7">
        <div>
          <h2>家教网</h2>
          <el-divider></el-divider>
          <el-tabs type="card">
            <el-tab-pane label="登录">
              <el-row  class="loginForm">
                <el-card shadow="hover">
                  <el-row>
                    <el-form  label-width="80px"   :model="login_form" :rules="rules" ref="login_form">
                      <el-form-item label="账号"  prop="username">
                        <el-input v-model="login_form.username" name="username" placeholder="请输入手机或者邮箱"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" prop="password">
                        <el-input v-model="login_form.password" type="password" name="password" placeholder="请输入密码"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="SubmitForm('login_form')">登&nbsp;&nbsp;录</el-button>
                        <el-button @click="resetForm('login_form')">重&nbsp;&nbsp;置</el-button>
                      </el-form-item>
                    </el-form>
                  </el-row>
                  <el-row>
                    <el-col :offset="10">
                      <router-link tag="div" :to="{name: 'Register'}" class="header-abs">
                        <span>注册<i class="el-icon-arrow-right el-icon--right"></i></span>
                      </router-link>
                    </el-col>
                  </el-row>
                </el-card>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    // 自定义邮箱和手机验证规则
    var check = (rule, value, callback) => {
      const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      const regMobile = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (regEmail.test(value) || regMobile.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法的邮箱或手机号码'))
    }
    return {
      login_form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入手机或者邮箱', trigger: 'blur',validator: check, trigger: 'blur' },
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    SubmitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://127.0.0.1:7001/business/user/login', this.login_form)
            .then(res => {
              if (res.data.code === 0 ){
                localStorage.setItem('token',res.data.token)
                this.$router.push('/home')
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
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
