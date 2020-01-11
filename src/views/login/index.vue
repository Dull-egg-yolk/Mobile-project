<template>
  <ValidationObserver>
    <van-nav-bar title="登录" />
    <!-- 登录表单 -->
    <!-- ValidationProvider 把具体的表单 包起来 例如 input-->
    <!-- ValidationObserver  把需要校验的整个表单包起来 -->
    <!-- name提示名称 rules校验规则 v-slot="{errors}" 校验失败的错误提示信息-->
    <ValidationObserver ref="myform">
      <van-cell-group>
        <ValidationProvider name="手机号" rules="required" immediate>
          <van-field label="手机号" v-model="formData.mobile" placeholder="请输入手机号">
            <i class="iconfont icon-shouji" slot="left-icon"></i>
          </van-field>
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required" immediate>
          <van-field v-model="formData.code" type="password" label="验证码" placeholder="请输入验证码">
            <i class="iconfont icon-yanzhengma" slot="left-icon"></i>
            <van-count-down slot="button" :time="time" format="ss 秒" v-if="isCountDownShow" @finish="isCountDownShow = false"/>
            <van-button slot="button" size="small" type="primary" @click="onSmsCode" v-else>
              <span>发送验证码</span>
            </van-button>
          </van-field>
        </ValidationProvider>
      </van-cell-group>

      <div class="btn">
        <van-button type="info" @click="onLogin">登录</van-button>
      </div>
    </ValidationObserver>
  </ValidationObserver>
</template>

<script>
import { login, sendSmsCode } from '../../api/user'
// 引入validate
import { validate } from 'vee-validate'
export default {
  data () {
    return {
      formData: {
        mobile: '',
        code: ''
      },
      isCountDownShow: false,
      time: 1000 * 6
    }
  },
  methods: {
    // 点击登录 请求数据
    async onLogin () {
      // 表单验证
      // ref 拿到我表单的对象
      // 此时success是布尔值
      const success = await this.$refs.myform.validate()
      console.log(this.$refs.myform)

      console.log(success)

      if (!success) {
        console.log('表单验证失败')
        const errors = this.$refs.myform.errors

        console.log(errors)
        // 遍历 提示是手机号错误还是验证码错误
        for (let key in errors) {
          const item = errors[key]
          if (item[0]) {
            this.$toast(item[0])
            return
          }
        }
        return
      }

      // vant 清提示Toast
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })

      try {
        const res = await login(this.formData)
        console.log(res)
        // 获取共享数据  拿到token
        this.$store.commit('setUser', res.data.data)
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
        // 1. 验证手机号是否有效
        const validateResult = await validate(this.formData.mobile, 'required|mobile', {
          name: '手机号'
        })
        if (!validateResult.valid) {
          this.$toast(validateResult.errors[0])
          return
        }

        this.isCountDownShow = true
        await sendSmsCode(this.formData.mobile)
      } catch (err) {
        this.isCountDownShow = false
        console.log('发送失败', err)
        this.$toast('请勿频繁发送')
        // this.isCountDownShow = false
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
