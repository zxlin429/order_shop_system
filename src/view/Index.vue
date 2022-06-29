<template>
    <div class="Index">
        <el-container>
            <el-header><Header /></el-header>
            <el-container>
                <el-aside width="200px"><Aside /></el-aside>
                <el-main><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Header from "@/components/Header";
import Aside from "@/components/Aside";
export default {
    name: "Index",
    components: { Header, Aside },
};
</script>

<style scoped>
.el-container {
    height: 100%;
}
.el-header {
    background: #2a2f32;
    color: #fff;
}
.el-container {
    flex: 1;
    height: 100vh;
}
.el-aside {
    background: #272a34;
}
.el-main {
    background: #e4e9ed;
}
</style>