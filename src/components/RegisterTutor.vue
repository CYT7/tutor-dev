<template>
  <div id="tutorRegister">
    <el-row type="flex" justify="center" class="tutorRegisterForm">
      <el-col :span="10">
        <el-card shadow="hover">
          <el-row>
            <div style="width: auto;height: 60px;display:flex;">
              <img src="../assets/styles/images/logo.png" class="logo" style="width: 180px;height: 60px;float: left">
              <h2 style="float: left">大学生家教网-家教注册</h2>
            </div>
            <el-divider></el-divider>
            <el-form :label-position="right" label-width="80px"  :model="tutorRegisterForm" :rules="rules" ref="tutorRegisterForm">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="tutorRegisterForm.username" name="username" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密 码" prop="password">
                <el-input v-model="tutorRegisterForm.password" type="password" name="password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="repassword">
                <el-input v-model="tutorRegisterForm.repassword" type="password" name="repassword" placeholder="请再次输入密码"></el-input>
              </el-form-item>
              <el-form-item label="性 别" prop="gender">
                <el-radio-group v-model="tutorRegisterForm.gender" name="gender" size="medium">
                  <el-radio  label="男"></el-radio>
                  <el-radio  label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="学校" prop="school">
                <el-input v-model="tutorRegisterForm.school" name="school" placeholder="请输入学校名称"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="tutorRegisterForm.email" name="email" placeholder="请输入邮箱"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="tutorRegisterForm.phone" name="phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="城市" prop="city">
                <el-cascader
                  style="float: left"
                  placeholder="请选择城市"
                  :options="options"
                  v-model="tutorRegisterForm.city"
                  :show-all-levels="false">
                </el-cascader>
              </el-form-item>
              <el-form-item label="学科" prop="checkSubjects">
                <el-checkbox-group
                  v-model="tutorRegisterForm.checkSubjects">
                  <el-checkbox v-for="subject in tutorRegisterForm.subjects" :label="subject" :key="subject">{{subject}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="价格" prop="price">
                <el-input v-model="tutorRegisterForm.price" name="school" placeholder="请输入课时价格"></el-input>
              </el-form-item>
              <el-form-item label="授课时间" prop="time">
                <!--                <el-input v-model="tutorRegisterForm.time" name="time" placeholder="请输入授课时间"></el-input>-->
                <el-cascader
                  v-model="tutorRegisterForm.time"
                  :options="times"
                  :props="{ expandTrigger: 'hover', multiple: true }"
                  style="float: left;width: 400px"
                  @change="handleChange"></el-cascader>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('tutorRegisterForm')">提&nbsp;&nbsp;交</el-button>
                <el-button @click="resetForm('tutorRegisterForm')">重&nbsp;&nbsp;置</el-button>
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
const subjectOptions = ['语文', '数学', '英语', '物理', '化学', '生物', '政治', '历史', '地理', '其他']
export default {
  name: 'RegisterTutor',
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
        if (this.tutorRegisterForm.repassword !== '') {
          this.$refs.tutorRegisterForm.validateField('repassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.tutorRegisterForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 城市数据
      options: provinceAndCityData,
      times: [{
        value: 1,
        label: '星期一',
        children: [{
          value: 1 - 1,
          label: '上午'
        }, {
          value: 1 - 2,
          label: '下午'
        }, {
          value: 1 - 3,
          label: '晚上'
        }
        ]
      }, {
        value: 2,
        label: '星期二',
        children: [{
          value: 2 - 1,
          label: '上午'
        }, {
          value: 2 - 2,
          label: '下午'
        }, {
          value: 2 - 3,
          label: '晚上'
        }
        ]
      }, {
        value: 3,
        label: '星期三',
        children: [{
          value: 3 - 1,
          label: '上午'
        }, {
          value: 3 - 2,
          label: '下午'
        }, {
          value: 3 - 3,
          label: '晚上'
        }
        ]
      }, {
        value: 4,
        label: '星期四',
        children: [{
          value: 4 - 1,
          label: '上午'
        }, {
          value: 4 - 2,
          label: '下午'
        }, {
          value: 4 - 3,
          label: '晚上'
        }
        ]
      }, {
        value: 5,
        label: '星期五',
        children: [{
          value: 5 - 1,
          label: '上午'
        }, {
          value: 5 - 2,
          label: '下午'
        }, {
          value: 5 - 3,
          label: '晚上'
        }
        ]
      }, {
        value: 6,
        label: '星期六',
        children: [{
          value: 6 - 1,
          label: '上午'
        }, {
          value: 6 - 2,
          label: '下午'
        }, {
          value: 6 - 3,
          label: '晚上'
        }
        ]
      }, {
        value: 7,
        label: '星期日',
        children: [{
          value: 7 - 1,
          label: '上午'
        }, {
          value: 7 - 2,
          label: '下午'
        }, {
          value: 7 - 3,
          label: '晚上'
        }
        ]
      }],
      tutorRegisterForm: {
        username: '',
        password: '',
        repassword: '',
        gender: '男',
        school: '',
        email: '',
        phone: '',
        city: '',
        subjects: subjectOptions,
        checkSubjects: [],
        price: '',
        time: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10个字符', trigger: 'blur' }
        ],
        password: [
          {required: true, validator: validatePass1, trigger: 'blur'},
          { min: 6, message: '密码长度最少为6位', trigger: 'blur'}
        ],
        repassword: [
          {required: true, validator: validatePass2, trigger: 'blur'},
          { min: 6, message: '密码长度最少为6位', trigger: 'blur'}
        ],
        phone: [
          {validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const registerData = axios.post('tutorRegister', this.login_form)
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
