<template>
  <el-header class="header">

    <div class="title">

      <div class="collapse-btn" @click="changeCollapse">
        <el-icon v-if="!isCollapse">
          <arrow-left-bold />
        </el-icon>
        <el-icon v-else>
          <arrow-right-bold />
        </el-icon>
      </div>
      <div @click="router.push('/index')">后台管理系统</div>
    </div>
    <div class="user">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <span>{{ store.state.userinfo?.username }}</span>
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8="">
            <path fill="currentColor" d="m192 384 320 384 320-384z"></path>
          </svg>
          <el-icon class="el-icon--right">
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="index">首页</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script lang="ts" setup>
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '@/store/index'
import { clearNav } from '@/utils/pushToNav'
const router = useRouter()

let isCollapse = computed(() => store.state.isCollapse)

//菜单栏隐藏或者显示
const changeCollapse = () => {
  store.commit('CHANGECOLLAPSE')
}

//用户下拉菜单控制
const handleCommand = (command: string) => {
  //退出登陆
  if (command === "logout") {
    localStorage.clear()
    clearNav(0)
    store.commit('SAVEUSERINFO', undefined)
    router.replace('/login')
  }
  else if (command == "index") {
    router.push('/index')
  }
}
</script>

<style scoped lang="less">
.header {
  background-color: #3e4347;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;

  .title {
    font-size: 28px;
    cursor: pointer;
    display: flex;
    align-items: center;

    .collapse-btn {
      margin-top: 5px;
      margin-right: 10px;
      height: 30px;
    }
  }

  .el-dropdown-link {
    color: white;
    cursor: pointer;

    svg {
      width: 14px;
      margin-left: 3px;
      vertical-align: text-top;
    }
  }
}
</style>