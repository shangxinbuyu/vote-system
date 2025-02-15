<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="login-title">登录</h1>

      <div class="form-item">
        <label>电子邮箱</label>
        <div :class="{ 'invalid': !isEmailValid && formData.email }" class="input-wrapper">
          <input
              v-model="formData.email"
              placeholder="输入你的邮箱"
              type="email"
              @input="validate"
          />
          <span
              v-if="!isEmailValid && formData.email"
              class="error-message"
          >
            请输入有效的邮箱地址
          </span>
        </div>
      </div>

      <div class="form-item">
        <label>密码</label>
        <div :class="{ 'invalid': !isPasswordValid && formData.password }" class="input-wrapper">
          <input
              v-model="formData.password"
              placeholder="输入你的密码"
              type="password"
              @input="validate"
          />
          <span
              v-if="!isPasswordValid && formData.password"
              class="error-message"
          >
            请输入有效的密码
          </span>
        </div>
      </div>

      <button
          :disabled="!(isEmailValid && isPasswordValid)"
          class="login-btn"
          @click="login"
      >
        登录
      </button>
      <div class="register-link">
        还没有账号？
        <router-link to="/register">立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" name="Login" setup>
import {reactive, ref} from 'vue'
import {reqLogin} from '@/api/user'
import {ElNotification} from "element-plus"
import {getTime} from "@/utils/time.ts"
import {emailTest, passwordTest} from "@/utils/regex.ts"
import {useRouter} from "vue-router"

let $router = useRouter()
// 用户输入表单数据
let formData = reactive({
  email: "",
  password: "",
})

let isEmailValid = ref(false)
let isPasswordValid = ref(false)

const validate = () => {
  // 邮箱格式验证
  isEmailValid.value = emailTest(formData.email)
  // 密码正则
  isPasswordValid.value = passwordTest(formData.password);
}
// 登录方法
const login = async () => {
  try {
    // 登陆成功
    await reqLogin(formData)
    ElNotification({
      type: 'success',
      title: `Hi,${getTime()}好`,
      message: '欢迎回来'
    })
    await $router.push('/')
  } catch (e) {
    ElNotification({
      type: 'error',
      title: '错误',
      message: e as string,
    })
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.login-box {
  width: 100%;
  max-width: 360px;
  padding: 20px;
}

.login-title {
  font-size: 20px;
  text-align: left;
  margin-bottom: 24px;
  color: #000;
  font-weight: normal;
}

.form-item {
  margin-bottom: 24px;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #1f1f1f;
}

.input-wrapper {
  background: #f5f5f5;
  border-radius: 6px;
  padding: 4px;
  position: relative;
}

.input-wrapper.invalid {
  border: 1px solid #ff4d4f;
}

.input-wrapper input {
  width: 100%;
  height: 32px;
  border: none;
  background: transparent;
  padding: 0 8px;
  font-size: 14px;
  outline: none;
}

.input-wrapper input::placeholder {
  color: #999;
}

.error-message {
  position: absolute;
  left: 0;
  top: 100%;
  margin-top: 4px;
  color: #ff4d4f;
  font-size: 12px;
}

.login-btn {
  width: 100%;
  height: 40px;
  background: #f5f5f5;
  border: none;
  border-radius: 6px;
  color: #1f1f1f;
  font-size: 14px;
  cursor: pointer;
  margin-top: 8px;
}

.login-btn:hover {
  background: #e8e8e8;
}

.login-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.register-link {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #666;
}

.register-link a {
  color: #1f1f1f;
  text-decoration: none;
  margin-left: 4px;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>