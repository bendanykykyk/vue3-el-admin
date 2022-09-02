<template>
  <div class="nav-header">
    <el-icon
      @click="handleFoldClick"
      class="fold-menu"
      :class="isFold ? 'rotate' : ''"
      ><fold
    /></el-icon>

    <div class="content">
      <div>
        <u-breadcrumb :breadcrumbs="breadcrumbs"></u-breadcrumb>
      </div>
      <div>
        <user-info />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import UserInfo from './user-info.vue'
import UBreadcrumb from '@/base-ui/breadcrumb'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
// import { Fold } from '@element-plus/icons-vue'
export default defineComponent({
  emits: ['foldChange'],
  components: {
    // Fold
    UserInfo,
    UBreadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    // 获得当前路由下，父菜单以及子菜单，并且放到相同数组中
    const breadcrumbs = computed(() => {
      const store = useStore()
      const route = useRoute()
      const userMenus = store.state.login.userMenus
      const currentPath = route.path

      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      breadcrumbs,
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
