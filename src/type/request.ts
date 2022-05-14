import { Menusdata } from './common'
//登陆参数
export interface loginParams {
  username: string,
  password: string
}
//登陆返回的data中的数据结构
export interface loginData {
  token: string,
  tokenHead: string
}

//获取登陆用户信息的data中的数据结构
export interface adminInfoData {
  roles: string[],
  icon: string,
  menus: unknown[],
  username: string
}

//返回数据结构
export interface responseBody<T = null> {
  code?: number,
  message?: string,
  data?: T,
  errmsg?: string,
  errno?: number,
}

//用户信息
export interface Userinfo {
  icon: string | null,
  username: string,
  roles: string[],
  menus: Menusdata[]
}

interface queryParams {
  pageNum: number,
  pageSize: number,
  total? : number
}



// 搜索用户列表的参数接口
export interface AdminListParams extends queryParams {
  keyword?: string,
}

//搜索用户列表详细信息
export interface AdminListObj {
  id: number,
  username: string,
  password: string, 
  icon: string,
  email: string,
  nickName: string,
  note: string,
  createTime: string,
  loginTime: string,
  status: number,
}
//搜索用户列表结果
export interface AdminsList extends queryParams{
  list: AdminListObj[]
}

//搜索后台菜单列表参数接口
export interface MenuListParams extends queryParams { }

//后台菜单列表list元素内容接口
export interface MenuListObj {
  id: number,
  parentId: number,
  createTime: string,
  title: string,
  level: number,
  sort: number,
  name: string,
  icon: string,
  hidden: 0 | 1,
}

//后台菜单列表内容接口
export interface MenuListResponse extends queryParams {
  list: MenuListObj[]
}

//首页数据内容接口
export interface indexData{
  salePie: salePieObj[],
  saleMap: saleMapObj[],
}

//首页饼状图数据接口
export interface salePieObj {
  first_cid: number,
  sale_today: string,
  sale_yesterday: string,
  sale_three_days: string,
  sale_seven_days: string,
  sale_fourteen_days: string,
  sale_thirty_days: string,
  sale_sixty_days: string,
  today_money: string,
  yesterday_money: string,
  three_days_money: string,
  seven_days_money: string,
  fourteen_days_money: string,
  thirty_days_money: string,
  sixty_days_money: string,
  name: string
}

//首页地图数据接口
export interface saleMapObj{
  areaName: string,
  hasTrade: number,
  saleNum: number,
  __typename: string,
}

//用户角色详情
export interface adminRole{
  id: number,
  name: string,
  description: string,
  adminCount?: number,
  createTime?: string,
  status?: number,
  sort?: number,
}

//资源列表详情
export interface resourceList{
  total: number,
  list: resourceListObj[]
}

// 资源模块
export interface resourceCate{
  id: number,
  createTime: string,
  name: string,
}

//资源详情
export interface resourceListObj extends resourceCate{
  url: string,
  description: string,
  categoryId: number,
}

