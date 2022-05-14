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
        <router-view></router-view>
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

</style>