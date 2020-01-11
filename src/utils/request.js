import axios from 'axios'
// 引入处理后端返回数据超出安全整数范围的文件 json-bigint
import jsonBig from 'json-bigint'
// 引入token文件
import store from '../store'
// 封装axios
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/'
})
// 处理js中超出安全整数范围的数字
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    console.log('转化失败', err)

    return {}
  }
}]

// 请求拦截器
request.interceptors.request.use(function (config) {
  // config 请求配置对象，我们可以通过修改 config 来实现统一请求数据处理
  const { user } = store.state

  // 统一添加 token
  if (user) {
    // config.headers 获取操作请求头对象
    // Authorization 是后端要求的字段名称
    // 数据值后端要求提供：Bearer token数据
    //    注意：Bearer 后面有个空格
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 导出
export default request
