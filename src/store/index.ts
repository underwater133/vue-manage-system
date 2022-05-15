import { createStore, ActionContext } from 'vuex'
import { NewMenusObj, Menusdata } from '@/type/common'
import { responseBody, adminInfoData } from '@/type/request'
import { State } from '@/type/vuex'
import { Userinfo } from '@/type/request'
import { adminInfo } from '@/request/api'

const state = {
  userinfo: undefined,
  isCollapse: false,
  path: [{ name: 'index', path: '/index', title:'首页'}],
  loading: true,
}
const getters = {
  //将菜单变成有包含分级的菜单,且内容是键值对
  genMenus(state: State): NewMenusObj {

    const menus = JSON.parse(JSON.stringify(state.userinfo?.menus));
    const newMenus: NewMenusObj = {}

    if (menus) {
      for (let i = 0; i < menus.length; i++) {
        //一级菜单 parentId === 0
        if (!menus[i].parentId) {
          const mid = menus[i].id
          //二级菜单比一级的先遍历到
          if (newMenus[mid]?.children) {
            menus[i].children = newMenus[mid].children
          }
          newMenus[mid] = menus[i]

        }
        else {
          //二级菜单
          const parentId = menus[i].parentId
          newMenus[parentId] = newMenus[parentId] || {} //确保newMenus[parentId]是存在的，至少是个空对象，因为可能还没遍历过
          newMenus[parentId].children = newMenus[parentId].children || [] //确保newMenus[parentId].children是存在的
          newMenus[parentId].children?.push(menus[i])
        }
      }
      //自定义列表
      newMenus[1000] = {
        id: 1000,
        parentId: 0,
        createTime: "0",
        title: "其他功能",
        name: 'other',
        level: 0,
        sort: 0,
        icon: "other",
        hidden: 0,
        children:[
          //文件上传
          {
            id: 1001,
            parentId: 1000,
            createTime: "0",
            title: "文件上传",
            name: 'upload',
            level: 0,
            sort: 0,
            icon: "upload",
            hidden: 0,
          },
          //自定义日历
          {
            id: 1002,
            parentId: 1000,
            createTime: "0",
            title: "自定义日历",
            name: 'calendar',
            level: 0,
            sort: 0,
            icon: "calendar",
            hidden: 0,
          },
          //富文本编辑器
          {
            id: 1003,
            parentId: 1000,
            createTime: "0",
            title: "富文本编辑器",
            name: 'editor',
            level: 0,
            sort: 0,
            icon: "editor",
            hidden: 0,
          },
        ]
      }
    }
    return newMenus
  }
}
const actions = { //一般放异步处理

  //为了让后面的步骤按顺序执行，返回一个promise对象
  //获取用户的信息
  FETCHUSERINFO(context: ActionContext<State, State>): Promise<responseBody<adminInfoData> | number> {
    return new Promise((resolve, reject) => {
      adminInfo().then(res => {
        if (res.code === 200) {
          context.commit('SAVEUSERINFO', res.data)
          resolve(res.code)
        }
        else {
          reject(res.code)
        }
      })
    })
  }
}
const mutations = {
  //保存用户信息
  SAVEUSERINFO(state: State, value: Userinfo) {
    state.userinfo = value
  },
  //修改菜单是否隐藏
  CHANGECOLLAPSE(state: State, value: Boolean) {
    state.isCollapse = !state.isCollapse
  },

  //添加到导航
  PUSHTONAV(state: State, value: { name: string, path: string, title: string }) {
    state.path.push(value)
  },
  //弹出导航
  POPNAV(state: State) {
    state.path.pop()
  },
  //加入到第一个
  UNSHIFTTONAV(state: State, value: { name: string, path: string, title: string }) {
    state.path.unshift(value)
  },
  UNLOADING(state: State) {
    state.loading = false
  }
}

export const store = createStore<State>({
  state,
  getters,
  actions,
  mutations,
})


