<template>
  <div class="index">
    <div class="option">
      <el-radio-group v-model="radio" size="large">
        <el-radio-button label="sale_">销量</el-radio-button>
        <el-radio-button label="_money">销售额</el-radio-button>
      </el-radio-group>
      <el-select v-model="select" class="m-2" placeholder="Select" size="large">
        <el-option v-for="item in radioOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>

    <div id="pie" style="height: 500px; max-width: 1400px;"></div>

    <div class="mapAndTrend">
      <saleTrend :data="state.sale" :type="state.type"/>
      <myMap :data="state.saleMap" />
    </div>

  </div>


</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, reactive, ref, watch } from 'vue'
import { getAdminStat } from '@/request/api'
import { salePieObj, saleMapObj } from '@/type/request'
import myMap from '@/components/myMap.vue'
import saleTrend from '@/components/saleTrend.vue'
import {useRoute} from 'vue-router'

let pieData: { value: number, name: string }[] = []
const state = reactive<{
  salePie: salePieObj[],
  saleMap: saleMapObj[],
  saleNums: number[],
  saleMoney: number[],
  sale: number[],
  type: string,
}>({
  salePie: [],
  saleMap: [],
  saleNums:[0, 0, 0, 0, 0],
  saleMoney: [0, 0, 0, 0, 0],
  sale:[],
  type: "销量",
})


let pieDom: HTMLElement
let myPie: any
const queryStr = ref("sale_today")
//饼图配置
const options = reactive({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    right: '20',
    height: '100'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['30%', '50%'],
      center: ['30%', '40%'],
      data: pieData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})

//初始化饼状图
const initPieCharts = () => {
  if (pieDom) {
    myPie.setOption(options,true)
  }
}

//获取首页数据
const getIndex = () => {
    // 获取首页数据
  getAdminStat().then(res => {
    if (res.errno === 0) {
      // console.log(res)
      if (res.data) {
        state.salePie = res.data.salePie
        pieData.length = 0
        pieData.push(...state.salePie.map(item => ({ value: +item.sale_today, name: item.name })))
        state.saleMap = res.data.saleMap

        //获取销量和销售额的增长值
        for (let i = 0; i < res.data.salePie.length; i++) {
          let j = 0, k = 0;
          for (let key in res.data.salePie[i]) {
            if (j < 5 && key.endsWith('_days')) {
              //@ts-ignore
              state.saleNums[j] += +res.data.salePie[i][key]
              j++
            }
            else if (k < 5 && key.endsWith('_money')) {
              //@ts-ignore
              state.saleMoney[k] += parseInt(res.data.salePie[i][key]) / 100
              k++
            }
          }
        }
        // console.log(state.saleNums, state.saleMoney)

        state.sale = state.saleNums
        document.getElementById("pie")!.removeAttribute('_echarts_instance_');
        pieDom = document.getElementById('pie')!
        myPie = echarts.init(pieDom)
        initPieCharts()
      }
    }
  })
}

// const route = useRoute()
// watch(route, () => {
//   getIndex()
// }, {immediate: true})

onMounted(() => {
  getIndex()
})


const radio = ref("sale_")
const select = ref('today')

const radioOptions = [
  {
    value: 'today',
    label: '今天',
  },
  {
    value: 'yesterday',
    label: '昨天',
  },
  {
    value: 'three_days',
    label: '3天内',
  },
  {
    value: 'seven_days',
    label: '7天内',
  },
  {
    value: 'fourteen_days',
    label: '14天内',
  },
  {
    value: 'thirty_days',
    label: '30天内',
  },
  {
    value: 'sixty_days',
    label: '60天内',
  },
]

//监听单选按钮和下拉框的选中值
watch([radio, select], (newVal) => {
  if (newVal[0] === 'sale_') {
    queryStr.value = newVal[0] + newVal[1]
    state.sale = state.saleNums
    state.type = '销量'
  } else {
    queryStr.value = newVal[1] + newVal[0]
    state.sale = state.saleMoney
    state.type = '销售额'
  }
  pieData.length = 0
  //@ts-ignore
  pieData.push(...state.salePie.map(item => ({ value: +item[queryStr.value], name: item.name })))
  initPieCharts()
})



</script>

<style scoped lang="less">
.option {
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 10px;
}
.mapAndTrend{
  display: flex;
  margin-top: -35px;
}
</style>