import Vue from "vue";
import App from "./App.vue";
//引入elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//引入router路由
import router from "@/router";
Vue.config.productionTip = false;
//使用elementUI插件
Vue.use(ElementUI);

new Vue({
    render: (h) => h(App),
    //挂载路由实例
    router,
}).$mount("#app");
