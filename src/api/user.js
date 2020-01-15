// 引入封装的axios
import request from '../utils/request'
// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 发送短信验证码
export const sendSmsCode = mobile => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
    // method: 'GET'
  })
}
// 获取当前登录用户信息
export const getUserinfo = () => {
  return request({
    url: '/v1_0/user',
    method: 'GET'
  })
}
// 获取指定用户信息

export const getUserbyId = (userId) => {
  return request({
    url: `/v1_0/users/${userId}`,
    method: 'GET'
  })
}

// 关注作者

export const userFollwings = userId => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

// 取消关注作者
export const delUserFollwings = userId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${userId}`
  })
}
