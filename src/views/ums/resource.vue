<template>
  <el-table :data="state.tableData" border style="width: 100%; margin-top: 10px;">
    <el-table-column fixed prop="id" label="编号" width="70" />
    <el-table-column prop="name" label="资源名称" width="350" />
    <el-table-column prop="url" label="资源路径" width="350" />
    <el-table-column prop="description" label="描述" width="400" />
    <el-table-column label="添加时间">
      <template #default="scope">
        {{ formatTime(scope.row.createTime) }}
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="state.total" v-model:current-page="currentpage" />
</template>

<script lang="ts" setup>
import { getResource } from '@/request/api'
import { reactive, ref, watch } from 'vue'
import { resourceListObj } from '@/type/request'
import formatTime from '@/utils/formatTime'
const state = reactive<{
  tableData: resourceListObj[], total: number
}>({
  tableData: [],
  total: 0
})

//获取资源列表
const getRes = (pageNum: number, pageSize: number) => {
  getResource({ pageNum, pageSize }).then(res => {
    if (res.code === 200) {
      if (res.data) {
        state.tableData = res.data.list
        state.total = res.data.total
      }
    }
    else {
      //错误处理
    }
  })
}
getRes(1, 10)

//监听当前分页
const currentpage = ref(1)
watch(currentpage, (newVal) => {
  getRes(newVal, 10)
})
</script>

<style scoped lang="less">
.el-pagination {
  margin-top: 10px;
  justify-content: flex-end;
}
</style>