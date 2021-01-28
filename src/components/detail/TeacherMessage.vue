<template>
    <div class="teacher" style="margin-top: 20px">
      <el-row >
        <el-col :span="2"><div class="grid-content bg-purple">&nbsp;</div></el-col>
        <el-col :span="22"><div class="grid-content bg-purple-light">
          <el-container>
            <el-header height="20px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">家教网首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/TeacherInfo' }">找家教</el-breadcrumb-item>
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
                        <a style="font-size: 20px;margin-top: 20px">{{teacherList.User.nickName}}老师</a>
                      </i>
                      <div class="grid-content bg-purple">
                        <i class=" el-icon-phone-outline"></i>
                        手机已验证畅通</div>
                      <br>
                    </div>
                      <el-row>
                        <el-col :span="10"><div class="grid-content bg-purple" style="font-weight: bold;color: #409EFF">身份验证</div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple">
                          <i class="el-icon-success"></i>学生证认证
                          <i class="el-icon-success"></i>身份证认证
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
                    <el-col :span="4"><div class="grid-content bg-purple">家教年龄</div></el-col>
                    <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.age}}岁</div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple">教学年龄</div></el-col>
                    <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.experience}}年</div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple">成功次数</div></el-col>
                    <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.totalSuccess}}</div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple">所在城市</div></el-col>
                    <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.city}}</div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple">辅导科目</div></el-col>
                    <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.goodAt}}</div></el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                    <el-col :span="4"><div class="grid-content bg-purple">授课价格</div></el-col>
                    <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.hourPrice}}元/小时</div></el-col>
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
                      <br><a style="font-size: 15px ;line-height: 25px; margin-left:30px">该家教我承诺在见面第一时间出示证件，但是为了确保您的个人信息以及孩子的信息安全，请提高防范</a>
                      </div>
                    </el-col>
                    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                  </el-row>
                </div>
              </el-aside>
            </el-container>
          </el-container>
        </div>
        </el-col>
      </el-row>
      <el-dialog title="新建预约" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
        <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2" label-width="140px" class="demo-ruleForm">
          <el-form-item label="学生称呼" prop="name"><el-input v-model="ruleForm2.name" /></el-form-item>
          <el-form-item label="科目" prop="subject"><el-input v-model="ruleForm2.subject" /></el-form-item>
          <el-form-item label="预约上几次家教" prop="frequency"><el-input v-model="ruleForm2.frequency" /></el-form-item>
          <el-form-item label="上课时间" prop="teach_date"><el-input v-model="ruleForm2.teach_date" /></el-form-item>
          <el-form-item label="每次上几小时" prop="timeHour"><el-input v-model="ruleForm2.timeHour" /></el-form-item>
          <el-form-item label="上课地址" prop="address"><el-input v-model="ruleForm2.address" /></el-form-item>
          <el-form-item label="课时费用" prop="hourPrice"><el-input v-model="ruleForm2.hourPrice" /></el-form-item>
          <el-form-item label="联系方式" prop="phone"><el-input v-model="ruleForm2.phone" /></el-form-item>
          <el-form-item label="QQ" prop="qq"><el-input v-model="ruleForm2.qq" /></el-form-item>
          <el-form-item label="微信号" prop="qq"><el-input v-model="ruleForm2.qq" /></el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>
<script>
  export default {
    name: "TeacherMessage",
    data(){
      return {
        dialogVisible2:false,
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
          subject:'',
          id:''
        },
        rules2: {
          name: [{ required: true, message: '请输入学生称呼', trigger: 'blur' }]
        }
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
    },
    props: {
      teacherList: []
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
    /*line-height: 20px;*/
  }
  .el-aside {
    /*background-color: #D3DCE6;*/
    color: #333;
    text-align: center;
    line-height: 20px;
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
    /*margin-top: 2px*/
  }
  .favorites{
    margin-top: 8px;
    margin-bottom: 8px;
    margin-right: 40px;
    float: right
  }
</style>
