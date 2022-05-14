<template>
  <el-dialog v-model="dialogFormVisible" title="用户" :before-close="close">
    <el-form :model="state.newAdmininfo">
      <el-form-item label="账号：" :label-width="formLabelWidth">
        <el-input v-model="state.newAdmininfo.username" autocomplete="off" type="text" required />
      </el-form-item>
      <el-form-item label="姓名：" :label-width="formLabelWidth">
        <el-input v-model="state.newAdmininfo.nickName" autocomplete="off" type="text" required />
      </el-form-item>
      <el-form-item label="邮箱：" :label-width="formLabelWidth">
        <el-input v-model="state.newAdmininfo.email" autocomplete="off" type="email" required  />
      </el-form-item>
      <el-form-item label="密码：" :label-width="formLabelWidth">
        <el-input v-model="state.newAdmininfo.password" autocomplete="off" type="text" required />
      </el-form-item>
      <el-form-item label="备注：" :label-width="formLabelWidth">
        <el-input v-model="state.newAdmininfo.note" autocomplete="off" type="textarea" rows="4" />
      </el-form-item>
      <el-form-item label="是否启用：" :label-width="formLabelWidth">
        <el-radio-group v-model="state.newAdmininfo.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="modifyAdmin">修改</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { AdminListObj } from '@/type/request'
import { watch, reactive, ref } from 'vue'
import { updateAdmin, addAdmin } from '@/request/api'
import elm from '@/utils/elmessage'


//父传参
const props = defineProps<{
  dialogFormVisible: Boolean,
  admininfo: Partial<AdminListObj>
}>()
//子传父
const emit = defineEmits<{
  (event: 'close'): void,
  (event: 'reload'): void
}>()


const formLabelWidth = '140px'
const state = reactive<{ newAdmininfo: Partial<AdminListObj> }>({
  // newAdmininfo: props.admininfo  //这里是引用， 会直接修改父组件的值
  newAdmininfo: {},
})
watch(() => props.admininfo, (newVal) => {
  state.newAdmininfo = JSON.parse(JSON.stringify(newVal)) //深拷贝
}, {
  immediate: true
})

//确认
const modifyAdmin = () => {
  if (state.newAdmininfo.id) { //修改用户信息
    updateAdmin(state.newAdmininfo.id, state.newAdmininfo as AdminListObj).then(res => {
      if (res.code === 200) {
        elm.successMes('修改成功')
        emit('close')
        emit('reload')  //告诉父组件更新数据
      }
      //错误处理
      else {
        elm.failMes('修改失败')
      }
    })
  }
  else {  //添加用户信息
    //暂无表单校验，添加失败请查看控制台
    addAdmin(state.newAdmininfo as AdminListObj).then(res => {
      if(res.code === 200){
        elm.successMes('添加成功')
        close()
        emit('reload')
      }
      else{
        elm.failMes(res.message!)
      }
    })
  }
}

const close = () => {
  emit('close')
  state.newAdmininfo = {}
}

</script>

<style scoped lang="less">
</style>