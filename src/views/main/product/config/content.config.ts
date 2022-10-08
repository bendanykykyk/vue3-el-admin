export const contentTableConfig = {
  title: '商品列表',
  isColumnIndexShow: true,
  isColumnSelectorShow: true,
  propList: [
    { prop: 'id', label: '商品编号', minWidth: '100' },
    { prop: 'name', label: '商品名称', minWidth: '100' },
    // { prop: 'avatar', label: '头像', minWidth: '200', slotName: 'avatar' },
    { prop: 'oldPrice', label: '商品原价', minWidth: '100' },
    {
      prop: 'newPrice',
      label: '商品价格',
      minWidth: '100',
      slotName: 'newPrice'
    },
    {
      prop: 'enable',
      label: '是否可用',
      minWidth: '100',
      slotName: 'enable'
    },
    { label: '操作', minWidth: '150', slotName: 'handler', fixed: 'right' }
  ]
}
