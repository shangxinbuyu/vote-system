import axios from 'axios'
import {GET_TOKEN} from "@/utils/token.ts";
import router from "@/router";


const $http = axios.create({
    baseURL: 'http://lx496957.ink:80/api',
    // baseURL: 'http://localhost:80/api',
    timeout: 50000,
})

$http.interceptors.request.use((config) => {
    let token = GET_TOKEN();
    if (token) {
        config.headers.token = token;
    }
    return config
})

$http.interceptors.response.use(
    // 成功回调
    (response) => {
        return response.data;
    },
    // 失败回调
    (error) => {
        if (error.status === 401) {
            router.push({path: "/login"});
            return Promise.reject(new Error('身份校验失败'));
        }
        return Promise.reject(error);
    }
)
export default $http;