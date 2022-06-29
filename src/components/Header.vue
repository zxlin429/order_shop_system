<template>
    <div class="Header">
        <span class="systemName">后台管理系统</span>
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            background-color="#2a2f32"
            text-color="#fff"
            active-text-color="#fff"
        >
            <el-submenu index="1">
                <template slot="title">欢迎您:{{ phone }}</template>
                <el-menu-item index="1-1" @click="quit">退出登录</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "Header",
    mounted() {
        this.phone = localStorage["phone"];
    },
    data() {
        return {
            phone: "",
        };
    },
    methods: {
        quit() {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("phone");
            this.$router.push("/login");
        },
    },
};
</script>

<style scoped>
.Header {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.systemName {
    font-size: 23px;
}
.userName {
    font-size: 17px;
}
</style>