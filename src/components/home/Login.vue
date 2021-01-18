<template>
  <div id="login">
    <el-row :gutter="20">
      <el-col :span="10" :offset="7" class="header">
        <div style="width: 180px;height: 60px">
          <img src="../../assets/styles/images/logo.png" class="logo"  style="width: 180px;height: 60px">
        </div>
      </el-col>
      <el-col :span="10" :offset="7">
        <div>
          <h2>家教网</h2>
          <el-divider></el-divider>
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="家长登录" name="first">
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
                        <el-button type="primary" @click="tutorSubmitForm('login_form')">登&nbsp;&nbsp;录</el-button>
                        <el-button @click="resetForm('login_form')">重&nbsp;&nbsp;置</el-button>
                      </el-form-item>
                    </el-form>
                  </el-row>
                  <el-row>
                    <el-col :offset="10">
                      <el-dropdown>
                        <span>
                          注册<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>
                            <router-link tag="div" :to="{name: 'RegisterTutor'}" class="header-abs">
                              <span>家教注册</span>
                            </router-link>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <router-link tag="div" :to="{name: 'RegisterParent'}" class="header-abs">
                              <span>家长注册</span>
                            </router-link>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-col>
                  </el-row>
                </el-card>
              </el-row>

            </el-tab-pane>
            <el-tab-pane label="家教登录" name="second">
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
                        <el-button type="primary" @click="parentSubmitForm('login_form')">登&nbsp;&nbsp;录</el-button>
                        <el-button @click="resetForm('login_form')">重&nbsp;&nbsp;置</el-button>
                      </el-form-item>
                    </el-form>
                  </el-row>
                  <el-row>
                    <el-col :offset="10">
                      <el-dropdown>
                        <span>
                          注册<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>
                            <router-link tag="div" :to="{name: 'RegisterTutor'}" class="header-abs">
                              <span>家教注册</span>
                            </router-link>
                          </el-dropdown-item>
                          <el-dropdown-item>
                            <router-link tag="div" :to="{name: 'RegisterParent'}" class="header-abs">
                              <span>家长注册</span>
                            </router-link>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
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
      callback(new Error('请输入合法的邮箱或手机'))
    }
    return {
      activeName: 'first',
      login_form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入手机或者邮箱', trigger: 'blur' },
          { validator: check, trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    tutorSubmitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const loginData = axios.post('http://127.0.0.1:7001/business/user/login', this.login_form)
            .then(response => {
              if (response.data.code === 0 ){
                this.$router.push('/home')
                this.$notify({
                  title:'Success',
                  dangerouslyUseHTMLString: true,
                  message: res.Msg,
                  type: 'Success'
                })
                console.log(response)
              }
            })
            .catch(function (error) {
              console.log(error)
            })
          console.log(loginData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    parentSubmitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const loginData = axios.post('http://127.0.0.1:7001/business/user/login', this.login_form)
            .then(function (response) {
              console.log(response)
            })
            .catch(function (error) {
              console.log(error)
            })
          console.log(loginData)
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
  .registerLink{
    text-decoration: none;
    color: #2c3e50;
  }
  .registerLink:hover{
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
