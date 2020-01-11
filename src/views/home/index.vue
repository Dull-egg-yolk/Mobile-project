<template>
  <div>
    <!-- 导航 -->
    <van-nav-bar title="首页" />
    <van-tabs v-model="active">
      <!-- 遍历 频道列表数组 -->
  <van-tab :title="item.name" v-for="item in userChannles" :key="item.id">
    <!-- 文章列表 -->
    <!-- 把遍历的传给channel -->
    <article-list :item="item"></article-list>
  </van-tab>

</van-tabs>
  </div>

</template>

<script>
// 引入
import { getChannle } from '../../api/channle'
// 引入 article-list封装的组件
import articleList from '../components/article-list'
export default {
  data () {
    return {
      active: 2,
      userChannles: []
    }
  },
  components: {
    // 注册组件
    articleList
  },
  created () {
    // 调用方法
    this.loadChannle()
  },
  methods: {
    async loadChannle () {
      try {
        const { data } = await getChannle()
        this.userChannles = data.data.channels
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }

  }
}
</script>

<style>

</style>
