<template>
  <div class="common-layout">
    <el-container>
      <!--左侧导航栏-->
      <el-aside :class="{fold:settingStore.fold}" class="aside">
        <Logo/>
        <!-- 展示菜单 -->
        <!-- 滚动组件 -->
        <el-scrollbar :class="{fold:settingStore.fold}" class="scrollbar">
          <el-menu
              :collapse="settingStore.fold"
              background-color="#001529"
              text-color="white"
          >
            <Menu :menuList="userStore.menuRoutes"/>
          </el-menu>
        </el-scrollbar>

      </el-aside>
      <el-container>
        <!--头部区域-->
        <el-header class="header">
          <Header/>
        </el-header>
        <!-- 内容展示 -->
        <el-main>
          <Main/>
        </el-main>
      </el-container>
    </el-container>

  </div>

</template>

<script lang="ts" name="Layout" setup>
import Menu from './menu/Index.vue'
import Logo from './logo/Index.vue'
import Main from './main/Index.vue'
import Header from './header/Index.vue'
import useUserStore from "@/store/modules/User.ts"
import useSettingStore from "@/store/modules/Setting.ts"

let userStore = useUserStore()
let settingStore = useSettingStore()
</script>

<style lang="scss" scoped>
@use '@/styles/variable.scss' as *;

.common-layout {
  width: 100%;
  height: 100vh;
  display: flex;

  .aside {
    background-color: #001529;
    color: white;
    width: $aside-width;
    transition: width $transition-duration ease;
    display: flex;
    flex-direction: column;

    // Improved scroll container
    .scrollbar {
      height: calc(100vh - $header-height);
      width: $aside-width;
      transition: width $transition-duration ease;

      .el-menu {
        border-right: none;
        user-select: none;
      }

      &.fold {
        width: $aside-mini-width;
      }
    }

    &.fold {
      width: $aside-mini-width;
    }
  }
}
</style>