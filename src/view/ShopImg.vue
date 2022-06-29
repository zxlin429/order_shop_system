<template>
    <div class="ShopImg">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/shop' }"
                >商品管理</el-breadcrumb-item
            >
            <el-breadcrumb-item>商品图片管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="add" @click="dialogVisible = true">
            <i class="el-icon-circle-plus"></i>
        </div>
        <el-table
            :data="shopImgList"
            :max-height="maxHeight"
            style="width: 100%; margin-top: 10px"
        >
            <el-table-column label="id">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{
                        scope.row.goodsid
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="scope.row.goodsurl"
                            fit="fit"
                        ></el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加区域 -->
        <el-dialog
            title="添加轮博图"
            :visible.sync="dialogVisible"
            width="500px"
            :before-close="handleClose"
        >
            <div>
                <el-upload
                    class="avatar-uploader"
                    action="http://42.192.224.189:9091/goodspic/upload"
                    :headers="{ token }"
                    :data="{ goodsId: $route.query.id }"
                    :show-file-list="true"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { shopImg, deleteShopById } from "@/api/shop/shop.js";
export default {
    name: "ShopImg",
    mounted() {
        this.getShopImg();
    },
    data() {
        return {
            dialogVisible: false, //添加区开关
            maxHeight: window.screen.height - 400, //表格最大高度
            imageUrl: "", //添加图片
            token: window.sessionStorage["token"],
            shopImgList: [
                //商品图片列表
            ],
        };
    },
    methods: {
        getShopImg() {
            shopImg({
                goodsId: this.$route.query.id,
            })
                .then((res) => {
                    if (res.code == 200) {
                        this.shopImgList = [];
                        this.shopImgList = res.data.pic.records;
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
        handleDelete(index, row) {
            //删除
            deleteShopById({ id: row.goodsid })
                .then((res) => {
                    if (res.code == 200) {
                        this.$message({
                            message: res.message || res.msg,
                            type: "success",
                        });
                        this.getShopImg();
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

        handleClose() {
            //编辑添加层关闭
            this.dialogVisible = false;
            this.imageUrl = "";
        },

        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.getShopImg();
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg" || "image/png";
            const isLt4M = file.size / 1024 / 1024 < 4;

            if (!isJPG) {
                this.$message({
                    message: "上传头像图片只能是 JPG 格式!",
                    type: "error",
                });
            }
            if (!isLt4M) {
                this.$message({
                    message: "上传头像图片大小不能超过 4MB!",
                    type: "error",
                });
            }
            return isJPG && isLt4M;
        },
    },
};
</script>

<style scoped>
.add {
    margin: 10px 0 0 0;
    font-size: 1.5rem;
    display: flex;
    justify-content: flex-end;
}
.add i {
    cursor: pointer;
}
.avatar-uploader {
    display: flex;
    justify-content: center;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
<style>
.ShopImg .el-upload-list__item-name {
    max-width: 200px !important;
    padding-left: 22px !important;
}
</style>