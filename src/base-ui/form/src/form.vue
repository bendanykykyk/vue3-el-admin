<template>
  <div class="u-form">
    <el-form :label-width="formOptions.labelWidth || '120px'">
      <el-row>
        <template
          v-for="formItem in formOptions.formItems"
          :key="formItem.label"
        >
          <el-col v-bind="formOptions.colLayout">
            <el-form-item
              :label="formItem.label + ':'"
              :style="formOptions.itemLayout"
            >
              <template
                v-if="formItem.type === 'input' || formItem.type === 'password'"
              >
                <el-input
                  :placeholder="placeholderComputed(formItem.label, false)"
                  v-bind="formItem.props"
                  :show-password="formItem.type === 'password'"
                ></el-input>
              </template>
              <template v-else-if="formItem.type === 'select'">
                <el-select
                  :placeholder="placeholderComputed(formItem.label, false)"
                  v-bind="formItem.props"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in typeDataComputed(formItem.typeData)"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
              <template v-else-if="formItem.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="formItem.props"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
        <!-- <el-col :span="8">
          <el-form-item label="姓名">
            <el-input></el-input>
          </el-form-item>
        </el-col> -->
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import type { IForm } from '../types'
export default defineComponent({
  name: 'form',
  props: {
    formOptions: {
      type: Object as PropType<IForm>,
      default() {
        return {}
      }
    }
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //这里存放数据
  setup() {
    let placeholderComputed = computed(() => {
      /**
       * @description:
       * @param {*} str文字内容
       * @param {*} isSelect是否是下拉框
       * @return {*} 返回拼接好的文字
       */
      return function (str: string, isSelect = false) {
        if (isSelect) {
          return `请选择${str}`
        } else {
          return `请输入${str}`
        }
      }
    })

    let typeDataComputed = computed(() => {
      return (typeData: any) => {
        if (typeof typeData === 'function') {
          return typeData()
        } else if (Array.isArray(typeData)) {
          return typeData
        }
      }
    })
    return {
      placeholderComputed,
      typeDataComputed
    }
  }
})
</script>

<style lang="less" scoped>
.u-form {
  // padding-top: 22px;
  padding: 22px 5px 0px 5px;
}
</style>
