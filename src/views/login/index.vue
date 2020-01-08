<template>
  <div>
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field required clearable label="用户名" v-model="formData.mobile" placeholder="请输入用户名" />

      <van-field v-model="formData.code" type="password" label="密码" placeholder="请输入密码" required>
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn">
      <van-button type="info"  @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
import request from '../../utils/request'
export default {
  data () {
    return {
      formData: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async login () {
      try {
        const res = await request({
          method: 'POST',
          url: '/v1_0/authorizations',
          data: this.formData
        })
        console.log('登录成功', res)
      } catch (err) {
        console.log('登录失败', err)
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
