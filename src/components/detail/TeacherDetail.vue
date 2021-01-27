<template>
  <div>
    <el-col :span="20" offset="2"><teacher-header></teacher-header></el-col>
    <el-col :span="20"><teacher-message :teacher-list="teacherList"></teacher-message></el-col>
  </div>
</template>
<script>
  //导入一个ajax的请求库
  import axios from 'axios'
  import TeacherMessage from "./TeacherMessage.vue";
  import TeacherHeader from "./TeacherHeader.vue";
  const tokens = localStorage.getItem('token');
  export default {
    name: "ParentDetail",
    components:{
      TeacherHeader,
      TeacherMessage,
    },
    data(){
      return{
        teacherList: Object,
        tokens : [],
      }
    },
    created(){
      this.getParams()
    },
    methods:{
      getParams(){
        this.id =this.$route.query.id
        axios.post('http://127.0.0.1:7001/business/teacher/Information',{id:this.id},{
          headers:{
            authorization:`Bearer ${tokens}`
          }
        }).then(
          (res) => {
            const data = res.data.data;
            this.teacherList = data
            console.log(this.teacherList)
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
