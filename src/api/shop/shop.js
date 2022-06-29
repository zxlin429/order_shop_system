import axios from "../index.js";
//查询所有用户
const URL_API_GETALLUSER = "/userinfo/getAllUser";
export function getAllUser(params) {
    return axios({
        method: "post",
        url: URL_API_GETALLUSER,
        params,
    });
}
//查询所有商品
const URL_API_GETALLSHOP = "/goodsinfo/getGoodsInfo";
export function getAllShop(params) {
    return axios({
        method: "post",
        url: URL_API_GETALLSHOP,
        params,
    });
}
//更新商品信息
const URL_API_UPDATESHOP = "/goodsinfo/updateGoods";
export function updateShop(params) {
    return axios({
        method: "post",
        url: URL_API_UPDATESHOP,
        data: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
        },
    });
}
//删除商品信息
const URL_API_DELETESHOP = "/goodsinfo/deleteGoods";
export function deleteShop(params) {
    return axios({
        method: "post",
        url: URL_API_DELETESHOP,
        params,
    });
}
//添加商品信息
const URL_API_ADDSHOP = "/goodsinfo/addGoods";
export function addShop(params) {
    return axios({
        method: "post",
        url: URL_API_ADDSHOP,
        data: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
        },
    });
}
//查询首页轮播图
const URL_API_SWIPE = "/swipe/getSwipe";
export function getSwipe(params) {
    return axios({
        method: "post",
        url: URL_API_SWIPE,
        data: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
        },
    });
}
//删除轮博图
const URL_API_DELETESWIPE = "/swipe/deletePic";
export function deleteSwipe(params) {
    return axios({
        method: "post",
        url: URL_API_DELETESWIPE,
        params,
    });
}
//查询商品图片
const URL_API_SHOPIMG = "/goodspic/getList";
export function shopImg(params) {
    return axios({
        method: "post",
        url: URL_API_SHOPIMG,
        params,
    });
}
//删除商品图片
const URL_API_DELETESHOPBYID = "/goodspic/deletePic";
export function deleteShopById(params) {
    return axios({
        method: "post",
        url: URL_API_DELETESHOPBYID,
        params,
    });
}
