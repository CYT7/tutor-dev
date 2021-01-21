<template>
    <div class="teacher" style="margin-top: 20px">
      <el-row >
        <el-col :span="2"><div class="grid-content bg-purple">&nbsp;</div></el-col>
        <el-col :span="22"><div class="grid-content bg-purple-light">

          <el-container>
            <el-header height="20px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">家教网首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/teacherinfo' }">找家教</el-breadcrumb-item>
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
                        <a style="font-size: 20px;margin-top: 20px">{{teacherList.tname}}老师</a>
                      </i>
                      <div class="grid-content bg-purple">
                        <i class=" el-icon-phone-outline"></i>
                        手机已验证畅通</div>
                      <br>
                    </div>
                      <el-row>
                        <el-col :span="10"><div class="grid-content bg-purple" style="font-weight: bold;color: #409EFF">身份验证</div></el-col>
                        <el-col :span="14"><div class="grid-content bg-purple">
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
             <!--   <el-row >
                  <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="4" style="font-size: 18px">
                    <div class="grid-content bg-purple">
                      <i class="el-icon-user"></i>
                      {{teacherList.tname}}
                    </div>
                  </el-col>
                  <el-col :span="8"style="font-size: 12px">
                    <div class="grid-content bg-purple">
                      <i class=" el-icon-phone-outline"></i>
                      手机已验证畅通</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">身份验证</div></el-col>
                  <el-col :span="10"><div class="grid-content bg-purple">
                    <i class="el-icon-success"></i>学生认证
                    <i class="el-icon-success"></i>身份证认证
                  </div></el-col>
                </el-row>-->
                <div class="body-border">
                <el-row style="margin-top: 20px">
                  <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">家教编号</div></el-col>
                  <el-col :span="10"><div class="grid-content bg-purple">{{teacherList.t_id}}</div></el-col>
                </el-row>
                <el-row>
                <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple">教师性别</div></el-col>
                <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.gender}}</div></el-col>
              </el-row>
                <el-row>
                  <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">就读院校</div></el-col>
                  <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.school}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">电子邮箱</div></el-col>
                  <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.email}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">电话号码</div></el-col>
                  <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.phone}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">所在城市</div></el-col>
                  <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.city}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">辅导科目</div></el-col>
                  <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.subject}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">授课价格</div></el-col>
                  <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.price}}元/小时</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">授课时长</div></el-col>
                  <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.tea_time}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">教学年龄</div></el-col>
                  <el-col :span="10"><div class="grid-content bg-purple-light">{{teacherList.tea_age}}年</div></el-col>
                </el-row>
                <el-row style="line-height: 20px">
                  <el-col :span="2" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple">个人简历</div></el-col>
                  <el-col :span="16"><div class="grid-content bg-purple-light">{{teacherList.honor}}</div></el-col>
                </el-row>
                <el-row>
                  <el-button type="primary" class="favorites" @click="send" >{{con}}</el-button>
                </el-row>
                </div>
              </el-main>


              <el-aside width="20%">
                <div class="body-border-2" style="margin-top: 20px">
                  <el-row >
                    <el-col :span="2"><div class="grid-content bg-purple">&nbsp;</div></el-col>
                    <el-col :span="20"><div class="grid-content bg-purple-light" style="text-align: left;margin-top: 20px ;line-height: 30px">
                      <i class="el-icon-sunny">
                        <a style="font-size: 20px;margin-top: 20px">家长使用帮助</a>
                      </i>
                      <br>
                      <a style="font-size: 15px ;line-height: 25px; margin-left:30px">该家教我承诺在见面第一时间出示证件，但是为了确保您的个人信息以及孩子的信息安全，请提高防范</a>
                    </div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                  </el-row>
                </div>

              </el-aside>
            </el-container>

          </el-container>
        </div>
        </el-col>
      </el-row>

    </div>



</template>

<script>
  import axios from 'axios'
    export default {
      name: "TeacherMessage",
      data() {
        return {
          t_id:'',
          p_id:'',
          con:"收藏",
          flag:false//单位切换开关
        }
      },
      methods: {
        send(){
         /* this.t_id = this.teacherList.t_id
          this.p_id=this.teacherList.pid*/

          this.flag=!this.flag;
          if(this.flag==true){
            this.con="取消收藏";
            this.t_id = this.teacherList.t_id
            this.p_id=this.teacherList.pid

          }else if(this.flag==false){
            this.con="收藏";
            this.t_id = null
            this.p_id = null
          }

          axios.get('api/teacher_details.json')
            .then(
              (resp) => {
                /*const data = resp.data
                this.teacherList2 = data*/
                console.log("用户的ID："+this.p_id)
                console.log("家教信息的ID："+this.t_id)
                /*console.log(this.teacherList2)*/
              },
              (err) => {
                console.log(err);
              }
            )
        }
      },
        props: {
          teacherList: Object
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
