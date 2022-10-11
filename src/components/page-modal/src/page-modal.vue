<template>
  <div class="page-modal-container">
    <el-dialog v-model="dialogVisible" title="新建用户" width="50%" center>
      <UForm v-model="formData" v-bind="modalFormConfig"> </UForm>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import UForm from '@/base-ui/form'
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'page-modal',
  components: {
    UForm
  },
  props: {
    modalFormConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    // 弹出
    const dialogVisible = ref(false)

    const formData = ref<any>({})
    // for (const item of props.modalConfig.formItems) {
    //       formData.value[`${item.field}`] = newValue[`${item.field}`]
    //     }
    watch(
      () => props.defaultInfo,
      (newVal) => {
        for (let item of props.modalFormConfig.formItems) {
          formData.value[item.key] = newVal[item.key]
        }
      }
    )

    return {
      dialogVisible,
      formData
    }
  }
})
</script>

<style lang="less" scoped></style>
