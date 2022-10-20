<template>
  <div class="">
    <el-dropdown>
      <span class="el-dropdown-link" style="display: flex; align-items: center">
        <el-avatar :size="25" :src="$store.state.login.userInfo.logo[0].url" />
        <span style="margin-left: 5px">{{ name }}</span>
        <!-- <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon> -->
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <!-- <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item> -->
          <el-dropdown-item
            icon="CircleCloseFilled"
            @click="handleLoginOutClick"
          >
            登出
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import localStorage from '@/utils/localStorage'
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'user-info',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //这里存放数据
  setup() {
    const store = useStore()
    const router = useRouter()
    let name = computed(() => store.state.login.userInfo.name)

    const handleLoginOutClick = () => {
      localStorage.remove('token')
      router.push({ name: 'Login' })
    }
    return {
      name,
      handleLoginOutClick
    }
  }
})
</script>

<style lang="less" scoped></style>
