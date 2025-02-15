import $http from '@/utils/axios.ts'
import type {loginForm, registerForm} from './type.ts'
import type {Response} from '@/api/Response.ts'
import {SET_TOKEN} from '@/utils/token.ts'


enum API {
    LOGIN_URL = '/user/login',
    VERIFY_EMAIL = '/user/email',
    VERIFY_CODE = '/user/code',
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
// 邮箱校验
export const reqVerifyEmail = async (email: string) => {
    let result: Response = await $http({
        method: 'GET',
        url: API.VERIFY_EMAIL + `/${email}`,
    })
    if (result.code === 200) {
        // 邮箱可用
        return 'ok'
    }
    return Promise.reject(result.msg)
}
// 验证码校验
export const reqVerifyCode = async (email: string, code: string) => {
    let result: Response = await $http({
        method: 'POST',
        url: API.VERIFY_CODE,
        data: {
            email,
            code
        }
    })
    if (result.code === 200) {
        return 'ok'
    }
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