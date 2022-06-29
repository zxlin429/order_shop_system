<template>
    <div class="Shop">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="add" @click="dialogVisible = true">
            <i class="el-icon-circle-plus"></i>
        </div>
        <el-table
            :data="shopList"
            stripe
            :max-height="maxHeight"
            style="width: 100%; margin-top: 10px"
        >
            <el-table-column
                prop="id"
                label="id"
                width="'10%'"
            ></el-table-column>
            <el-table-column prop="goodsname" label="商品名称" width="'22%'">
            </el-table-column>
            <el-table-column
                prop="classInfo"
                label="商品类别"
                width="'16%'"
            ></el-table-column>
            <el-table-column
                prop="goodsprice"
                label="价格"
                width="'22%'"
            ></el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="
                            $router.push({
                                path: '/shopimg',
                                query: { id: scope.row.id },
                            })
                        "
                        >查看图片</el-button
                    >
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
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

        <el-dialog
            :title="nowList.tit"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
        >
            <el-form ref="form" :model="nowList" label-width="80px">
                <el-form-item label="商品名称">
                    <el-input v-model="nowList.goodsname"></el-input>
                </el-form-item>
                <el-form-item label="商品类别">
                    <el-input v-model="nowList.classInfo"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="nowList.goodsprice"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="falseFoter">取消</el-button>
                <el-button type="primary" @click="trueFoter">
                    {{ nowList.tit === "添加商品" ? "添加" : "编辑" }}
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    getAllShop,
    updateShop,
    deleteShop,
    addShop,
} from "@/api/shop/shop.js";
export default {
    name: "Shop", //管理商品信息页面
    data() {
        return {
            page: {
                pageNumber: 1, //当前页面
                size: 10, //每页大小
                pageSize: 0, //总数据
            },
            maxHeight: window.screen.height - 400, //表格最大高度
            dialogVisible: false, //添加和编辑区开关
            shopList: [], //当前页数据
            nowList: {
                //编辑添加区数据
                id: null,
                tit: "添加商品",
                goodsname: "",
                classInfo: "",
                goodsprice: "",
            },
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
            //获取商品信息
            getAllShop(this.page)
                .then((res) => {
                    if (res.code == 200) {
                        // this.page.pageSize = res.data.allUser.total;
                        this.shopList = [];
                        this.shopList = res.data.menu;
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
        handleEdit(index, row) {
            //编辑
            // console.log(row);
            this.nowList = {
                id: row.id,
                tit: `${row.goodsname}-商品修改`,
                goodsname: row.goodsname,
                classInfo: row.classInfo,
                goodsprice: row.goodsprice,
            };
            this.dialogVisible = true;
        },
        handleDelete(index, row) {
            //删除
            // console.log(row);
            this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.deleteShopthis(row.id);
                })
                .catch(() => {});
        },
        deleteShopthis(id) {
            //删除商品
            const err = {
                goodsId: id,
            };
            deleteShop(err)
                .then((res) => {
                    if (res.code === 200) {
                        this.$message({
                            message: res.message || res.msg,
                            type: "success",
                        });
                        this.getUser();
                    } else {
                        this.$message({
                            message: res.message || res.msg,
                            type: "success",
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
        handleClose(done) {
            //编辑添加层关闭
            this.nowList = {
                id: null,
                tit: "添加商品",
                goodsname: "",
                classInfo: "",
                goodsprice: "",
            };
            done();
        },
        falseFoter() {
            //编辑添加层关闭
            this.dialogVisible = false;
            this.nowList = {
                id: null,
                tit: "添加商品",
                goodsname: "",
                classInfo: "",
                goodsprice: "",
            };
        },
        trueFoter() {
            //提交修改
            if (this.nowList.tit === "添加商品") {
                this.addShopThis();
            } else {
                this.updateShopThis();
            }
        },
        addShopThis() {
            //添加商品
            let arr = {
                goodsname: this.nowList.goodsname,
                classInfo: this.nowList.classInfo,
                goodsprice: parseFloat(this.nowList.goodsprice),
                shopId: 1,
            };
            addShop(arr)
                .then((res) => {
                    if (res.code === 200) {
                        this.$message({
                            message: res.message || res.msg,
                            type: "success",
                        });
                        this.dialogVisible = false;
                        this.nowList = {
                            id: null,
                            tit: "添加商品",
                            goodsname: "",
                            classInfo: "",
                            goodsprice: "",
                        };
                        this.getUser();
                    } else {
                        this.$message({
                            message: res.message || res.msg,
                            type: "success",
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
        updateShopThis() {
            //更新商品
            let arr = {
                id: this.nowList.id,
                goodsname: this.nowList.goodsname,
                classInfo: this.nowList.classInfo,
                goodsprice: parseFloat(this.nowList.goodsprice),
                shopId: 1,
            };
            updateShop(arr)
                .then((res) => {
                    if (res.code === 200) {
                        this.$message({
                            message: res.message || res.msg,
                            type: "success",
                        });
                        this.dialogVisible = false;
                        this.getUser();
                    } else {
                        this.$message({
                            message: res.message || res.msg,
                            type: "success",
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
    },
};
</script>

<style scoped>
.Shop .el-pagination {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
}
.add {
    margin: 10px 0 0 0;
    font-size: 1.5rem;
    display: flex;
    justify-content: flex-end;
}
.add i {
    cursor: pointer;
}
</style>