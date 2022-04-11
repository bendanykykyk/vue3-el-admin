import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  itemLayout: {
    padding: '0px 0px'
  },
  colLayout: {
    // span:8, 这个不好，因为固定死了，这样的话页面缩小的时候输入框会很小
    xl: 6, // >1920px 4个
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  },
  formItems: [
    {
      type: 'input',
      label: '用户编号',
      props: {
        // placeholder: '嘿嘿',
        clearable: true
      }
      // placeholder: '请输入id'
    },
    {
      type: 'input',
      label: '用户名'
      // placeholder: '请输入用户名'
    },
    {
      type: 'password',
      label: '密码'
      // placeholder: '请输入密码'
    },
    {
      type: 'select',
      label: '喜欢的运动',
      // placeholder: '请选择喜欢的运动',
      typeData: [
        { label: '篮球', value: 'basketball' },
        { label: '足球', value: 'football' }
      ]
    },
    {
      type: 'datepicker',
      label: '创建时间',
      props: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
