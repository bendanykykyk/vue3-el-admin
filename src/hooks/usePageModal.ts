import { ref } from 'vue'
import PageModal from '@/components/page-modal'
type CallBackFn = () => void
export function usePageModal(
  newCallBack: CallBackFn,
  editCallBack: CallBackFn
): any[] {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const onAddClick = () => {
    // 打开新增 ，数据肯定是没有的，所以添加一个
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    newCallBack && newCallBack()
  }
  const onEditClick = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editCallBack && editCallBack()
  }

  return [pageModalRef, defaultInfo, onAddClick, onEditClick]
}
