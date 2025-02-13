<template>
  <div class="logo">
    <img alt="" src="@/assets/vue.svg" style="margin: 10px">
    <span v-show="!settingStore.fold">投票系统</span>
  </div>
</template>

<script lang="ts" name="Logo" setup>
import useSettingStore from '@/store/modules/Setting.ts'


let settingStore = useSettingStore()
</script>

<style lang="scss" scoped>
.logo {
  height: 40px;
  display: flex;;
  align-items: center;

  span {
    margin-left: 10px;
  }
}
</style>