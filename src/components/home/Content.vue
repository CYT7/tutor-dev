<template>
  <div class="content">
    <el-container>
      <el-aside width="80%">
        <HomeSwiper></HomeSwiper>
      </el-aside>
      <el-main>
        <div>
          <h2 style="color:#409EFF">家教网</h2>
          <p style="font-size: 14px">提供家教平台</p>
          <el-divider></el-divider>
          <p> 一对一针对辅导真人互动式教学模式</p>
          <span>家教网为广大初中、高中学子提供优质的名师一对一辅导教学服务，包括中考冲刺、高考冲刺，全科辅导、专项辅导、提分突破，考点答疑等等</span>
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
  p,span,h2{
    line-height: 26px;
  }
</style>
