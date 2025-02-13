<template>
  <el-row class="header">
    <el-col :span="12">
      <div class="header_left">
        <el-icon size="20" style="margin-right: 20px">
          <component
              :is="SettingStore.fold ? 'Expand' : 'Fold'"
              @click="SettingStore.fold =!SettingStore.fold">
          </component>
        </el-icon>
        <el-breadcrumb separator-icon="ArrowRight">
          <el-breadcrumb-item v-for="item in $route.matched" v-show="item.meta.title" :key="item.path" :to="item.path">
            <span>{{ item.meta.title }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="header_right">
        <img :src="avatar" alt="" style="width: 24px;height: 24px; margin:0 10px; border-radius: 50% ">
        <el-dropdown>
          <span class="el-dropdown-link">
            shangxinbuyu
            <el-icon class="el-icon--right">
              <arrow-down/>
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" name="Header" setup>
import {useRoute, useRouter} from "vue-router";
import useSettingStore from '@/store/modules/Setting.ts'
import useUserStore from '@/store/modules/User.ts'
import {ArrowDown} from "@element-plus/icons-vue";
import {REMOVE_TOKEN} from "@/utils/token.ts";

let $router = useRouter();
let $route = useRoute();
let SettingStore = useSettingStore();
let userStore = useUserStore()
let avatar = userStore.avatar || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'


const logout = () => {
  REMOVE_TOKEN()
  $router.push('/login')
}

</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header_left {
    margin-right: 20px;
    display: flex;
    align-items: center;

    el-breadcrumb {
      display: flex;
      align-items: center;
    }

    el-icon {
      margin-right: 10px;
    }
  }

  .header_right {
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 1;
  }
}
</style>