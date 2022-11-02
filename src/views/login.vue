<template>
  <div class="login">
    <h1>移动端登录页面</h1>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="loginForm.tel" name="手机号" label="手机号" placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]" />
        <van-field v-model="loginForm.password" type="password" name="密码" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
        <van-button round block type="primary" native-type="openDialog">
          对话框
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import api from "@/axios/api.js";
import comm from "@/common/comm.js"
import { Form, Field, CellGroup, Button } from "vant"

export default {
  // components:{
  //   Button
  // },
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Form.name]: Form,
  },
  data() {
    return {
      loginForm: {
        tel: "18436097526",
        password: "000000"
      },
      loginRules: {
        tel: [
          { required: true, message: "请输入登录名", trigger: ['blur', 'change'] },
          { min: 4, max: 20, message: "长度在 4 到 20 个字符", trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: ['blur', 'change'] },
          { min: 3, max: 20, message: "长度在3 到 20 个字符", trigger: ['blur', 'change'] }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      api.post("/login.do", this.loginForm).then(res => {
        if (res.code == comm.RESULT_CODE.SUCCESS) {
          console.log(res);
          // window.sessionStorage.userInfo = JSON.stringify(res.data);
          //     为了静态情况下能够进入到桌面,而写的代码，前端和后端登录功能实现后下面的代码应删除
          // window.sessionStorage.userInfo = JSON.stringify({ userId: 1, loginId: 'test', userName: 'test' });
          this.$router.push("/index");
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
body{

}
.login {
  padding:0.5em;
}
.login h1{
  text-align: center;
}
.button{
  text-align: center
}
</style>
