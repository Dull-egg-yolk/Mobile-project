import request from '../utils/request'
// 获取联想建议
export const getSuggestion = q => {
  return request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}

// 获取搜索结果
export const getSearch = params => {
  return request({
    url: '/v1_0/search',
    method: 'GET',
    params
  })
}
