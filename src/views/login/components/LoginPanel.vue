<template>
  <div class="login-panel">
    <el-tabs type="border-card" stretch v-model="currentTabName">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <span
              ><el-icon><user-filled /></el-icon> 账号登录
            </span>
          </span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>

      <el-tab-pane name="mobile">
        <template #label>
          <span class="custom-tabs-label">
            <span
              ><el-icon><phone-filled /></el-icon> 手机登录</span
            >
          </span>
        </template>
        <LoginMobile ref="mobileRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <!-- 登录按钮 -->
    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { UserFilled, PhoneFilled } from '@element-plus/icons-vue'
import LoginAccount from './LoginAccount.vue'
import LoginMobile from './LoginMobile.vue'

export default defineComponent({
  name: 'LoginPanel',
  //import引入的组件需要注入到对象中才能使用
  components: {
    LoginAccount,
    LoginMobile,
    UserFilled,
    PhoneFilled
  },
  //这里存放数据
  setup() {
    const currentTabName = ref('account')
    const isKeepPassword = ref(true)
    // const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const mobileRef = ref<InstanceType<typeof LoginMobile>>()
    const handleLoginClick = () => {
      if (currentTabName.value === 'account') {
        console.log(isKeepPassword.value)
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        mobileRef.value?.loginAction()
      }
    }
    return {
      isKeepPassword,
      currentTabName,
      accountRef,
      mobileRef,
      handleLoginClick
    }
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  width: 320px;
}
.login-btn {
  width: 100%;
  margin-top: 10px;
}
.account-control {
  padding: 10px 10px 0 10px;
  display: flex;
  justify-content: space-between;
}
</style>
