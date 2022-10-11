<template>
  <div class="u-form">
    <!-- 头部插槽 -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="formItem in formItems" :key="formItem.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!formItem.isHidden"
              :label="formItem.label + ':'"
              :rules="formItem.rules"
              :style="itemStyle"
            >
              <template
                v-if="formItem.type === 'input' || formItem.type === 'password'"
              >
                <!-- v-model="formData[`${formItem.key}`]" -->
                <el-input
                  :placeholder="placeholderComputed(formItem.label, false)"
                  v-bind="formItem.props"
                  :show-password="formItem.type === 'password'"
                  :model-value="modelValue[formItem.key]"
                  @update:modelValue="
                    handleUpdateModelValue($event, formItem.key)
                  "
                ></el-input>
              </template>
              <template v-else-if="formItem.type === 'select'">
                <el-select
                  :placeholder="placeholderComputed(formItem.label, true)"
                  v-bind="formItem.props"
                  style="width: 100%"
                  :model-value="modelValue[formItem.key]"
                  @update:modelValue="
                    handleUpdateModelValue($event, formItem.key)
                  "
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
                  :model-value="modelValue[formItem.key]"
                  v-bind="formItem.props"
                  @update:modelValue="
                    handleUpdateModelValue($event, formItem.key)
                  "
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { isContext } from 'vm'
import { defineComponent, PropType, computed, ref, watch } from 'vue'
import type { IFormItem } from '../types'

export default defineComponent({
  name: 'UForm',
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      // 这样会出问题
      // default() {
      //   return []
      // }
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    let placeholderComputed = computed(() => {
      /**
       * @description:
       * @param {*} str文字内容
       * @param {*} isSelect是否是下拉框
       * @return {*} 返回拼接好的文字
       */
      return function (str: string, isSelect = false) {
        return isSelect ? `请选择${str}` : `请输入${str}`
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
    // eslint-disable-next-line vue/no-parsing-error
    // 这种处理props值 是stackoverflow里面不错的解决方法，但是其实这里set没用 || 这里和直接绑定props其实差不多
    // let formData = computed({
    //   get: () => {
    //     return props.modelValue
    //   },
    //   set: (newVal) => {
    //     emit('update:modelValue', newVal)
    //   }
    // })

    // const formData = ref({ ...props.modelValue })
    // watch(
    //   formData,
    //   (newVal) => {
    //     emit('update:modelValue', newVal)
    //   },
    //   { deep: true }
    // )
    const handleUpdateModelValue = (e: any, key: string) => {
      console.log(e, key)
      emit('update:modelValue', { ...props.modelValue, [key]: e })
    }
    return {
      // formData,
      placeholderComputed,
      typeDataComputed,
      handleUpdateModelValue
    }
  }
})
</script>

<style lang="less" scoped>
.u-form {
  padding: 22px 5px 0px 5px;
}
</style>
