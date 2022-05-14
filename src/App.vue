<script setup lang="ts">
document.title = "后台管理系统"
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html,
body,
#app,
.wrapper {
  width: 100%;
  height: 100%;
  /* overflow: hidden scroll; */
  /* overflow-y: scroll; */
  overflow-x: hidden;
  /* overflow: hidden; */
}
</style>