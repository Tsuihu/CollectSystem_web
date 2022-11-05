<template>
  <div class="tabbar">
    <div class="con_left">
      <slot name="left" class="left"></slot>
    </div>
    <div class="con_title">
      <slot name="title" class="center"><h1>title</h1></slot>
    </div>
    <div class="con_right">
      <slot name="right" class="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabbar'
}
</script>

<style lang="less" scoped>
.tabbar {
  width: 100%;
  height: 82/40rem;
  // line-height: 82/40rem;
  background-color: #07C160;
  border-radius: 5/40rem;
  display: flex;
  text-align: center;
  justify-content: center;
  .con_left {
    flex: 1;
  }
  .con_title {
    flex: 1;
  }
  .con_right {
    flex: 1;

  }
  h1 {
    line-height: 82/40rem;
    font-weight: normal;
    font-size: 33/40rem;
    color: white;
  }
}
</style>