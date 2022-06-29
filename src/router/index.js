//引入vue、vueRouter（路由）
import Vue from "vue";
import VueRouter from "vue-router";
//使用路由插件
Vue.use(VueRouter);
//引入（路由）组件
import Login from "@/view/Login";
import Index from "@/view/Index";
import Home from "@/view/Home";
import Shop from "@/view/Shop";
import ShopImg from "@/view/ShopImg";
import Img from "@/view/Img";
const routes = [
    { name: "Login", path: "/login", component: Login },
    {
        name: "Index",
        path: "/",
        component: Index,
        children: [
            { name: "Home", path: "/", component: Home }, //主页
            { name: "Shop", path: "shop", component: Shop }, //商品管理
            { name: "ShopImg", path: "shopimg", component: ShopImg }, //商品图片管理
            { name: "Img", path: "img", component: Img }, //轮博图管理
        ],
    },
];

//创建路由实例
const router = new VueRouter({
    routes,
});
router.beforeEach((to, from, next) => {
    isLogin(to, from, next);
});
//路由守卫 是否登录
function isLogin(to, from, next) {
    if (to.path == "/login") {
        next();
    } else {
        if (
            typeof window.sessionStorage["token"] == "string" &&
            window.sessionStorage["token"].length > 0
        ) {
            //解析token
            next();
        } else {
            next("/login");
        }
    }
}
export default router;
