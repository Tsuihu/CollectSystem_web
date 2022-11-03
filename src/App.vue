<template>
  <div id="app">
    <div class="test"></div>
    <router-view />
  </div>
</template>
<script>
export default {};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
html {
  font-size: 5.3333vw;
}
  /* 100vw = 一个视口的宽度（1vw = 1%视口宽度） */
  /* 设计图宽度750px*/
  /* 100vw = 750 px */
  /* 0.133333333333vw = 1 px */
  /* 例：创建一个 48px * 35px 元素 */
  /* 6.4vm = 48px */
  /* 4.667vm = 35px */
  /* 
    1rem = 1 html字体大小
    font-size = 5.3333vw , 1rem = 40px
  */
// .test {
//   width: (48/40rem);
//   height: (35/40rem);
//   background-color: aqua;
// }
</style>
