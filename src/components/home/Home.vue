<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="20" :offset="2" class="header"><Header></Header></el-col>
      <el-col :span="20" :offset="2" class="indexContent">
        <IndexContent></IndexContent>
      </el-col>
    </el-row>

  </div>

</template>

<script>
  import Header from "./Header";
  import IndexContent from "./Content";


  export default {
    name: "Home",
    components: {
      IndexContent,
      Header
    }
  }
</script>

<style scoped="scoped">
  .header{
    margin-top: 0px;
  }
  .indexContent{
    margin-top: 20px;
  }
</style>
