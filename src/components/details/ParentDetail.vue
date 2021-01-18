<template>

  <div>
    <el-col :span="20" offset="2"><parent-header></parent-header></el-col>
    <el-col :span="20"><parent-message :parent-list="parentList"></parent-message></el-col>
  </div>

</template>

<script>
  import axios from 'axios'
  import ParentMessage from "./ParentMessage.vue";
  import ParentHeader from "./ParentHeader"
    export default {
        name: "ParentDetail",
        components:{
          ParentMessage,
          ParentHeader
        },
      data(){
        return{
          parentList: Object,
        }
      },
      mounted() {

        const msgid=this.$route.params.msgid
        console.log(msgid)

        const pid =this.$route.params.pid
        console.log(pid)

        axios.get('api/parent_details.json')
          .then(
            (resp) => {
              console.log("调用API");
              const data = resp.data;
              this.parentList = data
              console.log(this.parentList)
            },
            (err) => {
              console.log(err);
            }
          )
      }
    }
</script>

<style scoped>

</style>
