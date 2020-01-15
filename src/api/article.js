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

// 获取指定文章详情
export const getArticleById = articleId => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
    // props: true article_id
  })
}
// 收藏文章
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}
// 取消收藏
export const deleteCollect = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`
  })
}
// 对文章点赞
export const articleLikings = articleId => {
  return request({
    method: 'POST',
    url: `/v1_0/article/likings`,
    data: {
      target: articleId
    }
  })
}
// 取消点赞

export const delArticleLikings = articleId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${articleId}`
  })
}
