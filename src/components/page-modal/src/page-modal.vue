<template>
  <div class="page-modal-container">
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="50%"
      center
      destroy-on-close
    >
      <UForm v-model="formData" v-bind="modalFormConfig"> </UForm>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确 认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import UForm from '@/base-ui/form'
import { useStore } from '@/store'
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
    },
    title: {
      type: String,
      default: '新建'
    },
    pageName: {
      type: String,
      required: true
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

    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length > 0) {
        // 编辑
        store.dispatch('system/updatePageDataAction', {
          pageName: props.pageName,
          formData: { ...formData.value }
        })
      } else {
        // 新增
        store.dispatch('system/newPageDataAction', {
          pageName: props.pageName,
          formData: { ...formData.value }
        })
      }
    }
    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style lang="less" scoped></style>
