<template>
  <div >
    <h1>移动端首页</h1>
  </div>
</template>

<script>
//引用axios封装组件
import api from "@/axios/api.js";
//引用公共代码
import comm from "@/common/comm.js"
//引用vant-UI组件，可按需修改
import {  Button } from "vant"

export default {
  components: {
    [Button.name]: Button,//vant-ui组件注册
  },
  data() {
    //页面数据对象
    return {
    };
  },
  //页面的方法
  methods: {
  },
  //vue生命周期函数，页面加载完成后调用
  mounted(){

  }
};
</script>

<style lang="stylus" scoped>
</style>
