<template>
  <template v-for="item in filterMenu" :key="item.path">
    <!--没有子路由-->
    <el-menu-item
        v-if="!item.children"
        :index="item.path"
        @click="toRoute"
        style="padding-left: 30px"
    >
      <el-icon>
        <component :is="item.meta.icon"/>
      </el-icon>
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 一个子路由 -->
    <el-menu-item
        v-if='item.children && item.children.length == 1'
        :index="item.children[0].path"
        @click="toRoute"
        style="padding-left: 30px"
    >
      <el-icon>
        <component :is="item.children[0].meta.icon"/>
      </el-icon>
      <template #title>
        <span>{{ item.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 多个子路由 -->
    <el-sub-menu
        v-if="item.children && item.children.length > 1"
        :index="item.path"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"/>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"/>
    </el-sub-menu>
  </template>
</template>

<script lang="ts" name="Menu" setup>
import {useRouter} from "vue-router";

let $router = useRouter();
// 接收路由数字
const {menuList} = defineProps(['menuList'])
const filterMenu = (menuList.filter((item: any) => {
  return !item.meta.hidden
}))

const toRoute = (vc: any) => {
  $router.push(vc.index)
}
</script>

<style scoped>

</style>