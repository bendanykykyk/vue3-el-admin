<template>
  <div class="chart-bar-container">
    <div class="chart-pie-container">
      <Echarts v-bind="$attrs" :options="barOptions"></Echarts>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { EChartsOption } from 'echarts'
import Echarts from '@/base-ui/echarts'
import { computed, defineProps } from 'vue'
const props = defineProps<{
  barData: number[]
  xAxisData: string[]
}>()
const barOptions = computed((): EChartsOption => {
  return {
    xAxis: {
      type: 'category',
      data: props.xAxisData
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.barData,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
