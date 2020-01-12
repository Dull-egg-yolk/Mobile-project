<template>
<div class="channel-eidt">
     <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger" plain @click="isEidtShow = !isEidtShow">{{isEidtShow? '完成':"编辑"}}</van-button>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item

        v-for="(item,index) in userChannels"
        :key="item.id"
        :text="item.name"
        @click="delOrSkip(index)"
      >
      <van-icon name="close" slot="icon" class="icon" v-show="isEidtShow && index!==0"/>
      </van-grid-item>
    </van-grid>

    <van-cell title="推荐频道" :border="false" />
    <van-grid :gutter="10">
      <van-grid-item
        v-for="items in siftChannel"
        :key="items.id"
        :text="items.name"
        @click="add(items)"
      />
    </van-grid>
</div>
</template>

<script>
// 引入全部频道
import { getAllChannle } from '../../api/channle'
// 引入本地存储
import { setItem } from '../../utils/storage'
export default {
  // 父传子 接收属性
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      // 所有频道
      allchannels: [],
      //   图标默认隐藏
      isEidtShow: false

    }
  },
  created () {
    this.loadAllChannel()
  },
  //   计算属性
  computed: {
  //     //   剩余的频道
    siftChannel () {
      // 定义一个空数组
      const channels = []
      //   解构赋值两个 数组
      const { userChannels, allchannels } = this

      //   遍历所有频道数组
      allchannels.forEach(item => {
        //   遍历我得频道数组  find 找到相同的id返回  剩下的push到channels  就是剩下的频道
        if (!userChannels.find(user => user.id === item.id)) {
          channels.push(item)
        //   console.log(channels)
        }
      })
      return channels
    }
  },
  //   监听数据变化
  watch: {
    //   当userChannels 数据变化时
    userChannels (newVal) {
      setItem('user-channels', newVal)
    }
  },
  methods: {
    async loadAllChannel () {
      const { data } = await getAllChannle()
      this.allchannels = data.data.channels
    },
    // 点击频道添加到我得频道
    add (items) {
      this.userChannels.push(items)
    },
    // 编辑状态 和完成状态
    delOrSkip (index) {
      // 删除  根据下标   推荐不能删
      if (this.isEidtShow && index !== 0) {
        //   从下标几开始 删除一个
        this.userChannels.splice(index, 1)
      } else {
        //   子给父传值
        this.$emit('close', index)
      }
    }
  }

}
</script>

<style lang="less" scoed>
.channel-eidt{
    padding: 40px 20px
}
.van-grid-item__icon-wrapper{
    position: absolute;
    top:-3px;
    right: -3px;
    font-size: 15px
}
.van-grid-item{
    position: relative;
}
</style>
