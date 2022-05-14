<template>
  <div class="container">
    <h1>自定义Element日历</h1>
    <el-calendar v-model="myDate">
      <template #dateCell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
        <p style="font-size: 18px; font-weight: 600;">{{ data.day.split('-').slice(2).join('-') }}</p>
        <p v-if="calendar.solar2lunar(...data.day.split('-')).festival" style="font-size: 14px;">
        {{ // @ts-ignore
            calendar.solar2lunar(...data.day.split('-')).festival
        }}
        </p>
        <p v-else style="font-size: 14px;">
          {{calendar.solar2lunar(...data.day.split('-')).IDayCn }}
        </p>
        <p style="font-size: 12px;">{{ 
            calendar.solar2lunar(...data.day.split('-')).gzDay
        }}</p>
        <p>{{ data.isSelected ? '✔️' : '' }}</p>
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// @ts-ignore
import { calendar } from "@/utils/calendar.js"
const myDate = ref(new Date())

</script>

<style scoped lang="less">
.container{
  width:1000px
}
</style>