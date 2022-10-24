<template>
  <div class="dashboard">
    <div ref="divRef" class="charts"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
export default defineComponent({
  name: 'dashboard',
  setup() {
    const option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        // data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        },
        {
          name: '去年销量',
          type: 'bar',
          data: [2, 20, 36, 10, 10, 2]
        }
      ]
    }
    const divRef = ref<HTMLElement>()
    onMounted(() => {
      const echartsInstance = echarts.init(divRef.value!, 'light')
      echartsInstance.setOption(option)
    })

    return {
      divRef
    }
  }
})
</script>

<style lang="less" scoped>
.charts {
  width: 500px;
  height: 400px;
}
</style>
