<template>
  <div class="count-up-container">
    <span ref="countUpRef"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs } from 'vue'
import { CountUp } from 'countup.js'
export default defineComponent({
  name: 'count-up',
  components: {},
  props: {
    number: {
      type: Number,
      required: true
    }
  },
  setup(props: any) {
    const countUpRef = ref()
    const { number } = toRefs(props)
    onMounted(() => {
      const countUp = new CountUp(countUpRef.value, number.value)
      countUp.start()
    })

    return {
      countUpRef
    }
  }
})
</script>

<style lang="less" scoped></style>
