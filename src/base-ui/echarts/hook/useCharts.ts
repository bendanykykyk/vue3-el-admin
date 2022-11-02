import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
export default function useCharts(el: HTMLElement): {
  chartInstance: any
  setOptions: (options: EChartsOption) => void
} {
  // 获取实例
  const chartInstance = echarts.init(el)
  // 设置选项
  const setOptions = (options: EChartsOption) => {
    chartInstance.setOption(options)
  }

  // 监听窗口大小改变
  window.addEventListener('resize', () => {
    chartInstance.resize()
  })

  return { chartInstance, setOptions }
}
