type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select 下拉框的数据
  typeData?: any
  // 针对特殊的属性,可以理解为原本有什么就可以用什么
  props?: any
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout: any // span 的值
  itemLayout: any
}
