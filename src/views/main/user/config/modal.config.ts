import { IForm } from '@/base-ui/form'
export const modalFormConfig: IForm = {
  labelWidth: '100px',

  // itemLayout: {
  //   padding: '0px 0px'
  // },

  colLayout: {
    span: 24
    // xl: 6, // >1920px 4个
    // lg: 8,
    // md: 12,
    // sm: 24,
    // xs: 24
  },
  formItems: [
    {
      type: 'input',
      label: '用户编号',
      props: {
        // placeholder: '嘿嘿',
        clearable: true
      },
      key: 'id'
      // placeholder: '请输入id'
    },
    {
      type: 'input',
      label: '用户名',
      key: 'name'
      // placeholder: '请输入用户名'
    },
    {
      type: 'password',
      label: '密码',
      key: 'password',
      isHidden: false
      // placeholder: '请输入密码'
    },
    {
      type: 'select',
      label: '喜欢的运动',
      key: 'hobby',
      // placeholder: '请选择喜欢的运动',
      typeData: [
        { label: '篮球', value: 'basketball' },
        { label: '足球', value: 'football' }
      ]
    },
    {
      type: 'select',
      label: '部门',
      key: 'departmentId',

      typeData: []
    },
    {
      type: 'select',
      label: '职位',
      key: 'dutyId',
      // placeholder: '请选择喜欢的运动',
      typeData: []
    }
  ]
}
