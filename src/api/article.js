import request from '../utils/request'
// 接口给的 id 和params参数
// 获取用户文章
export const getUserart = (userId, params) => {
  return request({
    url: `/v1_0/users/${userId}/articles`,
    params

  })
}

// 获取频道文章列表
export const getUserchannels = params => {
  return request({
    url: '/v1_1/articles',
    params

  })
}
