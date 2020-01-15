<template>
  <div class="article-container">
       <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      fixed
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 -->
    <van-loading
      v-if="loading"
      class="loading"
      color="#1989fa"
      vertical
    >
      <slot>加载中...</slot>
    </van-loading>
    <!-- /加载中 -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{article.title}}</h3>
      <div class="author-wrap">
        <div class="base-info">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div class="text">
            <p class="name">{{article.aut_name}}</p>
            <p class="time">{{article.pubdate}}</p>
          </div>
        </div>
        <van-button class="follow-btn"

        v-if="!$store.state.user || article.aut_id !== $store.state.user.id"
        :type="this.article.is_followed ? 'default': 'info'"
        size="small"
        round
        @click="onAttention"
        >{{this.article.is_followed ? '已关注' : '关注'}}</van-button>
      </div>
      <div class="markdown-body" v-html="article.content">
      </div>
    </div>
    <!-- /文章详情 -->

     <!-- 加载失败提示 -->
    <div class="error" v-else>
      <img src="./no-network.png" alt="no-network">
      <p class="text">亲，网络不给力哦~</p>
      <van-button
        class="btn"
        type="default"
        size="small"
        @click="loadArticle()"
      >点击重试</van-button>
    </div>
    <!-- /加载失败提示 -->

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        class="comment-icon"
        name="comment-o"
        info="9"
      />
      <van-icon
        color="orange"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        color="#e5645f"
        :name="article.attitude===1? 'good-job' : 'good-job-o'"
        @click="onLikings"
      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->

  </div>
</template>

<script>
import { getArticleById, addCollect, deleteCollect, articleLikings, delArticleLikings } from '../../api/article'

import { userFollwings, delUserFollwings } from '../../api/user'
export default {
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: true // 文章加载中的 loading 状态
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        // JSON.parse('oo')
        console.log(data)
        this.article = data.data
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    //   收藏
    async onCollect () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
      // 如果已收藏
        if (this.article.is_collected) {
          await deleteCollect(this.articleId)
          this.article.is_collected = false
          this.$toast.success('取消收藏')
        //   未收藏
        } else {
          await addCollect(this.articleId)
          this.article.is_collected = true
          this.$toast.success('收藏成功')
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },
    // 文章点赞
    async onLikings () {
      try {
        // 如果文章点赞状态 则取消点赞
        if (this.article.attitude === 1) {
          await delArticleLikings(this.articleId)
          this.article.attitude = 0
          this.$toast.success('取消点赞')
        } else {
        //   文章处于未点赞状态
          await articleLikings(this.articleId)
          this.article.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },
    // 关注作者
    async onAttention () {
      try {
        //   作者id
        const userId = this.article.aut_id
        //   如果已经关注作者
        if (this.article.is_followed) {
          await delUserFollwings(userId)
        } else {
          await userFollwings(userId)
        }
        this.article.is_followed = !this.article.is_followed
      } catch (err) {

      }
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  padding: 46px 20px 100px;
  background: #fff;
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3A3A3A;
    }
    .author-wrap {
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 35px;
          height: 35px;
          margin-right: 5px;
        }
        .text {
          .name {
            margin: 0;
            font-size: 12px;
          }
          .time {
            margin: 0;
            font-size: 10px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
</style>
