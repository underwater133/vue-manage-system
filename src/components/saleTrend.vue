<template>
<div v-if="data">
  <p style="text-align: left; font-size: 20px; font-weight: 600; margin-top: -100px;">{{type}}趋势</p>
  <div id="main" style="width: 800px; height: 400px;"></div>
</div>
  
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { watch } from 'vue';


let myChart: echarts.ECharts

const props = defineProps<{
  data: number[],
  type: string
}>()


watch(() => props.data, (newVal) => {

  const option = {
    xAxis: {
      data: ['3天内', '7天内', '14天内', '30天内', '60天内']
    },
    yAxis:{
      name:props.type==='销售额'?props.type+'/100':props.type
    },
    series: [
      {
        data: props.data,
        type: 'line',
        smooth: true
      }
    ],
    tooltip: {  //鼠标悬浮显示提示的工具
      show: true,
      formatter: `{b0}</br>${props.type}：{c0}`,
      textStyle: {
        color: '#fff'
      },
      backgroundColor: 'rgba(50,50,50,0.7)',
    },
  };
  if (!myChart) {
    document.getElementById("main")!.removeAttribute('_echarts_instance_'); 
    myChart = echarts.init(document.getElementById('main') as HTMLElement)
  }
  myChart.setOption(option, true)
})

</script>

<style scoped lang="less">
</style>