<template>
  <div class="echarts-container">
    <div ref="chartDivRef" :style="{ width, height }"></div>
  </div>
</template>

<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import { ref, defineProps, withDefaults, watchEffect } from 'vue'
import { onMounted } from 'vue'
import useCharts from '../hook/useCharts'
const props = withDefaults(
  defineProps<{ width?: string; height?: string; options: EChartsOption }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const chartDivRef = ref<HTMLElement>()
onMounted(() => {
  const { setOptions } = useCharts(chartDivRef.value!)
  // 每当内部的依赖发生改变后会重新执行，比如这里就是props.options改变后就会重新执行
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style lang="less" scoped></style>
