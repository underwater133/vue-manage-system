<template>
  <el-form ref="formRef" :model="menuObj" label-width="120px" :rules="rules">
    <el-form-item label="菜单名称" prop="title">
      <el-input v-model="menuObj.title" />
    </el-form-item>
    <el-form-item label="上级菜单">
      <el-select v-model="menuObj.parentId" placeholder="please select your zone">
        <el-option label="无上级菜单" :value="0"></el-option>
        <el-option v-for="item in menuList" :key="item.id" :label="item.title" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="前端名称" prop="name">
      <!-- 在有id传进来的情况下， 不能修改前端名称 -->
      <el-input v-model="menuObj.name" :disabled="!!route.query.id" />
    </el-form-item>
    <el-form-item label="是否显示">
      <el-radio-group v-model="menuObj.hidden">
        <el-radio :label="0">是</el-radio>
        <el-radio :label="1">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="排序">
      <el-input v-model="menuObj.sort" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { MenuDetail, MenuList, updateMenu } from '@/request/api'
import { useRoute, useRouter } from 'vue-router'
import { reactive, toRefs, ref } from 'vue'
import { MenuListObj } from '@/type/request'
import elm from '@/utils/elmessage'
const router = useRouter()
const route = useRoute()

const state = reactive<{ menuObj: Partial<MenuListObj>, menuList: MenuListObj[] }>({
  menuObj: {},
  menuList: []
})
let { menuObj, menuList } = toRefs(state)
let formRef = ref()
// 规则
const rules = {
  title: [
    { required: true, message: "菜单名称不能为空", trigger: 'blur' }
  ],
  name: [
    { required: true, message: "前端名称不能为空", trigger: 'blur' }
  ]
}

//获取菜单详情
if (route.query.id) {
  MenuDetail(+route.query.id).then(res => {
    if (res.code === 200) {
      if (res.data) {
        state.menuObj = res.data
      }
    }
  })
}

//获取一级菜单列表
MenuList(0, { pageNum: 1, pageSize: 100 }).then(res => {
  if (res.code === 200) {
    if (res.data) {
      state.menuList = res.data.list
    }
  }
})


//提交按钮
const onSubmit = () => {
  formRef.value.validate((isValid: boolean) => {
    if (isValid && route.query.id) {
      updateMenu(+route.query.id, menuObj.value).then(res => {
        if (res.code === 200) {
          elm.successMes('菜单修改成功')
          router.push('/ums/menu')
        }
        else {
          elm.successMes('菜单修改失败')
        }
      })
    }
  })
}

</script>

<style lang="less" scoped>
</style>