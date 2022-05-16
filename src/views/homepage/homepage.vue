<template>
  <div class="common-layout">
    <!-- 头部 -->
    <Header></Header>
    <el-container>
        <!-- 菜单导航部分 -->
        <Slider></Slider>

      <!-- 菜单详情展示部分 -->
      <el-main>
        <!-- 面包屑导航 -->
        <Breadcrumb />

        <!-- 动态过渡 -->
        <router-view v-slot="{ Component, route }">
          <transition name="fade">
            <component :is="Component" :key="route.path"  />
          </transition>
        </router-view>

      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue'
import Slider from '@/components/Slider.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
</script>

<style scoped lang="less">
.fade-enter-from, .fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
.fade-enter-active {
  transition: all 0.7s ease;
}
.fade-leave-active {
   transition: all 0.3s cubic-bezier(1, 0.6, 0.6, 1);
}

</style>