<template>
  <el-dialog v-model="dialogFormVisible" title="上传头像" width="600">
    <el-form ref="formRef" :model="form" label-width="140px">
      <el-form-item label="选择文件" prop="title">
        <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="customUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" alt="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button size="large" @click="dialogFormVisible = false">取消</el-button>
        <el-button size="large" type="primary" @click="updateAvatar">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts" name="HeaderDialog">
import { computed, reactive, ref } from 'vue';
import { ElMessage, ElNotification } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import type { UploadProps } from 'element-plus';
import { reqUpDateAvatar, reqUpDateImage } from "@/api/user";
import { SET_AVATAR } from "@/utils/token.ts";

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits(['update:visible']);

const dialogFormVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value),
});

const form = reactive({});
const imageUrl = ref('');

// 自定义上传方法
const customUpload = async (option: any) => {
  const { file, onSuccess, onError } = option;
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await reqUpDateImage(formData);
    onSuccess(response.data);
  } catch (error) {
    ElMessage.error('上传失败！');
    onError(error);
  }
};

const updateAvatar = async () => {
  dialogFormVisible.value = false;
  try {
    await reqUpDateAvatar(imageUrl.value);
    SET_AVATAR(imageUrl.value);
  } catch (e) {
    ElNotification({
      type: 'error',
      title: '错误',
      message: e as string,
    });
  }
};

const handleAvatarSuccess = (response: any) => {
  if (response) {
    imageUrl.value = response.body;
  }
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('头像必须是 JPG 格式！');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像大小不能超过 2MB！');
    return false;
  }
  return true;
};
</script>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>