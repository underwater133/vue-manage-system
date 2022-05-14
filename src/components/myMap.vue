<template>
  <div class="mymap" v-if="data">
    <p>全国销量展示</p>
    <div id="mymap"></div>
  </div>

</template>

<script lang="ts" setup>
import china from '@/data/china.json'
import {  watch } from 'vue'
import * as echarts from 'echarts'
import { saleMapObj } from '@/type/request'
echarts.registerMap('china', china as any)

const props = defineProps<{
  data: saleMapObj[]
}>()

let myMap: echarts.ECharts
watch(() => props.data, (newVal) => {
  const data = newVal.map(item => ({ name: item.areaName, value: isNaN(item.saleNum) ? 0 : item.saleNum }))
  if (!myMap) {
    document.getElementById("mymap")!.removeAttribute('_echarts_instance_');
    myMap = echarts.init(document.getElementById('mymap') as HTMLElement)
    const options = {
      visualMap: { //视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。有多个可以定义为数组
        type: 'continuous', // 定义为连续型 visualMap
        max: 1000000,
        min: 0,
        //calculable: false, //显示控制手柄
        show: false
      },
      tooltip: {  //鼠标悬浮显示提示的工具
        show: true,
        formatter: '{b0}</br>销量：{c0}',
        textStyle: {
          color: '#fff'
        },
        backgroundColor: 'rgba(50,50,50,0.7)',
      },
      series: {  //地图主体
        type: 'map',
        map: 'china',
        emphasis: { //鼠标悬浮时地图的样式
          label: {
            show: false
          },
          itemStyle: {
            areaColor: 'red',
          },
        },
        data  //依赖的数据
      },


    }
    myMap.setOption(options, true)
  }
})
</script>

<style scoped lang="less">
.mymap {
  // position: absolute;
  width: 800px;
  height: 600px;
  margin-top: -300px;
  // margin-left: 600px;
  p{
    font-size: 20px;
    font-weight: 600;
  }
  #mymap{
    width: 800px;
    height: 600px;
  }
}
</style>