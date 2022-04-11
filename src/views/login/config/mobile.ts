export const rules = {
  mobile: [
    {
      required: true,
      message: '手机号是必传内容~',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '验证码是必传内容~',
      trigger: 'blur'
    }
  ]
}
