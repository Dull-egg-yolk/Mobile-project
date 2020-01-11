import request from '../utils/request'

export const getChannle = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET'
  })
}
