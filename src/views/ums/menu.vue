<template>
  <el-table :data="state.tableData" border style="width: 100%; margin-top: 10px;">
    <el-table-column fixed prop="id" label="编号" width="180" />
    <el-table-column prop="title" label="菜单名称" width="180" />
    <el-table-column label="菜单级数" width="180">
      <template #default="scope">{{ scope.row.level === 0 ? '一级' : '二级' }}</template>
    </el-table-column>
    <el-table-column prop="name" label="前端名称" width="180" />
    <el-table-column label="是否显示" width="180">
      <template #default="{ row }">
        <el-switch v-model="row.hidden" :active-value="0" :inactive-value="1" />
      </template>
    </el-table-column>
    <el-table-column prop="sort" label="排序" width="180" />
    <el-table-column label="设置" width="180">
      <template #default="{ row, $index }">
        <el-button type="text" @click="jumpNextMenu(row)" :disabled="row.parentId !== 0">查看下级</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row, $index }">
        <el-button type="text" @click="editMenu(row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination background layout="prev, pager, next" :total="state.total" v-model:current-page="currentpage" />

</template>

<script lang="ts" setup>
import { reactive, watch, ref } from 'vue'
import { MenuList } from '@/request/api'
import type { MenuListObj } from '@/type/request'
import { useRouter, useRoute } from 'vue-router'
const state = reactive<{ tableData: MenuListObj[], total: number }>({
  tableData: [],
  total: 0
})
const router = useRouter()
const route = useRoute()

let pid = 0
//解决刷新问题
if (route.query.pid) {
  pid = + route.query.pid // 强转为number
}


//获取后台菜单列表
const getMenuList = (pid: number, pageNum: number = 1, pageSize: number = 10) => {
  MenuList(pid, { pageNum, pageSize }).then(res => {
    if (res.code === 200) {
      if (res.data) {
        state.tableData = res.data.list
        // state.tableData = res.data.list.filter((val) => !val.hidden)
        state.total = res.data.total!
      }
    }
  })
}

//监听分页请求数据
let currentpage = ref(1)
watch(currentpage, (newVal) => {
  getMenuList(pid, newVal)
})

//跳转到下级菜单
const jumpNextMenu = (row: MenuListObj) => {
  router.push('/ums/menu?pid=' + row.id)
}

//编辑菜单
const editMenu = (row: MenuListObj) => {
  router.push('/ums/addMenu?id=' + row.id)
}

getMenuList(pid)
//监听路由对象的变化， 主要监测携带参数的变化，用于重新请求数据
watch(route, (newVal) => {
  if (newVal.query.pid) { //有则说明当前在二级菜单中
    getMenuList(+newVal.query.pid)
  }
  else { //没有则在一级菜单中
    getMenuList(0)
  }
})
</script>

<style scoped lang="less">
.el-pagination {
  margin-top: 10px;
  justify-content: flex-end;
}
</style>