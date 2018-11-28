import axios from 'axios'
// axios.defauls.baseURL = '/bigdata'
axios.defaults.withCredentials = true
axios.defaults.timeout = 100000
// // axios拦截器
// axios.interceptors.request.use(config => {
//   config.setHeaders([
//     // ...
//     // 在这里设置请求头与携带token信息
//   ])
//   return config
// })

// 11  发送请求
axios.interceptors.request.use((config) => {
  // console.log(`请求地址: ${config.url}`)
  return config
}, (error) => {
  console.log('请求失败')
  return Promise.reject(error)
})
// 11 响应请求
axios.interceptors.response.use((config) => {
  return config
}, (error) => {
  // if (error.response) {
  //   switch (error.response.status === 400 && error.response.data.id) {
  //     case 'static_ip_already_exist_error':
  //       error.response.data.message = '创建失败，静态 IP 已存在!'
  //       break
  //     case 'static_ip_not_exist_error':
  //       error.response.data.message = '不存在的信息，请重试!'
  //       break
  //     case 'not_authorized_error':
  //       error.response.data.message = '需要管理员权限!'
  //       break
  //     case 'static_ip_format_error':
  //       error.response.data.message = 'IP 格式不正确!'
  //       break
  //     case 'static_ip_range_too_big':
  //       error.response.data.message = 'IP 范围过大!'
  //       break
  //     case 'sip_ip_range_err':
  //       error.response.data.message = 'IP范围错误!'
  //       break
  //     case 'static_ip_not_belong_to_tenant':
  //       error.response.data.message = '静态 IP 不属于该租户!'
  //       break
  //     case 'sip_ip_gateway_format_error':
  //       error.response.data.message = 'sorry，该网关不在子网段内!'
  //       break
  //     default:
  //       error.response.data.message = '其它错误'
  //   }
  // } else {
  //   error.response.data.message = '连接服务器失败！'
  // }
  return Promise.reject(error)
})

export default axios
