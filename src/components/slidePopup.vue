<template>
  <div class="g-popup" @click="showClose" :style="{clip:value?'auto':'rect(0,0,0,0)'}">
    <div class="content slide-content" @click.stop="" :style="{transform:value?'translateY(0)':'translateY(100%)'}">
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
    background: rgba(0, 0, 0, .7);
    overflow: hidden;
  }

  .slide-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .content {
    transition: transform .5s;
  }
</style>
