<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick='titleClick'></detail-nav-bar>
    <scroll class="detail-content" :probeType="3" :pullUpLoad="true" ref="scroll">
      <detail-swiper :top-images='topImages'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods :info='info' @imgLoad="imgLoad" ref="goods"></detail-goods>
      <detail-params :goodsParams='goodsParams' ref="params"></detail-params>
      <goods-list :goods = "recommend" ref="recommend"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from 'views/detail/childComps/DetailNavBar.vue'
import DetailSwiper from 'views/detail/childComps/detailSwiper.vue'
import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo.vue'
import DetailShopInfo from 'views/detail/childComps/DetailShopInfo.vue'
import DetailGoods from 'views/detail/childComps/DetailGoods.vue'
import DetailParams from 'views/detail/childComps/DetailParams.vue'

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {getDetail, Goods, Shop, GoodsParams, getRecommend} from 'network/detail.js'
import {debounce} from 'common/utils.js'
import {itemListenerMixin} from 'common/mixin.js'

export default {
  name: "detail",
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      info: {},
      goodsParams: {},
      recommend: [],
      themeTopY: [],
      getThemeTopY: null,
    };
  },
  mixins: [itemListenerMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoods,
    DetailParams,
    Scroll,
    GoodsList
  },
  created(){
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      this.shop = new Shop(data.shopInfo);
      this.info = data.detailInfo;
      this.goodsParams = new GoodsParams(data.itemParams.info, data.itemParams.rule || {});
    })
    getRecommend(this.iid).then(res => {
      this.recommend = res.data.list;
      // console.log(this.recommend);
    })

    // create数据请求完毕后还需要对数据进行渲染，调用updatad对数据进行更新
    // 调用nextTick函数要传入一个回调函数，当数据请求渲染完毕后，就会来nextTick调用回调函数
    // 但是这里只是把对应的DOM渲染完毕了，但是对应的图片依然没有加载完毕
    this.getThemeTopY = debounce(() => {
      this.$nextTick( () => {
        this.themeTopY = [];
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.goods.$el.offsetTop);
        this.themeTopY.push(this.$refs.params.$el.offsetTop);
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      }, 100)
    }) 
  },

  //通过mixin混入抽离mounted的代码和home公用 
  mounted() {
    // mounted中执行时有时候数据的请求还没有完成
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListener);
  },
  methods: {
    imgLoad(){
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 100);
    }
  }
}
</script>

<style scoped>
  .detall {
    position: relative;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .detail-content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>