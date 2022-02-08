<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click = 'back'>
        <img src="~assets/img/common/back.svg" alt="">
      </div>

      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
              :key="index" 
              :class="{active: index === currentIndex}"
              class="title-item"
              @click = 'titleClick(index)'>
            {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/navbar.vue'

export default {
  name: "DetailNavBar",
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    };
  },
  components: {
    NavBar
  },
  methods: {
    titleClick(index){
      this.currentIndex = index;
      this.$emit('titleClick', index);
    },
    back() {
      this.$router.back();
    }
  }
}
</script>

<style scoped>
  .active {
    color: var(--color-high-text);
  }

  .title {
    display: flex;
  }

  .title-item {
    flex: 1;
  }
  
  .back {
    margin-top: 7px;
  }
</style>