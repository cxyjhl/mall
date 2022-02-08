<template>
  <div class="param-info">
    <table v-for="(table, index) in goodsParams.sizes" 
          :key="index"
          class="info-size">
        <tr v-for="(tr, index) in table" :key="index">
          <td v-for="(td, index) in tr" :key="index">{{td}}</td>
        </tr>
    </table>
    <table class="info-param">
      <tr v-for="(info, index) in goodsParams.infos" :key="index">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="goodsParams.image !== ''">
      <img :src="goodsParams.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParams",
  data () {
    return {

    };
  },
  props: {
    goodsParams: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.param-info {
  font-size: 14px;
  padding: 20px 15px;
  border-bottom: 5px solid #f2f5f8;
}
.param-info p {
  font-size: 15px;
  margin-bottom: 10px;
}
.param-info table {
  width: 100%;
  border-collapse: collapse;
}
.param-info table tr {
  height: 42px;
}
.param-info table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.info-param-key {

  width: 95px;
}
.info-param {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.param-value {
  color: #eb4868;
}
.info-img img {
  width: 100%;
}
</style>