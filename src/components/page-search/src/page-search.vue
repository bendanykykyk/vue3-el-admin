<template>
  <div class="page-search-container">
    <u-form v-bind="searchFormConfig" v-model="formData">
      <template v-slot:footer>
        <div class="btn-groups">
          <el-button type="primary" icon="Refresh" @click="onReset"
            >重置</el-button
          >
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
    // 优化，这里的项应该由配置项去生成的
    const formItems = props.searchFormConfig?.formItems ?? []
    let formOriginData = {}
    for (const item of formItems) {
      formOriginData[item.key] = ''
    }
    console.log(formOriginData)

    // const formData = ref({
    //   id: '',
    //   username: '',
    //   password: '',
    //   hobby: '',
    //   createTime: ''
    // })
    const formData = ref(formOriginData)

    const onSearch = () => {
      context.emit('search', formData.value)
    }

    const onReset = () => {
      // 方式一：由于form组件内部...props.modelValue是浅拷贝，直接更改formData.value影响不到内部的值
      // 但是formData.value[item.key]的方式是可以的
      // for (const item of formItems) {
      //   formData.value[item.key] = formOriginData[item.key]
      // }

      // 方式二
      formData.value = { ...formOriginData }
    }

    return {
      formData,
      onSearch,
      onReset
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
