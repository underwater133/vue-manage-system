<template>
  <!-- 筛选角色 -->
  <div class="searchAdmin">
    <div class="top">
      <div class="title">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"></path></svg>
        <span>筛选搜索</span>
      </div>
      <div class="btn">
        <el-button type="primary" @click="state.keyword = ''">重置</el-button>
        <el-button type="primary" @click="searchRole">查找</el-button>
      </div>
    </div>
    <div class="search">
      <span>角色名称：</span>
      <el-input v-model="state.keyword" placeholder="请输入角色名称" />
    </div>
  </div>
  <!-- 添加角色 -->
  <div
    h="300"
    w="300"
    m="2"
    class="addAdmin"
  >
    <div class="left">
      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M704 192h160v736H160V192h160v64h384v-64zM288 512h448v-64H288v64zm0 256h448v-64H288v64zm96-576V96h256v96H384z"></path></svg>
      <span>角色列表</span>
    </div>
  </div>
  <!-- 用户列表 -->
  <el-table :data="state.showData" border style="width: 100%">
    <el-table-column prop="id" label="编号" width="180" />
    <el-table-column prop="name" label="角色名称" width="300" />
    <el-table-column prop="description" label="描述" width="260" />
    <el-table-column prop="adminCount" label="用户数" width="280" />
    <el-table-column label="添加时间" width="180">
      <template v-slot:default="scope">
        {{ formatTime(scope.row.createTime) }}
      </template>
    </el-table-column>
    <el-table-column prop="status" label="是否启用" width="180">
      <template #default="{ row }">
        <el-switch v-model="row.status" :active-value="1" :inactive-value="0" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="text" @click="atrrRes(row)" disabled>分配资源</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="state.total" v-model:current-page="currentpage" />

</template>

<script lang="ts" setup>
import { getRoleListAll } from '@/request/api'
import { reactive, ref } from 'vue'
import type { adminRole } from '@/type/request'
import formatTime from '@/utils/formatTime'
import { useRouter } from 'vue-router'
const state = reactive<{ tableData: adminRole[],showData: adminRole[], total: number, keyword: string}>({
  tableData: [],
  showData:[],
  total: 0,
  keyword: "",
})
const router = useRouter()

//获取所有角色
getRoleListAll().then(res => {
  if(res.code === 200){
    if(res.data){
      state.tableData = res.data
      state.total = res.data.length
      state.showData = res.data
    }
  }
})


//监听分页请求数据
let currentpage = ref(1)
// watch(currentpage, (newVal) => {
//   getAdminList("", newVal)
// })


//搜索用户
const searchRole = () => {
  state.showData = state.tableData.filter(item => item.name.includes(state.keyword))
}

//分配资源
const atrrRes = (row: adminRole) =>{
  console.log(row)
  router.push('/ums/allocResource?id=' + row.id)
}

</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 10px;
  justify-content: flex-end;
}

.cell {
  height: 42px;
  width: 210px !important;
  overflow: hidden;
  white-space: nowrap !important;
  text-overflow: ellipsis;
}
.left{
  display: flex;
  align-items: center;
  svg{
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  span{
    color: rgb(100, 100, 100);
  }
}

.addAdmin{
  display: flex;
  height: 60px;
  margin: 10px 0;
  padding: 5px 10px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15), 0 6px 14px 0 rgba(0, 0, 0, 0.15);
}
.searchAdmin{
  display: flex;
  height: 130px;
  margin: 10px 0;
  padding: 20px 15px;
  flex-direction: column;
  // align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15), 0 6px 14px 0 rgba(0, 0, 0, 0.15);
  color: rgb(100, 100, 100);
  
  .top{
    width: 100%;
    display: flex;
    justify-content: space-between;
    .title{
      display: flex;
      align-items: center;
      svg{
        width: 18px;
        margin-right: 10px;
      }
    }
    .btn{
      display: flex;
    }
  }

  .search{
    width: 400px;
    padding: 10px 15px;
    align-self: flex-start;
    display: flex;
    align-items: center;
    span{
      width: 120px;
    }
  }
}
</style>