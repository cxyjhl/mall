<template>
  <div class="goods-item" @click='itemClick'>
    <!-- @load是vue框架用来监听事件加载 -->
    <img :src="showImage" alt="" @load='imageLoad'>
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="cfav">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  data () {
    return {

    };
  },
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoad() {
      // 因为在其他界面也有用到这个组件
      // 所以我们需要判断什么时候监听
      // 1.通过路由进行判断
        // 判断路由的url让每个页面去监听自己的事件
      // if($route.path.indexOf('/home')) {
      //   this.$bus.$emit('homeitemImageLoad');
      // }else if($route.path.indexOf('/detail')){
      //   this.$bus.$emit('detailitemImageLoad');
      // }

      // 2.在首页中判断，当离开首页后，就可以取消监听事件

      this.$bus.$emit('itemImageLoad');
    },
    itemClick(){
      this.$router.push('/detail/' + this.goodsItem.iid);
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img ;
    }
  }
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .cfav {
    position: relative;
  }

  .goods-info .cfav::before {
    content: "";
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>