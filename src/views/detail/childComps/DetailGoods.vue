<template>
  <div v-if="Object.keys(info).length !== 0" class="goods-info" >
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{info.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{info.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in info.detailImage[0].list" 
            :key="index" 
            :src="item" 
            @load="imageLoad"
            alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoods",
  data () {
    return {
      counter: 0,
      imagesLength:0
    };
  },
  props: {
    info: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    imageLoad() {
      if(++this.counter === this.imagesLength){
        this.$emit("imgLoad");
      }

    }
  },
  watch: {
    info() {
      this.imagesLength = this.info.detailImage[0].list.length;
    }
  }
}
</script>

<style scoped>
.image-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}
.info-desc {
  padding: 15px;
}
.info-desc .start,
.info-desc .end {
  position: relative;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}
.info-desc .start {
  float: left;
}
.info-desc .end {
  float: right;
}
.info-desc .start::before,
.info-desc .end::after {
  position: absolute;
  bottom: 0;
  width: 5px;
  height: 5px;
  content: "";
  background-color: #333333;
}
.info-desc .end::after {
  right: 0;
}
.info-desc .desc {
  font-size: 14px;
  padding: 15px 0;
}
.info-key {
  font-size: 15px;
  margin: 10px 0 10px 15px;
  color: #333333;
}
.info-list img {
  width: 100%;
}
</style>