<template>
  <div class="login-account">
    <el-form :rules="rules" :model="account" label-width="70px" ref="formRef">
      <el-form-item label="账号" prop="account">
        <el-input v-model="account.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account'
import LocalStorage from '@/utils/localStorage'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'LoginAccount',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //这里存放数据
  setup() {
    const store = useStore()
    const account = reactive({
      account: LocalStorage.get('account') || '',
      password: LocalStorage.get('password') || ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()
    // 登录动作
    const loginAction = async (isKeepPassword: boolean) => {
      await formRef.value?.validate((valid, fields) => {
        if (valid) {
          // 存储账号密码
          if (isKeepPassword) {
            // 存储本地的账号密码
            LocalStorage.set('account', account.account)
            LocalStorage.set('password', account.password)
          } else {
            // 清空本地的账号密码
            LocalStorage.remove('account')
            LocalStorage.remove('password')
          }
          // 登录
          store.dispatch('login/accountLoginAction', { ...account })
        } else {
          console.log('提交出问题了兄弟!', fields)
        }
      })
    }
    // 清空表单
    const resetForm = () => {
      formRef.value?.resetFields()
    }

    return { account, rules, formRef, loginAction, resetForm }
  }
})
</script>

<style lang="less" scoped></style>
