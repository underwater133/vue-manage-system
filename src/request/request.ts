import axios from 'axios'

//创建实例
const instance = axios.create({
  baseURL:"https://120.24.64.5:8088/mall-admin",
  timeout: 15000
})

//请求拦截器
instance.interceptors.request.use(config =>{
  //添加请求头
  let token = localStorage.getItem('token')
  if(token){
    config.headers = config.headers || {}  //确保headers对象是存在的
    config.headers.Authorization = token
  }
  return config
}, err =>{
  return Promise.reject(err)
})

//请求响应器
instance.interceptors.response.use(result =>{
  return result.data
}, err =>{
  return Promise.reject(err)
})

export default instance