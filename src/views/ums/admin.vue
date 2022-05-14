<template>
  <!-- 筛选用户 -->
  <div class="searchAdmin">
    <div class="top">
      <div class="title">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"></path></svg>
        <span>筛选搜索</span>
      </div>
      <div class="btn">
        <el-button type="primary" @click="state.keyword = ''">重置</el-button>
        <el-button type="primary" @click="searchAdmin">查找</el-button>
      </div>
    </div>
    <div class="search">
      <span>账号/姓名：</span>
      <el-input v-model="state.keyword" placeholder="请输入账号、姓名" />
    </div>
  </div>
  <!-- 添加用户 -->
  <div
    h="300"
    w="300"
    m="2"
    class="addAdmin"
  >
    <div class="left">
      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M704 192h160v736H160V192h160v64h384v-64zM288 512h448v-64H288v64zm0 256h448v-64H288v64zm96-576V96h256v96H384z"></path></svg>
      <span>用户列表</span>
    </div>
    <el-button type="primary" @click="addAdmin">添加</el-button>
  </div>
  <!-- 用户列表 -->
  <el-table :data="state.tableData" border style="width: 100%">
    <el-table-column fixed prop="id" label="编号" width="180" />
    <el-table-column prop="username" label="账号" width="220" />
    <el-table-column prop="nickName" label="姓名" width="220" />
    <el-table-column prop="email" label="邮箱" width="220" />
    <el-table-column label="添加时间" width="180">
      <template v-slot:default="scope">
        {{ formatTime(scope.row.createTime) }}
      </template>
    </el-table-column>
    <el-table-column label="最后登陆" width="180">
      <template v-slot:default="scope">
        {{ formatTime(scope.row.loginTime) }}
      </template>
    </el-table-column>
    <el-table-column prop="status" label="是否启用" width="180">
      <template #default="{ row }">
        <el-switch v-model="row.status" :active-value="1" :inactive-value="0" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="text" @click="editRole(row)">分配角色</el-button>
        <el-button type="text" @click="editAdmin(row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="state.total" v-model:current-page="currentpage" />

  <!-- 编辑用户 -->
  <EditAdmin :dialogFormVisible="dialogFormVisible" :admininfo="state.edAdmin" @close = "dialogFormVisible = false"
    @reload = "reload" />

  <!-- 分配角色 -->
  <EditRole :RoleVisible="RoleVisible" @closeRole = "RoleVisible = false" :adminId="clickAdminId"/>
</template>

<script lang="ts" setup>
import { AdminList } from '@/request/api'
import { reactive, watch, ref } from 'vue'
import type { AdminListObj } from '@/type/request'
import formatTime from '@/utils/formatTime'
import EditAdmin from '@/components/EditAdmin.vue'
import EditRole from '@/components/EditRole.vue'
const state = reactive<{ tableData: AdminListObj[], total: number, edAdmin: Partial<AdminListObj>, keyword: string}>({
  tableData: [],
  total: 0,
  edAdmin:{},
  keyword: "",
})

//获取用户列表
const getAdminList = (keyword: string = "", pageNum: number = 1, pageSize: number = 10) => {
  AdminList({ keyword, pageNum, pageSize }).then(res => {
    if (res.code == 200) {
      if (res.data) {
        state.tableData = res.data.list
        state.total = res.data.total!
      }
    }
    //错误处理
    else {

    }
  })
}
getAdminList()

//监听分页请求数据
let currentpage = ref(1)
watch(currentpage, (newVal) => {
  getAdminList(state.keyword, newVal)
})
//重新拉取数据
const reload = () => {
  getAdminList(state.keyword,currentpage.value)
  state.edAdmin = {}
}

//搜索用户
const searchAdmin = () => {
  getAdminList(state.keyword)
}

//编辑用户对话框是否显示
const dialogFormVisible = ref(false)

//点击编辑用户
const editAdmin = (row: AdminListObj) => {
  dialogFormVisible.value = true
  state.edAdmin = row
}

//点击添加用户
const addAdmin = ()=> {
  dialogFormVisible.value = true
}


//分配角色对话框是否显示
const RoleVisible = ref(false)
//点击分配角色
const clickAdminId = ref(0)
const editRole = (row: AdminListObj) => {
  RoleVisible.value = true
  clickAdminId.value = row.id
}
</script>

<style lang="less">
.el-pagination {
  margin-top: 10px;
  justify-content: flex-end;
}

.cell {
  height: 35px;
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