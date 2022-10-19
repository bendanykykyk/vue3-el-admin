export interface IPageListParams {
  url?: string
  pathName?: string
  pageName?: string
  queryInfo: any
}

export interface IDeletePageDataParams {
  url?: string
  pageName: string
  queryInfo: any
}

export interface INewPageDataParams {
  pageName: string
  formData: any
}
