import axios from 'axios'
// 引入处理后端返回数据超出安全整数范围的文件 json-bigint
import jsonBig from 'json-bigint'

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

// 导出
export default request
