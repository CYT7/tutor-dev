<template>
  <div class="wrapper">
    <swiper :options="swiperOption" >
      <swiper-slide v-for="item in swiperList" :key="item.id">
        <img :src="item.url" class="swiper-img">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
  export default {
    name: "HomeSwiper",
    data() {
      return {
        swiperOption: {
          autoplay: 3000,
          pagination: '.swiper-pagination',
          loop: true
        },
        swiperList: [
          {
            id: "0001", url:require('../assets/styles/images/banner1.png')
          },
          {
            id: "0002",  url:require('../assets/styles/images/banner2.png')
          },
          {
            id: "0003",  url:require('../assets/styles/images/banner3.png')
          }
        ]
      }
    }
  }
</script>
<style scoped>
  .swiper-img{
    width: 780px;
    height: 450px
  }
</style>

