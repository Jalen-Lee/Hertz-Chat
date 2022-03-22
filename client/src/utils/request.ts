import axios from 'axios'
import { notification } from 'antd'
import { getToken } from './token'

const baseURL = process.env.REACT_APP_BASE_URL
const request = axios.create({
  baseURL,
  timeout: 3000,
})

// token白名单
const whiteList = new Set(['/auth/login', '/auth/signup', '/auth/checkToken'])

// 请求异常拦截器
const reqErrorHandler = (error: any) => {
  console.group('http请求错误，未发出')
  console.log(error)
  notification.error({
    message: `请求错误`,
    description: error.toString(),
  })
  console.groupEnd()
  return Promise.reject(error)
}

// 响应异常拦截器
const resErrorHandler = (error: any) => {
  console.group('http响应错误')
  console.log('响应体', error.response)
  console.log('错误体', error)
  console.groupEnd()
  notification.error({
    message: `响应错误`,
    description: error.toString(),
  })
  // switch (status) {
  //   case 400: error.message = '请求错误'; break;
  //   case 401: error.message = '未授权，请登录'; break;
  //   case 403: error.message = '拒绝访问'; break;
  //   case 404: error.message = `请求地址出错: ${error.response.config.url}`; break;
  //   case 408: error.message = '请求超时'; break;
  //   case 500: error.message = '服务器内部错误'; break;
  //   case 501: error.message = '服务未实现'; break;
  //   case 502: error.message = '网关错误'; break;
  //   case 503: error.message = '服务不可用'; break;
  //   case 504: error.message = '网关超时'; break;
  //   case 505: error.message = 'HTTP版本不受支持'; break;
  //   default: break;
  // }
  return Promise.reject(error)
}

//请求拦截器
request.interceptors.request.use((config) => {
  console.group(`http请求:${config.url!}`)
  console.log('请求config', config)
  if (config.url && !whiteList.has(config.url)) {
    const token = getToken()
    config.headers!.Authorization = `Bearer ${token}`
    console.log('携带token', token)
  } else {
    console.log('不携带token')
  }
  console.groupEnd()
  return config
}, reqErrorHandler)

//响应拦截器
request.interceptors.response.use((response) => {
  console.group(`http响应:${response.config.url}`)
  console.log('响应体', response)
  console.log('数据', response.data)
  console.groupEnd()
  notification.success({
    message: '响应返回',
    description: JSON.stringify(response.data, null, '\n'),
  })
  return Promise.resolve(response.data)
}, resErrorHandler)

export default request
