<template>
  <el-row class="header">
    <el-col :span="12">
      <div class="header_left">
        <el-icon size="20" style="margin-right: 20px">
          <component
              :is="SettingStore.fold ? 'Expand' : 'Fold'"
              @click="SettingStore.fold = !SettingStore.fold">
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
        <img :src="avatar" alt="" style="width: 24px; height: 24px; margin: 0 10px; border-radius: 50%" />
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="changeAvatar">更换头像</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>

  <Dialog v-model:visible="dialogFormVisible" />
</template>

<script lang="ts" name="Header" setup>
import Dialog from './dialog/Index.vue'
import { useRoute, useRouter } from "vue-router";
import useSettingStore from '@/store/modules/Setting.ts';
import { ArrowDown } from "@element-plus/icons-vue";
import { GET_AVATAR, GET_USERNAME, REMOVE_TOKEN } from "@/utils/token.ts";
import { onMounted, ref } from "vue";

const $router = useRouter();
const $route = useRoute();
const SettingStore = useSettingStore();

const avatar = ref('');
const username = ref('');
const dialogFormVisible = ref(false);

const logout = () => {
  REMOVE_TOKEN();
  $router.push('/login');
};

const handleCommand = (command: string) => {
  if (command === 'changeAvatar') {
    dialogFormVisible.value = true;
  } else if (command === 'logout') {
    logout();
  }
};

onMounted(() => {
  avatar.value = GET_AVATAR() ?? '';
  username.value = GET_USERNAME() ?? '';
});
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