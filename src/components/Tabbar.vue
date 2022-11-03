<template>
  <div class="tabbar">
    <slot class="title">title</slot>
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
  background-color: #07C160;
  border-radius: 5/40rem;
}
</style>