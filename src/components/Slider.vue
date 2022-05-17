<template>
  <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
    text-color="#fff" :unique-opened="true" :router="true" :collapse="isCollapse">
    <el-sub-menu v-for="(menu) in menus" :key="menu.id" :index="'/' + menu.name">
      <template #title>
        <el-icon>
          <component :is="menu.icon">
          </component>
        </el-icon>

        <span>{{ menu.title === '权限' || menu.title === '其他功能' ? menu.title : menu.title + '(待实装)' }}</span>
      </template>
      <!-- 渲染菜单栏 -->
      <template v-for="(submenu) in menu.children">
        <el-menu-item v-if="!submenu.hidden" :key="submenu.id" :index="'/' + menu.name + '/' + submenu.name">{{
            submenu.title
        }}</el-menu-item>
      </template>
    </el-sub-menu>


  </el-menu>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { NewMenusObj } from '@/type/common'
import { computed } from 'vue'
import { Location } from '@element-plus/icons-vue'

const store = useStore()
const menus: NewMenusObj = store.getters.genMenus


let isCollapse = computed(() => store.state.isCollapse)

</script>

<style scoped lang="less">
.el-menu-vertical-demo {
  position: relative;

  height: 900px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
}
</style>