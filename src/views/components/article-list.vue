<template>
  <div>
    <!-- {{item}} -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
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
      timestamp: null
    }
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
    }
  }
}
</script>

<style>
</style>
