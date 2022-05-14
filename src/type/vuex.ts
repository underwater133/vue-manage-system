import {Userinfo} from './request'

export interface State {
  userinfo?: Userinfo,  //可缺省，如果没有则为undefined
  isCollapse: boolean,
  path: {name:string, path:string, title: string}[],
  loading: boolean
}
