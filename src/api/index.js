import axios from "axios";

//创建axios实例
const service = axios.create({
    baseURL: "http://42.192.224.189:9091",
    //超时时间
    timeout: 15000,
});

//request 请求拦截器
service.interceptors.request.use(
    (config) => {
        config.headers.token = window.sessionStorage["token"] || "";
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//respone 响应拦截器
service.interceptors.response.use(
    (respone) => {
        return respone.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default service;
