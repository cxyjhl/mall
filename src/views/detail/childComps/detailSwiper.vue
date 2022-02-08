<template>
  <div>
    <swiper class="detail-swiper">
      <swiperItem v-for="(item, index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiperItem>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: "detailSwiper",
  data () {
    return {

    };
  },
  components: {
    Swiper, 
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted(){
    console.log(this.topImages)
  }
}
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>