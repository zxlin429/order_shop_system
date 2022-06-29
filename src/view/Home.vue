<template>
    <div class="Home">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>用户查询</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table
            :data="userList"
            stripe
            max-height="'calc(100vh - 150px)'"
            style="width: 100%; margin-top: 10px"
        >
            <el-table-column
                prop="id"
                label="id"
                width="'10%'"
            ></el-table-column>

            <el-table-column prop="phone" label="手机号" width="'22%'">
            </el-table-column>
            <el-table-column label="性别" width="'16%'">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        {{ scope.row.sex || "无数据" }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="生日" width="'16%'">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        {{ scope.row.birthday || "无数据" }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="balance" label="钱包" width="'16%'">
            </el-table-column>
            <el-table-column prop="noun" label="积分"> </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                layout="prev, pager, next"
                :total="page.pageSize"
                :page-size="page.size"
                background
                :current-page="page.pageNumber"
                @next-click="changePage(1)"
                @prev-click="changePage(0)"
                @current-change="changePageThis"
                :hide-on-single-page="!isList"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getAllUser } from "@/api/shop/shop.js";
export default {
    name: "Home", //查询用户信息页面
    data() {
        return {
            page: {
                pageNumber: 1, //当前页
                size: 10, //每页大小
                pageSize: 0, //总数据
            },
            userList: [], //当前页数据
        };
    },
    computed: {
        isList() {
            //判断是否有数据，没有不显示分页栏
            if (!this.page.pageSize) {
                return false;
            } else {
                return true;
            }
        },
    },
    mounted() {
        this.getUser();
    },
    methods: {
        getUser() {
            //获取用户信息
            getAllUser(this.page)
                .then((res) => {
                    if (res.code == 200) {
                        this.page.pageSize = res.data.allUser.total;
                        this.userList = [];
                        this.userList = res.data.allUser.records;
                    } else {
                        this.$message({
                            message: res.message || res.msg,
                            type: "error",
                        });
                    }
                })
                .catch((err) => {
                    this.$message({
                        message: "网络异常",
                        type: "error",
                    });
                });
        },
        changePage(state) {
            //改变页面，0表示上一页，1表示下一页
            if (state) {
                if (this.page.pageNumber < this.page.pageSize) {
                    this.page.pageNumber++;
                    this.getUser();
                }
            } else {
                if (this.page.pageNumber > 1) {
                    this.page.pageNumber--;
                    this.getUser();
                }
            }
        },
        changePageThis(val) {
            //跳转到指定页面
            this.page.pageNumber = val;
            this.getUser();
        },
    },
};
</script>

<style scoped>
.Home .el-pagination {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
}
</style>