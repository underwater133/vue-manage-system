import { ElMessage } from 'element-plus'
import '../../node_modules/element-plus/theme-chalk/el-message.css'

const successMes = (msg: string) => {
  ElMessage({
    message: msg,
    type: 'success',
  })
}
//修改失败消息提醒
const failMes = (msg: string) => {
  ElMessage({
    message: msg,
    type: 'error',
  })
}

export default {successMes, failMes}