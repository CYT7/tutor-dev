<template>
  <div style="margin-top: 20px">
    <el-row>
      <el-col :span="2"><div class="grid-content bg-purple">&nbsp;</div></el-col>
      <el-col :span="22"><div class="grid-content bg-purple-light">
        <el-header height="20px">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">家教网首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/TeachersWanted' }">需求信息库</el-breadcrumb-item>
            <el-breadcrumb-item>需求详情</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-container>
          <el-container>
            <el-main>
              <div class="body-border">
                <el-row style="margin-top: 20px;margin-left:10px;color: #409EFF">
                  <el-col style="font-weight: bold">具体要求</el-col>
                </el-row>
                <el-row>
                  <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">同学称呼</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.nickName}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">同学性别</div></el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-light">
                      <span v-if="parentList.gender ==0">不限</span>
                      <span v-else-if="parentList.gender ==1">男</span>
                      <span v-else>女</span>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">辅导科目</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.subject}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">教师性别要求</div></el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple-light">
                      <span v-if="parentList.teacherGender ==0">不限</span>
                      <span v-else-if="parentList.teacherGender ==1">男</span>
                      <span v-else>女</span>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">总共上几次课</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.frequency}}次</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">上课时间</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.teach_date}}</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">上课几小时</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.timeHour}}小时</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">课时费用</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.hourPrice}}元</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">需求总价格</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.totalPrice}}元</div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="5" ><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="6"><div class="grid-content bg-purple">所在城市区域</div></el-col>
                  <el-col :span="4"><div class="grid-content bg-purple-light">{{parentList.address}}</div></el-col>
                </el-row>
              </div>
            </el-main>
            <el-aside width="30%">
              <div class="body-border-2" style="margin-top: 20px">
                <el-row>
                  <el-col :span="2"><div class="grid-content bg-purple">&nbsp;</div></el-col>
                  <el-col :span="20"><div class="grid-content bg-purple-light" style="text-align: left; ">
                    <i class="el-icon-sunny">
                      <a style="font-size: 20px">应聘提示</a>
                    </i>
                    <br>
                    <a style="font-size: 15px ;line-height: 25px; margin-left:30px">家教只查看部分的需求信息而不能查看所有信息，家教如果应聘成功，会在个人中心查看到所有信息</a>
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
