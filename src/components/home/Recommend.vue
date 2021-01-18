<template>
  <div class="recommend">
    <div class="tutorRecommend">
      <el-divider content-position="left">
        <i class="el-icon-menu" style="color: #409EFF"></i>&nbsp;&nbsp;&nbsp;&nbsp;推荐家教
      </el-divider>
      <div  v-for="list in tutorData" :key="list" class="tutorRecommend">
        <router-link :to="`/teacherDetail/${list.t_id}`">
          <el-card class="box-card" style="height: 330px" @click.native="tutorDetail(list.t_id)">
            <div  class="text item">
              <div style="display: flex;margin-left: 20px">
                <el-avatar :size="80" style="float: left;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <h3 style="float: left;margin-left: 80px">{{list.tname}}</h3>
              </div>
              <div>
                <ul class="info">
                  <li><span>就读学校:</span>&nbsp;&nbsp;&nbsp;&nbsp;{{list.school}}</li>
                  <li><span>所在城市:</span>&nbsp;&nbsp;&nbsp;&nbsp;{{list.city}}</li>
                  <li><span>教授学科:</span>&nbsp;&nbsp;&nbsp;&nbsp;{{list.subject}}</li>
                  <li><span>授课价格:</span>&nbsp;&nbsp;&nbsp;&nbsp;{{list.subject}}</li>
                  <li><span>曾获荣誉:</span>&nbsp;&nbsp;&nbsp;&nbsp;{{list.honor}}</li>
                </ul>
              </div>
            </div>
          </el-card>
        </router-link>

      </div>
    </div>
    <div class="recruitRecommend">
      <el-divider content-position="left">
        <i class="el-icon-s-operation" style="color: #409EFF"></i>&nbsp;&nbsp;&nbsp;&nbsp;推荐招聘
      </el-divider>
      <div  v-for="list in recruitData" :key="list" class="recruitRecommend">

        <router-link :to="`/parentDetail/${list.msgid}/${list.pid}`">
          <el-card class="box-card" style="height: 248px;" @click.native="recruitDetail(list.msgid)">
            <div  class="text item">
              <span style="font-size: 20px;font-weight: bolder">{{list.title}}</span>
              <div>
                <ul class="info">
                  <li>辅导学科:&nbsp;&nbsp;&nbsp;&nbsp;{{list.major}}</li>
                  <li>所在城市:&nbsp;&nbsp;&nbsp;&nbsp;{{list.city}}</li>
                  <li>性别要求:&nbsp;&nbsp;&nbsp;&nbsp;{{list.sex}}</li>
                  <li>授课地址:&nbsp;&nbsp;&nbsp;&nbsp;{{list.address}}</li>
                </ul>
              </div>
            </div>
          </el-card>
        </router-link>

      </div>
    </div>

  </div>
</template>

<script>
  // 导入ajax请求库
  import axios from 'axios'
  export default {
    name: "Recommend",
    data() {
      return {
        tutorData:[],
        recruitData:[]
      };
    },
    mounted() {
      axios.get('/api/tutorRecommend.json') // 返回ES6 Promise对象: resovle : Function, reject : Function
        .then( (resp) => {  // 箭头函数不会创建自己的this，只继承父级链上的this
          const tutors = resp.data.tutorRecommend
          this.tutorData = tutors;
          console.log(tutors);

        }) // success, 注意这里传入的是函数对象没有()号
        .catch(function (error) {   // failure
          console.log(error);
        });

      axios.get('/api/recruitRecommend.json') // 返回ES6 Promise对象: resovle : Function, reject : Function
        .then( (resp) => {  // 箭头函数不会创建自己的this，只继承父级链上的this
          const recruit = resp.data.recruitRecommend
          this.recruitData = recruit;
          console.log(recruit);

        }) // success, 注意这里传入的是函数对象没有()号
        .catch(function (error) {   // failure
          console.log(error);
        });
    }
    // methods:{
    //   recruitDetail(value){

    // <template slot-scope="scope">
    //     <router-link
    // :to="`/parentDetail/${scope.row.msgid}/${scope.row.pid}`"><!--传俩id-->
    //     <el-button type="text" size="small" icon="el-icon-thumb">查看</el-button>
    //     </router-link>
    //     </template>

    //     this.$router.push({path:'/recruitDetail',query:{msgid:value}})
    //   },
    //   tutorDetail(value){
    //     // this.$router.push({path:'/tutorDetail',query:{t_id:value}})
    //   }
    // }
  }
</script>

<style scoped="scoped">
  .box-card{
    width:480px;
    display: flex;
    float: left;
    margin: 10px;
  }
  *{
    font-size: 18px;
    line-height: 28px;
  }
  li{
    list-style-type:none;
  }
  .info{
    text-align: left;
  }
  span{
    color: #409EFF;
  }

  .tutorRecommend,.recruitRecommend{
    margin-top: 18px;
    float: left;
  }
</style>
