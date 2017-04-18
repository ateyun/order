<template>
  <div class="weui-loading_toast" v-show="show">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast" :style="{ position: position }">
      <i class="weui-loading weui-icon_toast"></i>
      <p class="weui-toast__content">加载中<slot></slot></p>
    </div>
  </div>
</template>



<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    text: String,
    position: String
  },
  created () {
    this.show = this.value
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less">
@import './../assets/styles/weui/widget/weui_tips/weui_mask';
@import './../assets/styles/weui/widget/weui_tips/weui_toast';
@import './../assets/styles/weui/widget/weui-loading/weui-loading.less';

@baseFontSize:100;
.weui-icon_toast.weui-loading {
  margin: 30rem / @baseFontSize 0 0;
  width: 80rem / @baseFontSize !important;
  height: 80rem / @baseFontSize !important;
  vertical-align: baseline;
  display: inline-block;
}
</style>
