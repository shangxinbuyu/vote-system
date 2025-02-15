<template>
  <div class="register-container">
    <div class="register-box">
      <h2 class="register-title">注册</h2>
      <div v-if="!isShowPassword" class="form-item">
        <label>电子邮箱</label>
        <div :class="{ 'invalid': !isEmailValid && formData.email }" class="input-wrapper">
          <input
              v-model="formData.email"
              :readonly="isShowPassword"
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
      <div v-if="isShowPassword" class="form-item">
        <label>用户名</label>
        <div :class="{ 'invalid': !isUsernameValid && formData.username }" class="input-wrapper">
          <input
              v-model="formData.username"
              placeholder="输入你的用户名"
              type="text"
              @input="validate"
          />
          <span
              v-if="!isUsernameValid && formData.username"
              class="error-message"
          >
            用户名长度需在 2-20 个字符之间
          </span>
        </div>
      </div>


      <div v-if="isShowPassword" class="form-item">
        <label>密码</label>
        <div class="input-wrapper">
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

      <div v-if="isShowPassword" class="form-item">
        <label>确认密码</label>
        <div class="input-wrapper">
          <input
              v-model="formData.confirmPassword"
              placeholder="再次输入密码"
              type="password"
              @input="validate"
          />
          <span
              v-if="!isConfirmPasswordValid && formData.confirmPassword"
              class="error-message"
          >
            请确保两次输入一致
          </span>
        </div>
      </div>

      <div v-if="isShowPassword && codeMessage === '已将验证码发送到您的邮箱!'" class="form-item">
        <label>验证码</label>
        <div class="code-container">
          <div class="input-wrapper" style="flex: 1;">
            <input
                v-model="formData.code"
                placeholder="输入验证码"
                type="text"
            />
          </div>

          <span
              :class="{'error-message' : !isCode,'ok-message': isCode }"
          >
              {{ codeMessage }}
          </span>

          <button
              class="verify-btn"
              style="margin-left: 8px; width: auto; padding: 0 16px;"
              @click="verifyCode"
          >
            验证
          </button>
        </div>
      </div>


      <button
          v-if="!isShowPassword"
          :disabled="!(isEmailValid)"
          class="register-next-btn"
          @click="VerifyEmail"
      >
        继续
      </button>

      <button
          v-else
          :disabled="!isRegisterAllowed"
          class="register-next-btn"
          @click="register"
      >
        注册
      </button>

      <div class="login-link">
        已有账号？
        <router-link to="/login">立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" name="Register" setup>
import {computed, reactive, ref} from "vue";
import {emailTest, passwordTest} from "@/utils/regex.ts";
import {reqRegister, reqVerifyCode, reqVerifyEmail} from "@/api/user";
import {ElNotification} from "element-plus";

const isRegisterAllowed = computed(() => {
  return (
      isUsernameValid.value &&
      isEmailValid.value &&
      isPasswordValid.value &&
      isConfirmPasswordValid.value &&
      isCode.value
  );
});

let formData = reactive({
  username: "",
  email: "3059371185@qq.com",
  password: "",
  confirmPassword: "",
  code: ""
})
let isShowPassword = ref(false);


let codeMessage = ref("已将验证码发送到您的邮箱!");

let isUsernameValid = ref(false)
let isEmailValid = ref(false)
let isPasswordValid = ref(false)
let isConfirmPasswordValid = ref(false)
let isCode = ref(false);


const validate = () => {
  isUsernameValid.value = formData.username.length >= 2 && formData.username.length <= 20
  isEmailValid.value = emailTest(formData.email)
  isPasswordValid.value = passwordTest(formData.password)
  isConfirmPasswordValid.value = formData.password === formData.confirmPassword
}

const verifyCode = async () => {
  try {
    await reqVerifyCode(formData.email, formData.code)
    isCode.value = true
    codeMessage.value = '验证成功'
    ElNotification({
      type: 'success',
      title: `验证成功`,
    })
  } catch (e) {
    ElNotification({
      type: 'error',
      title: '错误',
      message: e as string,
    })
  }
}

const VerifyEmail = async () => {
  try {
    await reqVerifyEmail(formData.email)
    isShowPassword.value = true
  } catch (e) {
    ElNotification({
      type: 'error',
      title: '错误',
      message: e as string,
    })
  }
}

const register = async () => {
  try {
    await reqRegister(formData)
    ElNotification({
      type: 'success',
      title: `成功`,
      message: '注册成功'
    })
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
.register-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.register-box {
  width: 100%;
  max-width: 360px;
  padding: 20px;
}

.register-title {
  font-size: 20px;
  text-align: left;
  margin-bottom: 24px;
  color: #000;
  font-weight: normal;
}

.form-item {
  margin-bottom: 32px;
  position: relative;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #1f1f1f;
}

.input-wrapper {
  width: 100%;
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
  bottom: -20px;
  color: #ff4d4f;
  font-size: 12px;
  line-height: 1;
}

.ok-message {
  position: absolute;
  left: 0;
  bottom: -20px;
  color: #90dc38;
  font-size: 12px;
  line-height: 1;
}

.code-container {
  display: flex;
  align-items: center;
}

.verify-btn {
  height: 40px;
  background: #f5f5f5;
  border: none;
  border-radius: 6px;
  color: #1f1f1f;
  font-size: 14px;
  cursor: pointer;
  width: auto; /* 宽度自适应内容 */
  padding: 0 16px; /* 左右内边距 */
}

.verify-btn:hover {
  background: #e8e8e8;
}

.register-next-btn {
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

.register-next-btn:hover {
  background: #e8e8e8;
}

.register-next-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.login-link {
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: #666;
}

.login-link a {
  color: #1f1f1f;
  text-decoration: none;
  margin-left: 4px;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>