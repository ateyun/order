<template>
  <div class="vux-actionsheet">
    <transition name="vux-actionsheet-mask">
      <div class="weui-mask weui-mask_transparent"
           @click="onClickingMask"
           v-show="show"></div>
    </transition>
    <div class="weui-actionsheet"
         :class="{'weui-actionsheet_toggle': show}">
      <div class="weui-actionsheet__menu">
        <!--<div class="" v-html="componentHtml"></div>-->
        <div class="">
          <div class="weui-actionsheet__cell vux-actionsheet-menu-default"
              v-for="text in menus"
              @click="onMenuClick(text,$event)"
              :class="text.state ? 'bgColor': ''">
            <p><span class="sheetleft">礼品卡号：{{text.code}}</span> <span class="sheetright">金额：{{text.amount}}</span></p>
          </div>
          <div class="weui-cell weui-cell_vcode" style="padding-left:10px;">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" :value="message" @change="updateMessage" placeholder="请输入礼品卡号">
                </div>
                <div class="weui-cell__ft">
                    <button class="weui-vcode-btn" @click="verification('on-click-card')">绑定</button>
                </div>
            </div>
        </div>
      </div>
      <div class="weui-actionsheet__action"
           v-if="showCancel">
        <div class="weui-actionsheet__cell"  @click="emitEvent('on-click-menu', 'ok')">确定</div>
        <div class="weui-actionsheet__cell"  @click="emitEvent('on-click-menu', 'cancel')">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.$tabbar = document.querySelector('.weui-tabbar')
    })
  },
  props: {
    value: Boolean,
    showCancel: Boolean,
    cancelText: String,
    menus: Array,
    closeOnClickingMask: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    message(state){
      return this.$store.state.cardInput
    }
  },
  methods: {
    updateMessage(e){
      this.$store.commit('saveCardCode', e.target.value)
    },
    onMenuClick(text,e) {
        if(e.currentTarget.classList.contains('bgColor')){
          e.currentTarget.className = 'weui-actionsheet__cell vux-actionsheet-menu-default'
        }else{
          e.currentTarget.className = 'weui-actionsheet__cell vux-actionsheet-menu-default bgColor'
        }
        text.state = !text.state
        this.emitEvent('on-click-menu', text, false)
    },
    onClickingMask() {
      this.closeOnClickingMask && (this.show = false)
    },
    emitEvent(event, menu, shouldClose = true) {
      if (event === 'on-click-menu') {
        this.$emit(event, menu)
        this.$emit(`${event}-${menu}`)
        shouldClose && (this.show = false)
      }
    },
    fixIos(zIndex) {
      if (this.$el.parentNode && this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1) {
        return
      }
      if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {
        this.$tabbar.style.zIndex = zIndex
      }
    },
    verification(event) {
      if(event == ''){
        this.$store.commit('editMsg',{msgError: '请输入卡号', showPositionValue: true})
        setTimeout(()=>{
            this.$store.commit('editMsg',{msgError: '', showPositionValue: false})
        },1000)
      }
      this.$emit(event, this.message)
    }
  },
  watch: {
    show(val) {
      this.$emit('input', val)
      if (val) {
        this.fixIos(-1)
      } else {
        setTimeout(() => {
          this.fixIos(100)
        }, 200)
      }
    },
    value: {
      handler: function (val) {
        this.show = val
      },
      immediate: true
    }
  },
  beforeDestroy() {
    this.fixIos(100)
  }
}
</script>

<style lang="less">
@import '../../assets/styles/weui/widget/weui_tips/weui_mask';
@import '../../assets/styles/weui/widget/weui_tips/weui_actionsheet';

.vux-actionsheet-menu-primary {
  color: @actionsheet-label-primary-color;
}

.vux-actionsheet-menu-warn {
  color: @actionsheet-label-warn-color;
}

.vux-actionsheet-menu-default {
  color: @actionsheet-label-default-color;
}

.vux-actionsheet-menu-disabled {
  color: @actionsheet-label-disabled-color;
}

.vux-actionsheet-mask-enter,
.vux-actionsheet-mask-leave-active {
  opacity: 0;
}

.vux-actionsheet-mask-leave-active,
.vux-actionsheet-mask-enter-active {
  transition: opacity 300ms;
}

.weui-actionsheet__cell:after {
  content: '';
  display: block;
  clear: both;
}

.weui-actionsheet__cell p:after {
  content: '';
  display: block;
  clear: both;
}

.sheetleft {
  float: left;
  display: block;
  padding-left: 10px;
}

.sheetright {
  float: right;
  display: block;
  padding-right: 10px;
}
.bgColor{
  background: #ccc;
}
.weui-cell_vcode {
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;
}
.weui-cell {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.weui-cells {
    margin-top: 1.17647059em;
    background-color: #FFFFFF;
    line-height: 1.41176471;
    font-size: 18px;
    overflow: hidden;
    position: relative;
}
.weui-cell:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.weui-cell__bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
}
.weui-label {
    display: block;
    width: 105px;
    word-wrap: break-word;
    word-break: break-all;
}
.weui-input {
    width: 100%;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
    background-color: transparent;
    font-size: 18px;
    color: inherit;
    height: 1.41176471em;
    line-height: 1.41176471;
}
.weui-cell__ft {
    text-align: right;
    color: #999999;
}
button.weui-vcode-btn {
    background-color: transparent;
    border-top: 0;
    border-right: 0;
    border-bottom: 0;
    outline: 0;
}
.weui-vcode-btn {
    display: inline-block;
    height: 44px;
    margin-left: 5px;
    padding: 0 0.6em 0 0.7em;
    border-left: 1px solid #E5E5E5;
    line-height: 44px;
    vertical-align: middle;
    font-size: 17px;
    color: #3CC51F;
}
</style>
