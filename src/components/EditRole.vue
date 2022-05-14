<template>
  <el-dialog v-model="RoleVisible" title="分配角色" :before-close="close">
    <el-form :model="form">
      <el-form-item label="角色" :label-width="formLabelWidth">
        <el-select v-model="form.userRole" placeholder="暂无分配" multiple size="large">
          <el-option v-for="role in form.roleList" :label="role.name" :value="role.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="subRole">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { getRoleListAll, getAdminRole, updateAdminRole } from '@/request/api'
import { watch, reactive } from 'vue'
import { adminRole } from '@/type/request'
import elm from '@/utils/elmessage'
//父传参
const props = defineProps<{
  RoleVisible: boolean,
  adminId: number
}>()
//子传父
const emit = defineEmits<{
  (event: 'closeRole'): void,
}>()

const formLabelWidth = '140px'

const form = reactive<{
  userRole: number[],
  roleList: adminRole[]
}>({
  userRole: [],
  roleList: []
})

//获取所有角色
getRoleListAll().then(res => {
  //获取成功
  if (res.code === 200) {
    form.roleList = res.data as adminRole[]
  }
  else { //
    console.log(res)
  }
})

// 获取用户的角色
watch(() => props.adminId, newVal => {

  getAdminRole(newVal).then(res => {
    if (res.code === 200) {
      if (res.data) {
        form.userRole = res.data.map(item => item.id)
      }
    }
    else {
      console.log(res)
    }
  })
})

//关闭对话框
const close = () => {
  emit('closeRole')
}

//确认分配
const subRole = () => {
  updateAdminRole({ adminId: props.adminId, roleIds: form.userRole.join(',') }).then(res => {
    if (res.code === 200) {
      elm.successMes('分配成功')
      emit('closeRole')
    }
    else {
      elm.failMes('分配失败')
    }
  })
}
</script>

<style scoped lang="less">
input {
  width: 400px;
}
</style>