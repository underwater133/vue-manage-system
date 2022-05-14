//用户信息中的menus
export interface Menusdata {
  id: number,
  parentId: number,
  createTime: string,
  title: string,
  level: number,
  sort: number,
  name: string,
  icon: string | null,
  hidden: number,
  children?: Menusdata[]
}

export interface NewMenusObj {
  [key: string]: Menusdata  //键值对
}


