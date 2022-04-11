<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<script lang="ts">
import LoginPanel from '@/views/login/components/LoginPanel.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LoginIndex',
  //import引入的组件需要注入到对象中才能使用
  components: {
    LoginPanel
  },

  //这里存放数据
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.login {
  background: url('../../assets/img/login-bg.svg');
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
