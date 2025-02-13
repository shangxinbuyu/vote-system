<template>
  <div :style="{ backgroundColor: background }" class="vote-item">
    <div class="header">
      <h3 class="title">{{ item.title }}</h3>
      <el-button v-if="item.sponsor"
                 :icon="Delete"
                 circle
                 type="danger"
                 @click="handleDelete(item.id)"
      />
    </div>
    <div class="progress-section">
      <div class="progress-label">
        <span class="label">赞成</span>
        <span class="count">{{ item.agree }}票</span>
      </div>
      <el-progress
          :color="item.status === -1 ? '#67c23a' : '#909399'"
          :format="() => `${agree.toFixed(1)}%`"
          :percentage="agree"
          :stroke-width="20"
          :text-inside="true"
          class="progress-bar"
      />

      <div class="progress-label">
        <span class="label">反对</span>
        <span class="count">{{ item.contra }}票</span>
      </div>
      <el-progress
          :color="item.status === -1 ? '#f56c6c' : '#909399'"
          :format="() => `${contra.toFixed(1)}%`"
          :percentage="contra"
          :stroke-width="20"
          :text-inside="true"
          class="progress-bar"
      />
    </div>

    <div class="button-group">
      <el-button
          :disabled="item.status !== -1" :icon="Select"
          class="vote-button"
          type="success"
          @click="choose(item,true)"
      >
        赞成
      </el-button>
      <el-button
          :disabled="item.status !== -1"
          :icon="CloseBold"
          class="vote-button"
          type="danger"
          @click="choose(item,false)"
      >
        反对
      </el-button>
    </div>

  </div>
</template>

<script lang="ts" name="VoteListItem" setup>
import {computed, ref} from 'vue'
import {CloseBold, Delete, Select} from '@element-plus/icons-vue'
import type {voteListInterface} from "@/api/vote/type.ts";
import {reqDeleteVote, reqVoteChoose} from "@/api/vote";
import {ElMessageBox, ElNotification} from "element-plus";

const {item, list} = defineProps(['item', 'list'])
const sum = ref(computed(() => item.agree + item.contra))
const agree = ref(computed(() => sum.value ? (item.agree / sum.value) * 100 : 0))
const contra = ref(computed(() => sum.value ? (item.contra / sum.value) * 100 : 0))


const background = computed(() => {
  switch (item.status) {
    case 1:
      return '#f0f9eb';
    case 0:
      return '#fef0f0';
    default:
      return '#ffffff';
  }
})

const choose = async (item: voteListInterface, flag: boolean) => {
  try {
    await reqVoteChoose(item.id, flag)
    await list()
  } catch (e) {
    ElNotification({
      type: 'error',
      title: '接口内部错误',
      message: e as string,
    })
  }
}

const handleDelete = async (id: number) => {
  try {
    await ElMessageBox.confirm('确定要删除这个投票吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await reqDeleteVote(id)
    await list()
  } catch (e) {
    ElNotification({
      type: 'error',
      title: '接口内部错误',
      message: e as string,
    })
  }
}
</script>

<style lang="scss" scoped>
.vote-item {
  padding: 15px;
  background-color: #cacaca;
  border-radius: 10px;

  &.green {
    background-color: green;
  }

  &.red {
    background-color: red;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    .title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      flex: 1;
      margin: 0 10px 0 0;
    }
  }

  .progress-section {
    .progress-label {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;

      .label {
        color: #666;
      }

      .count {
        color: #999;
      }
    }

    .progress-bar {
      margin-bottom: 10px;
    }
  }

  .button-group {
    display: flex;
    gap: 10px;
    margin-top: 15px;

    .vote-button {
      flex: 1;
    }
  }
}
</style>