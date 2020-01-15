<template>
  <div>
    <div class="search-container">
      <!-- 搜索栏 -->
      <!-- onsearch 传个参 -->
      <form action="/" class="search-form">
        <van-search
          v-model="searchContent"
          placeholder="请输入搜索关键词"
          show-action
          background="#3296fa"
          @search="onSearch(searchContent)"
          @cancel="onCancel"
          @focus="isSearchShow = false"
          @input="onSearchInput"
        />
      </form>
      <!-- /搜索栏 -->

      <!-- 搜索结果 -->
      <!-- 父传子 -->
      <search-res :q="searchContent" v-if="isSearchShow"></search-res>
      <!-- /搜索结果 -->

      <!-- 联想建议 -->
      <!-- 点击事件接收参数 -->
      <van-cell-group v-else-if="searchContent">
        <van-cell
          v-for="(item,index) in suggestions"
          :key="index"
          icon="search"
          @click="onSearch(item)"
        >
          <div slot="title" v-html="hightLight(item)"></div>
        </van-cell>
      </van-cell-group>
      <!-- /联想建议 -->

      <!-- 历史记录 -->
      <!-- 点击全部删除 清空数组 -->
      <van-cell-group v-else>
        <van-cell title="历史记录">
          <template v-if="isDel">
            <span @click="searchhistorys=[]">全部删除</span>
            &nbsp;&nbsp;
            <span @click="isDel = false">完成</span>
          </template>
          <van-icon name="delete" v-if="!isDel" @click="isDel = true" ></van-icon>
        </van-cell>

        <van-cell
          :title="items"
          v-for="(items,index) in searchhistorys"
          :key="index"

        >
        <!-- 点击删除 -->
          <van-icon name="close" v-show="isDel" @click="searchDel(items,index)"></van-icon>
        </van-cell>
      </van-cell-group>
      <!-- /历史记录 -->
    </div>
  </div>
</template>

<script>
// 引入防抖
import { debounce } from 'lodash'
// 引入单独创建的组件
import searchRes from './component/search-res'
// 引入搜索
import { getSuggestion } from '../../api/search'
// 引入数据持久化
import { getItem, setItem } from '../../utils/storage'
export default {
  components: {
    //   注册组件
    searchRes
  },
  data () {
    return {
      searchContent: '', // 搜索内容
      // 是否展示搜索结果
      isSearchShow: false,
      // 定义一个接收联想建议的空数组
      suggestions: [],
      // 定义一个搜索历史数组
      // 如果有获取 没有就是空数组
      searchhistorys: getItem('search-history') || [],
      // 删除状态
      isDel: false
    }
  },
  methods: {
    onSearch (qe) {
      // 更新文本框的数据
      this.searchContent = qe
      console.log('onSearch')
      // 记录搜索历史
      const searchhistorys = this.searchhistorys
      // indexof找到返回下标  没有就返回-1
      const index = searchhistorys.indexOf(qe)
      if (index !== -1) {
        searchhistorys.splice(index)
      }
      // 最新的搜索放到最前面
      searchhistorys.unshift(qe)
      // 展示搜索结果
      this.isSearchShow = true
    },
    onCancel () {
      console.log('onCancel')
    },
    // 获取搜索结果
    // 防抖处理
    onSearchInput: debounce(async function () {
      const searchContent = this.searchContent
      // 判断
      if (!searchContent) {
        return
      }
      // 1、请求数据
      const { data } = await getSuggestion(searchContent)
      console.log(data)
      // 2、把数据添加到数组里
      this.suggestions = data.data.options
    }, 300),
    // async onSearchInput () {
    //   const searchContent = this.searchContent
    //   // 判断
    //   if (!searchContent) {
    //     return
    //   }
    //   // 1、请求数据
    //   const { data } = await getSuggestion(searchContent)
    //   console.log(data)
    //   // 2、把数据添加到数组里
    //   this.suggestions = data.data.options
    // },
    hightLight (str) {
      // replace 替换 （ 输入的内容 ，span的内容
      // 高亮
      return str.replace(
        this.searchContent,
        `<span style="color:red">${this.searchContent}</span>`
      )
    },
    // 点击删除
    searchDel (items, index) {
      // 如果是删除状态
      if (this.isDel === true) {
        // 从下标几开始 删除几个
        this.searchhistorys.splice(index, 1)
      } else {
        this.onSearch(items)
      }
    }
  },
  // 监视搜索历史
  watch: {
    searchhistorys (val) {
      setItem('search-history', val)
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 54px;
  // 让搜索栏固定在顶部
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
