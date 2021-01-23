<template>
  <div>
    <el-col :span="20" offset="2"><parent-header></parent-header></el-col>
    <el-col :span="20"><parent-message :parent-list="parentList"></parent-message></el-col>
  </div>
</template>
<script>
  import axios from 'axios'
  import ParentMessage from "./ParentMessage.vue";
  import ParentHeader from "./ParentHeader";
  const tokens = localStorage.getItem('token');
  export default {
    name: "ParentDetail",
    components:{
      ParentMessage,
      ParentHeader
    },
    data(){
      return{
        parentList: Object,
        tokens : [],
        id:[]
      }
    },
    created(){
      this.getParams()
    },
    // mounted() {
    //   const id =this.$route.params.id
    //   console.log(id)
    //   axios.post('http://127.0.0.1:7001/business/need/information',{id:this.$route.params.id},{
    //     headers:{
    //       authorization:`Bearer ${tokens}`
    //     }
    //   }).then(
    //       (res) => {
    //         const data = res.data.data;
    //         this.parentList = data
    //         console.log(this.parentList)
    //       },
    //       (err) => {
    //         console.log(err);
    //       }
    //     )
    // }
    methods:{
      getParams(){
        const id =this.$route.params.id
        console.log(id)
        axios.post('http://127.0.0.1:7001/business/need/information',{id:id},{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(
          (res) => {
            const data = res.data.data;
            this.parentList = data
            console.log(this.parentList)
          },
          (err) => {
            console.log(err);
          }
        )
      }
    }
  }
</script>
<style scoped>
</style>
