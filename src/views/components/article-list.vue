<template>
  <div>
    <!-- {{item}} -->
    <!--下拉刷新组件 包裹list -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getUserchannels } from '../../api/article'
export default {
  // props:[]
  //   对象形式  比写数组更严谨
  props: {
    item: {
      // 类型是对象
      type: Object,
      //   必填
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      isLoading: false
    }
  },
  created () {
    // this.onRefresh()
  },
  methods: {
    async onLoad () {
      const { data } = await getUserchannels({
        channel_id: this.item.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      console.log(data)
      const { results } = data.data
      // 添加到数组
      this.list.push(...results)

      // 3. 加载状态结束
      this.loading = false

      // 4. 数据全部加载完成
      if (results.length) {
        // 更新获取下一页数据的时间戳
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据了，把 finished 设置为 true，不再加载更多
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      const { data } = await getUserchannels({
        channel_id: this.item.id, // 频道id
        timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1
      })
      // console.log(data)
      // 2. 如果有最新数据，则把数据放到列表的顶部
      const { results } = data.data
      // 放到列表的顶部
      this.list.unshift(...results)

      // // 3. 关闭下拉刷新的 loading 状态
      this.isLoading = false

      // // 提示更新成功
      this.$toast(`更新了${results.length}条数据`)
      console.log('刷新')
    }
  }
}
</script>

<style lang="less" scoed>
.van-tabs__wrap {
  position: fixed;
  top: 42px;
  left: 0;
  right: 0;
  z-index: 1;
}
.van-list {
  padding-top: 90px;
  padding-bottom: 50px;
}

  .wap-nav {
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
  }

</style>
