<template>
  <div>
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field label="手机号" v-model="formData.mobile" placeholder="请输入手机号">
        <i class="iconfont icon-shouji" slot="left-icon"></i>
      </van-field>
      <van-field v-model="formData.code" type="password" label="验证码" placeholder="请输入验证码">
        <i class="iconfont icon-yanzhengma" slot="left-icon"></i>
        <van-count-down slot="button" :time="time" format="ss 秒" v-if="isCountDownShow"/>
        <van-button slot="button" size="small" type="primary" @click="onSmsCode" v-else>
          <span>发送验证码</span>
        </van-button>

      </van-field>
    </van-cell-group>

    <div class="btn">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, sendSmsCode } from '../../api/user'
export default {
  data () {
    return {
      formData: {
        mobile: '',
        code: ''
      },
      isCountDownShow: false,
      time: 1000 * 60
    }
  },
  methods: {
    async onLogin () {
      // vant 清提示Toast
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.formData)
        console.log('登录成功', res)
        // 固定语法  跟this.$message 一样
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败')
      }
    },
    // 发送验证码
    async onSmsCode () {
      // const { mobile } = this.formData
      try {
        this.isCountDownShow = true
        await sendSmsCode(this.formData.mobile)
      } catch (err) {
        console.log('发送失败', err)
        this.isCountDownShow = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  padding: 20px;
  .van-button {
    width: 100%;
  }
}
</style>
