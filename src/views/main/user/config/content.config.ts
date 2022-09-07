export const contentTableConfig = {
  title: '用户列表',
  isColumnIndexShow: true,
  isColumnSelectorShow: true,
  propList: [
    // { prop: 'id', label: '编号', minWidth: '100' },
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'avatar', label: '头像', minWidth: '200', slotName: 'avatar' },
    {
      prop: 'enable',
      label: '是否可用',
      minWidth: '100',
      slotName: 'enable'
    },
    {
      prop: 'createTime',
      label: '创建时间',
      minWidth: '250'
      // slotName: 'createTime'
    },
    { label: '操作', minWidth: '150', slotName: 'handler', fixed: 'right' }
  ]
}
