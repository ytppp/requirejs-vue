define(function (require) {
  require('fh-button');
  require('fh-wrap');
  var Vue = require('vue');
  let { mergeOptions } = require('tool');
  const DialogType = {
    info: 'info',
    confirm: 'confirm'
  };
  const DefaultOpt = {
    [DialogType.info]: {
      title: '',
      message: 'info',
      callback: {},
      okText: 'ok'
    },
    [DialogType.confirm]: {
      title: '',
      message: 'confirm',
      callback: {},
      okText: 'ok',
      cancelText: 'cancel'
    }
  };
  const hasDialog = () => {
    const mask = document.querySelector('.dialog-layer');
    if (!mask) {
      return false;
    }
    const cls = Array.from(mask.classList);
    // 如果弹出框整在处于离开动画的状态，也认为没有弹窗
    if (cls.includes('wrap-leave-active')) {
      return false;
    }
    return true;
  };
  const DialogCom = Vue.extend({
    template: require('text!./components/dialog/template.html'),
    data() {
      return {
        DialogType,
        type: DialogType.info,
        visible: false,
        message: '',
        title: '',
        callback: {},
        okText: 'ok',
        cancelText: 'cancel'
      };
    },
    methods: {
      afterClose() {
        const { parentNode } = this.$el;
        let transitionendTriggered = false;
        this.$el.addEventListener('transitionend', () => {
          parentNode.removeChild(this.$el);
          transitionendTriggered = true;
        });
        // to fix transitionend not trigger
        this.timer = setTimeout(() => {
          if (!transitionendTriggered) {
            parentNode.removeChild(this.$el);
          }
        }, 500);
      },
      ok() {
        this.visible = false;
        this.afterClose();
        this.callback.ok && this.callback.ok();
      },
      cancel() {
        this.visible = false;
        this.afterClose();
        this.callback.cancel && this.callback.cancel();
      }
    },
    destroyed() {
      this.timer = null;
    }
  });
  const dialog = (options, type = DialogType.info) => {
    const opt = mergeOptions(DefaultOpt[type], options);
    opt.type = type;
    if (!DefaultOpt[type]) {
      console.log('error dialog type');
      return;
    }
    if (!hasDialog()) {
      const instance = new DialogCom({ data: opt }).$mount();
      instance.visible = true;
      document.body.appendChild(instance.$el);
    }
  }

  return {
    info(options) {
      dialog(options);
    },
    confirm(options) {
      dialog(options, DialogType.confirm);
    }
  };
});
