<template>
  <div>
    <!-- 导航 -->
    <van-nav-bar title="首页" fixed />
    <van-tabs v-model="active">
      <!-- 面包插槽 -->
      <van-icon class="wap-nav" slot="nav-right" name="wap-nav" @click="isChannelEditShow= true" />
      <!-- 遍历 频道列表数组 -->
      <van-tab :title="item.name" v-for="item in userChannles" :key="item.id">
        <!-- 文章列表 -->
        <!-- 把遍历的传给channel -->
        <article-list :item="item"></article-list>
      </van-tab>
    </van-tabs>
    <!-- 弹层 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <!-- 父给子传值 -->
      <!-- 给子组件传值 子组件的标签写属性 -->
      <!-- 子给父传值  监听事件 -->
      <channelEdit :user-channels="userChannles" @close="onChang"></channelEdit>
    </van-popup>
  </div>
</template>

<script>
// 引入
import { getChannle } from '../../api/channle'
// 引入 article-list封装的组件
import articleList from '../components/article-list'
// 引入弹层
import channelEdit from '../components/channels-edit'
// 引入获取本地存储
import { getItem } from '../../utils/storage'
export default {
  data () {
    return {
      // 控制哪个标签被激活
      active: 0,
      // 频道列表
      userChannles: [],
      // 弹层
      isChannelEditShow: true
    }
  },
  components: {
    // 注册组件
    articleList,
    channelEdit
  },
  created () {
    // 调用方法
    this.loadChannle()
  },
  methods: {
    // 获取频道数据
    async loadChannle () {
      // 如果有本地数据 优先使用本地的数据  如果没有使用获取的数据
      // 声明变量 用来存储频道数据
      let Channels = []
      // 获取本地存储的频道列表
      const loadChannle = getItem('user-channels')
      // 如果有本地存储优先使用
      if (loadChannle) {
        Channels = loadChannle
        // 如果没有获取接口新的
      } else {
        const { data } = await getChannle()
        Channels = data.data.channels
      }
      this.userChannles = Channels
      // try {
      //   // console.log(data)
      // } catch (err) {
      //   // console.log(err)
      // }
    },
    // 非编辑时
    onChang (index) {
      // 关闭弹层
      this.isChannelEditShow = false
      // 标签激活哪个按下标来
      this.active = index
    }
  }
}
</script>

<style lang="less" scoed>
</style>
