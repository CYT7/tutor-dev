<template>
  <div style="margin-top: 20px">
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">&nbsp;</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">

        <el-header height="20px">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">家教网首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/hireteacher' }">招聘家教</el-breadcrumb-item>
            <el-breadcrumb-item>招聘详情</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>

        <el-container>
          <el-container>

            <el-main>
              <div class="top-border">
              <el-row class="top-text">
                <el-col :span="10"><div class="grid-content bg-purple-light">{{parentList.title}}</div></el-col>
              </el-row>
              </div>

              <div class="body-border">
                <el-row style="margin-top: 20px;margin-left:10px;color: #409EFF">
                  <el-col style="font-weight: bold">具体要求</el-col>
                </el-row>
              <el-row >
                <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">招聘编号</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple">{{parentList.msgid}}
                </div></el-col>
              </el-row>
              <el-row>
                <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">家长编号</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.pid}}</div></el-col>
              </el-row>

              <el-row>
                <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">教师要求</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.identities}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">辅导科目</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.major}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">价格</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.price}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">所在城市</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.address}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">学员性别</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.sex}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">发布信息的日期</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.publish}}</div></el-col>
              </el-row>
                <!--<el-row>
                  <el-button type="primary" style="margin-top: 8px;margin-bottom: 8px;margin-left: 10px">
                    <router-link :to="`/login`" class="router-link">
                    家教登录接洽</router-link></el-button>
                </el-row>-->
              </div>

            </el-main>


            <el-aside width="30%">
            <!--  <el-row style="margin-top: 20px">
                <div class="body-border-2" >
                <el-button type="primary" style="margin-top: 8px;margin-bottom: 8px"><router-link :to="`/login`" class="router-link">
                  家长登录</router-link></el-button>
                <el-button type="success"><router-link :to="`/tutorRegister`" class="router-link">家教注册</router-link></el-button>
                </div>
              </el-row>-->

              <div class="body-border-2" style="margin-top: 20px">
                <el-row>
                  <el-col :span="2"><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="20"><div class="grid-content bg-purple-light" style="text-align: left; ">
                    <i class="el-icon-sunny">
                      <a style="font-size: 20px">应聘提示</a>
                    </i>
                    <br>
                    <a style="font-size: 15px ;line-height: 25px; margin-left:30px">部分家长只查看家教信息而未发布招家教信息，家教如果完善自己的家教简历，会给提升自己的招聘成功率</a>
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

    export default {
        name: "ParentMessage",
        methods: {

        },
        props:{
          parentList:Object
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


</style>
