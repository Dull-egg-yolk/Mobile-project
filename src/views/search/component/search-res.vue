<template>
  <div>
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item,index) in list"
        :key="index"
        :title="item.title"

        @click="$router.push('/article/' + item.art_id)"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '../../../api/search'
export default {
  // 子组件接收
  props: {
    q: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  methods: {
    async onLoad () {
      // 请求数据
      const { data } = await getSearch({
        page: this.page,
        per_page: this.per_page,
        q: this.q
      })
      console.log(data)

      //  将数据放到list
      const { results } = data.data
      this.list.push(...results)
      // 加载状态结束
      this.loading = false

      //   数据全部加载完成
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
      //  模板绑定 v-for 改变数据
    }
  }
}
</script>

<style>

</style>
