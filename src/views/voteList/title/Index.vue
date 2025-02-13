<template>
  <div class="header-container">
    <el-form :inline="true" :model="formInline" class="search-form">
      <!-- 搜索部分 -->
      <div class="left-section">
        <el-form-item>
          <el-input
              v-model="formInline.likeInput"
              class="search-input"
              clearable
              placeholder="请输入关键词搜索"
          >
            <template #append>
              <el-button @click="likeList">
                搜索
              </el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-select
              v-model="formInline.screen"
              clearable
              placeholder="状态筛选"
              @change="filter"
          >

            <el-option label="已投票" value="2"/>
            <el-option label="未投票" value="-2"/>
            <el-option label="已赞同" value="1"/>
            <el-option label="已反对" value="0"/>
          </el-select>
        </el-form-item>
      </div>

      <!-- 发起投票按钮 -->
      <div class="right-section">
        <el-form-item>
          <Dialog/>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" name="VoteListTitle" setup>
import Dialog from './dialog/Index.vue'
import {reactive} from 'vue'
import {reqFilter, reqLikeList} from "@/api/vote";
import {ElNotification} from "element-plus";
import useVoteStore from "@/store/modules/Vote.ts";

let {list} = useVoteStore()

const formInline = reactive({
  likeInput: '',
  screen: ''
})


const likeList = async () => {

  try {
    await reqLikeList(formInline.likeInput);
  } catch (e) {
    ElNotification({
      type: 'error',
      title: '错误',
      message: e as string,
    })
  }
}

const filter = async (value: string) => {
  if (value === null || value === undefined) {
    await list()
    return
  }
  try {
    await reqFilter(value)
  } catch (e) {
    ElNotification({
      type: 'error',
      title: '错误',
      message: e as string,
    })
  }
}
</script>

<style lang="scss" scoped>
.header-container {
  padding: 24px;
  background-color: #fff;

  .search-form {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    .left-section {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      flex: 1;
      min-width: 280px;

      .el-form-item {
        flex: 0 0 auto;

        .el-select {
          width: 200px;
        }
      }
    }

    .right-section {
      margin-left: auto;
    }

    :deep(.el-input) {
      width: 300px;
    }

    :deep(.el-select) {
      width: 200px;
    }

    :deep(.el-form-item) {
      margin-bottom: 0;
      margin-right: 0;
    }
  }
}
</style>