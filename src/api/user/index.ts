import $http from '@/utils/axios.ts'
import type {loginForm, registerForm} from './type.ts'
import type {Response} from '@/api/Response.ts'
import {SET_TOKEN} from '@/utils/token.ts'


enum API {
    LOGIN_URL = '/user/login',
    REGISTER_URL = '/user/register',
}

// 登录接口
export const reqLogin = async (data: loginForm) => {
    let result: Response = await $http({
        method: 'POST',
        url: API.LOGIN_URL,
        data
    })
    if (result.code === 200) {
        // 登陆成功保存 token
        SET_TOKEN(result.data.token)
        return 'ok'
    }
    // 登陆失败返回错误信息
    return Promise.reject(result.msg)
}
// 注册接口
export const reqRegister = async (data: registerForm) => {
    let result: Response = await $http({
        method: 'POST',
        url: API.REGISTER_URL,
        data
    })

    if (result.code === 200) {
        // 注册成功
        return 'ok'
    }
    return Promise.reject(result.msg)
}