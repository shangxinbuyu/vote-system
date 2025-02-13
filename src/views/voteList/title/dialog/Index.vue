<template>
  <el-button plain size="large" @click="showForm">
    发起投票
  </el-button>

  <el-dialog v-model="dialogFormVisible" title="发起投票" width="600">
    <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="140px"
    >
      <el-form-item
          label="投票项目"
          prop="title"
      >
        <el-input
            v-model="form.title"
            autocomplete="off"
            placeholder="请输入投票项目"
        />
      </el-form-item>

      <el-form-item label="投票有效期">
        <el-date-picker
            v-model="form.expiredTime"
            :disabled-date="disabledDate"
            :show-now="false"
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择时间"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button size="large" @click="dialogFormVisible = false">取消</el-button>
        <el-button size="large" type="primary" @click="submitForm(formRef)">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" name="VoteListDialog" setup>
import {reactive, ref} from 'vue'
import {format} from 'date-fns'
import {ElNotification, type FormInstance} from 'element-plus'
import type {addVoteInterface} from "@/api/vote/type.ts"
import {reqAddVote} from "@/api/vote"
import useVoteStore from "@/store/modules/Vote.ts"

const {list} = useVoteStore()
const dialogFormVisible = ref(false)
const formRef = ref<FormInstance>()
const currentTimePlusFive = ref(new Date())

const form = reactive<addVoteInterface>({
  title: '',
  expiredTime: ''
})

const rules = {
  title: [{required: true, trigger: 'blur'}]
}

const disabledDate = (time: Date) => {
  return time.getTime() < currentTimePlusFive.value.getTime()
}

const showForm = () => {
  dialogFormVisible.value = true
  form.title = ''
  currentTimePlusFive.value = new Date(new Date().getTime() + 5 * 60 * 1000)
  form.expiredTime = format(currentTimePlusFive.value, 'yyyy-MM-dd HH:mm:ss')
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        dialogFormVisible.value = false
        await reqAddVote(form)
        await list()

      } catch (e) {
        ElNotification({
          type: 'error',
          title: '接口内部错误',
          message: e as string,
        })
      }

    }
  })
}
</script>

<style scoped>
.dialog-footer {
  padding: 20px 0 0;
}
</style>