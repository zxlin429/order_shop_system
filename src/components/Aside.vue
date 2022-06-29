<template>
    <div class="Aside">
        <!-- 侧边栏 -->
        <el-menu
            router
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#272a34"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <el-menu-item
                :index="item.path"
                v-for="item in asideList"
                :key="item.id"
            >
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "Aside",
    data() {
        return {
            asideList: [
                {
                    id: "1",
                    name: "用户查询",
                    path: "/",
                    icon: "el-icon-s-home",
                },
                {
                    id: "2",
                    name: "商品管理",
                    path: "/shop",
                    icon: "el-icon-s-data",
                },
                // {
                //     id: "3",
                //     name: "商品图片管理",
                //     path: "/shopimg",
                //     icon: "el-icon-picture",
                // },
                {
                    id: "4",
                    name: "轮播图管理",
                    path: "/img",
                    icon: "el-icon-menu",
                },
            ],
        };
    },
};
</script>

<style scoped>
.Aside .el-menu {
    border-right: none;
}
</style>