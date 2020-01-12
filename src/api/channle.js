import request from '../utils/request'
// 获取我得频道
export const getChannle = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET'
  })
}

// 获取全部频道

export const getAllChannle = () => {
  return request({
    url: '/v1_0/channels',
    method: 'GET'
  })
}
