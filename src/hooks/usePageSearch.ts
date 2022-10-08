import { ref } from 'vue'
import PageContent from '@/components/page-content'
export function usePageSearch(): any[] {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const onReset = () => {
    console.log('reset')
    pageContentRef.value?.getPageData()
  }
  const onSearch = (queryInfo: any) => {
    console.log('query')
    pageContentRef.value?.getPageData(queryInfo)
  }

  return [pageContentRef, onSearch, onReset]
}
