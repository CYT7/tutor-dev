<template>
  <div class="content">
    <el-container>
      <el-aside width="70%">
        <!--          <img src="../../assets/styles/images/banner1.png">-->
        <HomeSwiper></HomeSwiper>
      </el-aside>
      <el-main>
        <div>
          <h2 style="color:#409EFF">大学生家教网</h2>
          <p style="font-size: 12px">提供在线家教沟通平台</p>
          <el-divider></el-divider>
          <p> 针对一对一辅导自主研发真人在线互动式教学模式，足不出户，高效提分！</p>
          <span>大学生家教网坚持招募全国名校老师，为广大初中、高中学子提供优质的名师在线一对一辅导教学服务，包括中考冲刺、高考冲刺，全科辅导、专项辅导、提分突破，考点答疑等等</span>
        </div>
      </el-main>
    </el-container>
    <el-container>
      <el-main>
        <Recommend></Recommend>
      </el-main>
    </el-container>

  </div>
</template>

<script>
  import Login from "./Login";
  import Recommend from "./Recommend";
  import HomeSwiper from "./Swiper";
  export default {
    name: "Content",
    components:{
      HomeSwiper,
      Login,
      Recommend
    }
  }
</script>

<style scoped>
  p,span,h3{
    line-height: 26px;
  }
</style>
