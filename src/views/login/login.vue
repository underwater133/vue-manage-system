<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm ms-content">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" type="text" autocomplete="off" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password" autocomplete="off" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">登陆</el-button>
        </el-form-item>
        <p class="login-tips">Tips : 超级管理员用户名为admin，密码为123456。</p>
        <p class="login-tips">Tips : 测试用户用户名为azi，密码为123456。</p>
      </el-form>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue'
import type { FormInstance } from 'element-plus'
import { adminLogin, adminInfo } from '@/request/api'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import elm from '@/utils/elmessage'
//校验账号规则
const usernameVali = (rule: unknown, value: string, callback: (str?: string) => void) => {
  if (!value) {
    callback("账号不能为空")
  }
  else {
    if (value.length < 3) {
      callback("账号长度不能小于3位")
    }
    else callback()
  }
}
//打包数据
let state = reactive({
  ruleForm: {
    username: "admin",
    pwd: "123456"
  },
  rules: {
    username: [
      { required: true, message: '账号不能为空', trigger: 'blur' }, //是否为必须以及触发方式
      { validator: usernameVali, trigger: 'blur' } //校验规则以及触发方式
    ],
    pwd: [
      { required: true, message: '密码不能为空', trigger: 'blur' }
    ]
  }
})

let { rules, ruleForm } = toRefs(state)
const router = useRouter()
const store = useStore()
//表单
const ruleFormRef = ref<FormInstance>()

//表单方法
const submitForm = (formEl: FormInstance | undefined) => {
  if (formEl) {
    formEl.validate((isVali: boolean) => { //调用rules中的规则
      if (isVali) { //验证通过
        //登陆逻辑
        adminLogin({
          username: ruleForm.value.username,
          password: ruleForm.value.pwd
        }).then(res => {
          if (res.code === 200) {
            if (res.data) {
              //将token存到本地
              let token = res.data.tokenHead + res.data.token
              localStorage.setItem('token', token)

              //获取用户信息
              store.dispatch('FETCHUSERINFO').then(() => {
                elm.successMes('登陆成功')
                router.replace('/homepage')
              }).catch(err => {
                //获取用户信息错误处理
                elm.failMes('未知错误')
              })

            }
          }
          else {
            if(res.message){
              elm.failMes(res.message)
            }
            else{
              elm.failMes('未知错误')
            }
          }
        })
      }
      else { //验证不通过
        return false
      }
    })
  }

}
</script>

<style scoped>
.login-wrap {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg1.jpg);
  background-size: 100%;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(107, 107, 107, 0.3);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
  /* margin: 0 auto; */
}

.login-btn button {
  width: 100%;
  height: 36px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #000;
}

.el-button{
  margin: 0 auto;
}
</style>