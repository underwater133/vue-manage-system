import requset from './request'
import {
  loginParams, loginData, responseBody, adminInfoData, AdminListParams,
  MenuListParams, MenuListResponse, MenuListObj, indexData, AdminsList, AdminListObj,
  adminRole,resourceList, resourceCate,resourceListObj
} from '@/type/request'

//登陆
export const adminLogin = (data: loginParams): Promise<responseBody<loginData>> => requset.post('/admin/login', data)

//获取当前登陆用户信息
export const adminInfo = (): Promise<responseBody<adminInfoData>> => requset.get('/admin/info')

//加载用户列表或搜查个人
export const AdminList = (params: Partial<AdminListParams>): Promise<responseBody<AdminsList>> => requset.get('/admin/list', { params })

//获取后台菜单列表
export const MenuList = (pid: number, params: Partial<MenuListParams>): Promise<responseBody<MenuListResponse>> => requset.get('/menu/list/' + pid, { params })

//获取后台菜单列表
export const MenuDetail = (pid: number): Promise<responseBody<MenuListObj>> => requset.get('/menu/' + pid)

//修改后台菜单信息
export const updateMenu = (id: number, data:Partial<MenuListObj>): Promise<responseBody<unknown>> => requset.post('/menu/update/' + id, data)

//首页数据
export const getAdminStat =  (): Promise<responseBody<indexData>> => requset.get('http://kumanxuan1.f3322.net:8360/admin/stat')


//修改用户信息
export const updateAdmin = (id: number, data: AdminListObj):Promise<responseBody<AdminListObj>> => requset.post('/admin/update/' + id, data)

//添加用户
export const addAdmin = (data: AdminListObj):Promise<responseBody<AdminListObj>> => requset.post('/admin/register', data)


//获取所有角色
export const getRoleListAll = ():Promise<responseBody<adminRole[]>> => requset.get('/role/listAll')

//获取指定用户的角色
export const getAdminRole = (id: number):Promise<responseBody<adminRole[]>> => requset.get('admin/role/' + id)

//分配用户角色
export const updateAdminRole = (data: {adminId: number, roleIds: string}):Promise<responseBody<number>> => requset.post('/admin/role/update',null, { params:data })

//获取资源列表 
export const getResource = (params:{pageNum: number, pageSize: number}):Promise<responseBody<resourceList>> => requset.get('/resource/list', {params})

//获取所有资源列表
export const getResourceAll = ():Promise<responseBody<resourceListObj[]>> => requset.get('/resource/listAll')

//获取所有资源分类
export const getResourceCate = ():Promise<responseBody<resourceCate[]>> => requset.get('/resourceCategory/listAll')