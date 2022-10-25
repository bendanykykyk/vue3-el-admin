<template>
  <div class="page-count-to-container">
    <span class="title">{{ title }}</span>

    <CountUp :number="number" class="number"></CountUp>
    <div style="display: flex">
      <span class="secondTitle">{{ secondTitle }}</span>
      <CountUp :number="number" class="secondTitle"></CountUp>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CountUp from '@/base-ui/count-up'
export default defineComponent({
  name: 'page-count-to',
  components: {
    CountUp
  },
  props: {
    title: {
      type: String,
      default: '默认标题'
    },
    secondTitle: {
      type: String,
      default: '默认副标题'
    },
    number: {
      type: Number,
      default: 0
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.page-count-to-container {
  border-radius: 5px;
  min-width: 200px;
  height: 90px;
  background-color: #fff;
  margin: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 10px;
  .title {
    font-size: 12px;
    color: #a4a2a2;
  }
  .number {
    font-size: 18px;
    font-weight: 500;
    color: #000;
  }
  .secondTitle {
    font-size: 12px;
    font-weight: 700;
    color: #1e1e1e;
    margin-right: 5px;
  }
}
</style>
