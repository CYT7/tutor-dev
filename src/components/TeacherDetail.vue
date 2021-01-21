<template>
  <div class="teacher">

    <el-col :span="20" offset="2"><teacher-header></teacher-header></el-col>
    <el-col :span="20"><teacher-message :teacher-list="teacherList"></teacher-message></el-col>
  </div>

</template>

<script>
  //导入一个ajax的请求库
  import axios from 'axios'
  import TeacherMessage from "./TeacherMessage.vue";
  import TeacherHeader from "./TeacherHeader.vue";
    export default {
        name: "TeacherDetail",
      data(){
        return{
          teacherList: Object,
        }
      },
        components:{
          TeacherMessage,
          TeacherHeader
        },
      methods:{

      },
        mounted() {

          const id=this.$route.params.id
          console.log(id)

          axios.get('api/teacher_details.json')
            .then(
              (resp) => {
                console.log("调用API");
                const data = resp.data;
                this.teacherList = data;
                console.log(this.teacherList)
                /*this.teacherList = this.teacherList[0]
                console.log(this.teacherList)*/
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
