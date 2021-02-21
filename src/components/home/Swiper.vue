<template>
  <div class="wrapper">
    <swiper :options="swiperOption" >
      <swiper-slide v-for="item in swiperList" :key="item.id">
        <img :src="item.carousel" class="swiper-img">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
  import axios from 'axios'
  const Token = localStorage.getItem('token');
  export default {
    name: "HomeSwiper",
    data() {
      return {
        swiperOption: {
          autoplay: 3000,
          pagination: '.swiper-pagination',
          loop: true
        },
        swiperList: []
      }
    },
    created() {
      this.getList();
    },
    methods:{
      getList(){
        axios.get('http://127.0.0.1:7001/business/banner/list',{
          headers:{
            authorization:`Bearer ${Token}`
          }
        }).then((res) => {
            this.swiperList = res.data.data
            console.log(this.swiperList)
          },
          (err) => {
            console.log(err);
          }
        )
      },
    }
  }
</script>
<style scoped>
  .swiper-img{
    width: 780px;
    height: 450px
  }
</style>
