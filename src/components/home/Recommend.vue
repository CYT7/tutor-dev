<template>
  <div class="recommend">
    <div class="tutorRecommend" v-if="tutorData?tutorData:''">
      <el-divider content-position="left">
        <i class="el-icon-menu" style="color: #409EFF"></i>&nbsp;&nbsp;&nbsp;&nbsp;家教推荐
      </el-divider>
      <div v-for="list in tutorData"class="tutorRecommend">
        <router-link :to="{path:`/TeacherDetail`,name:`TeacherDetail`,params:{id:list.id},query:{id:list.id}}">
          <el-card class="box-card" style="height: 330px">
            <div  class="text item">
              <div style="display: flex;margin-left: 20px">
                <el-avatar :size="60" style="float: left;"  :src="list.User.image_url" :key="list.User.image_url" v-if="list.User.image_url !== null" shape="square"></el-avatar>
                <el-avatar v-else :size="60" style="float: left;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" shape="square"></el-avatar>
                <h3 style="float: left;margin-left: 80px">{{list.realName}}老师</h3>
              </div>
              <div>
                <ul class="info">
                  <li><span>就读学校:</span>&nbsp;&nbsp;&nbsp;&nbsp;{{list.school}}</li>
                  <li><span>所在城市:</span>&nbsp;&nbsp;&nbsp;&nbsp;{{formatAddress(list.city)}}</li>
                  <li><span>擅长学科:</span>&nbsp;&nbsp;&nbsp;&nbsp;{{list.goodAt}}</li>
                  <li><span>成功次数:</span>&nbsp;&nbsp;&nbsp;&nbsp;{{list.totalSuccess}}</li>
                  <li><span>课时费用:</span>&nbsp;&nbsp;&nbsp;&nbsp;{{list.hourPrice}}元/时</li>
                </ul>
              </div>
            </div>
          </el-card>
        </router-link>
      </div>
    </div>
    <div class="recruitRecommend" v-if="needData?needData:''">
      <el-divider content-position="left">
        <i class="el-icon-s-operation" style="color: #409EFF"></i>&nbsp;&nbsp;&nbsp;&nbsp;需求推荐
      </el-divider>
      <div  v-for="list in needData" class="recruitRecommend">
        <router-link :to="{path:`/parentDetail`,name:`ParentDetail`,params:{id:list.id},query:{id:list.id}}">
          <el-card class="box-card" style="height: 248px;">
            <div  class="text item">
              <div>
                <ul class="info">
                  <li>辅导学科:&nbsp;&nbsp;&nbsp;&nbsp;<span>{{list.subject}}</span></li>
                  <li>授课总价:&nbsp;&nbsp;&nbsp;&nbsp;<span>{{list.totalPrice}}元</span></li>
                  <li>课时费用:&nbsp;&nbsp;&nbsp;&nbsp;<span>{{list.hourPrice}}元/时</span></li>
                  <li>授课地址:&nbsp;&nbsp;&nbsp;&nbsp;<span>{{formatAddress(list.city)}}</span></li>
                  <li>发布时间：&nbsp;&nbsp;<span>{{formatDate(list.createTime)}}</span></li>
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
  import { CodeToText } from 'element-china-area-data'
  const tokens = localStorage.getItem('token');
  export default {
    name: "Recommend",
    data() {
      return {
        tutorData:[],
        needData:[],
        tokens : []
      };
    },
    mounted() {
      //家教推荐
      axios.get('http://127.0.0.1:7001/business/teacher/recommendList',{
        headers:{
          authorization:`Bearer ${tokens}`
        }
      }).then( (res) => {
        this.tutorData = res.data.data
        }).catch(function (error) {
          console.log(error);
        });
      //需求推荐
      axios.get('http://127.0.0.1:7001/business/need/list',{
        headers:{
          authorization:`Bearer ${tokens}`
        }
      }).then( (res) => {
        this.needData = res.data.data
        }).catch(function (error) {
          console.log(error);
        });
    },
    methods:{
      formatDate: function (value) {
        const timestamp = Date.parse(new Date())
        console.log(timestamp-value* 1000)
        if (timestamp-value < 3600000 ) {
          return ''
        } else {
          let date = new Date(value* 1000);
          let y = date.getFullYear();
          let MM = date.getMonth() + 1;
          MM = MM < 10 ? ('0'+ MM ) : MM;
          let d = date.getDate();
          d = d < 10 ? ('0' + d ) : d;
          let h = date.getHours();
          h = h < 10 ? ('0' + h ) : h;
          let m = date.getMinutes();
          m = m < 10 ? ('0' + m ) : m;
          let s = date.getSeconds();
          s = s < 10 ? ('0' + s ) : s;
          return y + '-' + MM + '-' + d + '-' + h + ':' + m + ':' + s;
        }
      },
      formatAddress: function (value) {
        if (value === null) {
          return null
        }
        let area = ''
        switch (value.length) {
          case 1:
            area += CodeToText[value[0]]
            break
          case 2:
            area += CodeToText[value[0]] + '/' + CodeToText[value[1]]
            break
          case 3:
            area += CodeToText[value[0]] + '/' + CodeToText[value[1]] + '/' + CodeToText[value[2]]
            break
          default:
            break
        }
        return area
      },
    }
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
