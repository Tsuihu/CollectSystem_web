<template>
  <div class="login">
    <div class="container">
      <h1>账号登录</h1>
      <van-form class="form_login" @submit="onSubmit">
        <van-cell-group inset>
          <van-field 
            v-model="loginForm.tel" 
            name="手机号" 
            label="手机号" 
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]" />
          <van-field 
            v-model="loginForm.password" 
            type="password" 
            name="密码" 
            label="密码" 
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <van-button class="btn_login" round block type="primary" native-type="submit">
          登录
        </van-button>
      </van-form>
      <p>还没有账号？点击<router-link class="btn_registe" to="/registe">注册</router-link></p>
    </div>
  </div>
</template>

<script>
import api from "@/axios/api.js";
import comm from "@/common/comm.js"
import { Form, Field, CellGroup, Button } from "vant"

export default {
  name: 'login',
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Form.name]: Form,
  },
  data() {
    return {
      loginForm: {
        tel: "",
        password: ""
      },
    };
  },
  methods: {
    onSubmit() {
      api.post("/collector/login.do",this.loginForm).then(res => {
        if (res.code == comm.RESULT_CODE.SUCCESS) {
          // 把采集员信息保存到vuex中
          // this.$store.dispatch('info',res.data)
          // 把采集员信息保存到session中
          sessionStorage.setItem('collectors',JSON.stringify(res.data))
          this.$router.push("/point");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 30/40rem;
  h1 {
    margin-top: 100/40rem;
    text-align: center;
    font-size: 55/40rem;
  }
  p {
    float: right;
    margin-top: 20/40rem;
    font-size: 30/40rem;
  }
  .btn_registe {
    color: skyblue;
  }
}

.form_login {
  margin-top: 250/40rem;
}
.btn_login {
  margin-top: 200/40rem;
}
</style>
