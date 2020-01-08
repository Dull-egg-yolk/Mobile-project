<template>
  <div>
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
      />

      <van-field  type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <div class="btn">
       <van-button type="info">信息按钮</van-button>
    </div>

  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
