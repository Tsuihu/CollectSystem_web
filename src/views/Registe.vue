<template>
  <div class="registe">
    <div class="container">
      <h1>账号注册</h1>
      <van-form class="form_registe" @submit="onSubmit">
        <van-cell-group inset>
          <van-field 
            v-model="RegisteForm.tel" 
            name="手机号" 
            label="手机号" 
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]" />
          <van-field 
            v-model="RegisteForm.password" 
            type="password" 
            name="密码" 
            label="密码" 
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]" />
          <van-field 
            v-model="RegisteForm.name" 
            name="用户名" 
            label="用户名" 
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]" />
          <van-field 
            v-model="RegisteForm.idcard" 
            name="身份证" 
            label="身份证" 
            placeholder="身份证"
            :rules="[{ required: true, message: '请填写身份证号码' }]" />
        </van-cell-group>
        <van-button class="btn_registe" round block type="primary" native-type="submit">
          注册
        </van-button>
      </van-form>
      <p>已有账号，去<router-link class="btn_login" to="/login">登录</router-link></p>
    </div>
    
  </div>
</template>

<script>
import { Form, Field, CellGroup, Button, Toast } from "vant"
import api from "@/axios/api.js";
import comm from "@/common/comm.js"
export default {
  name: 'registe',
  data() {
    return {
      RegisteForm: {
        tel: '',
        password: '',
        name: '',
        idcard: '',
        organizationId: '',
      }
    }
  },
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Form.name]: Form,
  },
  methods: {
    onSubmit() {
      api.post('/collector/registe.do',this.RegisteForm).then(res => {
        if (res.code == comm.RESULT_CODE.SUCCESS) {
          console.log(res)
          Toast('注册成功')
          this.$router.push("/login")
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.registe {
  padding: 30/40rem;
  h1{
    margin-top: 100/40rem;
    text-align: center;
    font-size: 55/40rem;
  }
  p {
    float: right;
    margin-top: 20/40rem;
    font-size: 30/40rem;
  }
  .btn_login {
    color: skyblue;
  }
  .btn_registe {
    margin-top: 100/40rem;
  }
}

.form_registe{
  margin-top: 100/40rem;
}
.btn_login {
  margin-top: 100/40rem;
}
</style>