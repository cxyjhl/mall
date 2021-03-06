import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 用来创建事件总线，方便兄弟组件之间的通信
Vue.prototype.$bus = new Vue();

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')