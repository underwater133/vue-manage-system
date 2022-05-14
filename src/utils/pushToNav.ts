import { store } from '@/store/index'
import { computed } from 'vue'
//面包屑导航栏
export const pushToNav = function (path: { name: string, path: string, title?: string}) {
  let stoPath = computed(() => store.state.path)
  let len = stoPath.value.length

  if (path.name == 'role') path.title = '角色列表'
  else if (path.name == 'admin') path.title = '用户列表'
  else if (path.name == 'menu') path.title = '菜单列表'
  else if (path.name == 'resource') path.title = '资源列表'
  else if (path.name == 'addMenu') path.title = '编辑菜单'
  else if (path.name == 'calendar') path.title = '日历'
  else if (path.name == 'editor') path.title = '富文本编辑器'
  else if (path.name == 'upload') path.title = '上传文件'

  let flag = 0
  stoPath.value.forEach((item, index) => {
    if (item.path === path.path) {
      for (let j = index + 1; j < len; j++) {
        store.commit('POPNAV')
      }
      flag = 1
    }

  })
  if (!flag) { //说明不存在导航栏中，需要添加
    store.commit('PUSHTONAV', path)
  }
}


//清空面包屑
export const clearNav = (num: number) => {
  let stoPath = computed(() => store.state.path)
  while(stoPath.value.length>num + 1){
    store.commit('POPNAV')
  }
}