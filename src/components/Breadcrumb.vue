<template>
  <el-breadcrumb :separator-icon="ArrowRight" class="bread">
    <el-breadcrumb-item v-for="item in nav" :key="item.path"  :to="{ path: item.path }">{{item.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>


<script lang="ts" setup>
import { store } from '@/store/index'
import { computed } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue'
const nav = computed(() => store.state.path)
</script>

<style scoped lang="less">
.bread{
  padding: 5px 10px;
}
</style>