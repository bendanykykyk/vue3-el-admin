<template>
  <div class="nav-header">
    <el-icon
      @click="handleFoldClick"
      class="fold-menu"
      :class="isFold ? 'rotate' : ''"
      ><fold
    /></el-icon>

    <div class="content">
      <div>面包屑</div>
      <div>
        <user-info />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserInfo from './user-info.vue'
// import { Fold } from '@element-plus/icons-vue'
export default defineComponent({
  emits: ['foldChange'],
  components: {
    // Fold
    UserInfo
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    return {
      isFold,
      handleFoldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
}
.rotate {
  transform: rotate(180deg);
}
</style>
