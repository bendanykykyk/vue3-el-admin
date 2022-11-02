<template>
  <div class="chart-pie-container">
    <Echarts v-bind="$attrs" :options="pieOptions"></Echarts>
  </div>
</template>

<script lang="ts" setup>
import Echarts from '@/base-ui/echarts'
import { EChartsOption } from 'echarts'
import { defineProps, computed } from 'vue'
import { IChartSeriesDataItem } from '../types'
const props = defineProps<{
  pieData: IChartSeriesDataItem[]
}>()

const pieOptions = computed((): EChartsOption => {
  return {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
