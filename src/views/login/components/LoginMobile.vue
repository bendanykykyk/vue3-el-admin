<template>
  <div class="login-account">
    <el-form
      ref="formRef"
      :rules="rules"
      :model="mobileLoginForm"
      label-width="70px"
    >
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="mobileLoginForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="mobileLoginForm.code"></el-input>
          <el-button type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/mobile'
export default defineComponent({
  name: 'LoginMobile',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  //这里存放数据
  setup() {
    const mobileLoginForm = reactive({
      mobile: '',
      code: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    // 登录动作
    const loginAction = async () => {
      await formRef.value?.validate((valid, fields) => {
        if (valid) {
          console.log('手机登录!')
        } else {
          console.log('提交出问题了兄弟!', fields)
        }
      })
    }
    // 清空表单
    const resetForm = () => {
      formRef.value?.resetFields()
    }
    return { mobileLoginForm, rules, loginAction, resetForm, formRef }
  }
})
</script>

<style lang="less" scoped>
.login-account {
  .get-code {
    width: 100%;
    display: flex;
    justify-content: space-between;
    :nth-child(2) {
      margin-left: 10px;
    }
  }
}
</style>
