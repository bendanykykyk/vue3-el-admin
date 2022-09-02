<template>
  <div class="page-search-container">
    <u-form v-bind="searchFormConfig" v-model="formData">
      <template v-slot:footer>
        <div class="btn-groups">
          <el-button type="primary" icon="Refresh">重置</el-button>
          <el-button type="primary" icon="Search" @click="onSearch"
            >查询</el-button
          >
        </div>
      </template>
    </u-form>
  </div>
</template>
<script>
import UForm from '@/base-ui/form'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'page-search',
  components: {
    UForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['search', 'reset'],
  setup(props, context) {
    const formData = ref({
      id: '',
      username: '',
      password: '',
      hobby: '',
      createTime: ''
    })
    const onSearch = () => {
      context.emit('search', formData.value)
    }

    return {
      formData,
      onSearch
    }
  }
})
</script>
<style lang="less" scoped>
.btn-groups {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
