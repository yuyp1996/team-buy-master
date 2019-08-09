<template>
  <div class="g-popup" @click="showClose" :style="{clip:value?'auto':'rect(0,0,0,0)'}">
    <div class="content slide-content" @click.stop="">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['value'],
    methods: {
      showClose () {
        this.$emit('input', false);
      }
    },
    watch: {}
  };
</script>

<style scoped lang="scss">
  .g-popup {
    position: fixed;
    left: 0;
    top: 0;
    @include wh(100vw, 100vh);
    z-index: 9;
    background: rgba(0, 0, 0, .5);
    overflow: hidden;
  }

  .content {
    transition: transform .5s;
  }
</style>
