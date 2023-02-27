define(function (require) {
  require('less!./components/dialog/style.less');
  require('fh-button');
  var Vue = require('vue');
  const Types = {
    info: 'info',
    confirm: 'confirm'
  };
  const mergeOptions = (opt1, opt2) => ({
    ...opt1,
    ...opt2
  });
  const hasDialog = () => {
    const mask = document.querySelector('.mask-layer');
    if (!mask) {
      return false;
    }
    const cls = Array.from(mask.classList);
    // 如果弹出框整在处于离开动画的状态，也认为没有弹窗
    if (cls.includes('dialog-leave-active')) {
      return false;
    }
    return true;
    // dialog-leave-active
  };
  const DialogCom = Vue.extend({
    template: require('text!./components/dialog/template.html'),
    data() {
      return {
        Types,
        visible: false,
        message: '',
        title: '',
        callback: {},
        okText: 'ok',
        cancelText: 'cancel'
      };
    },
    methods: {
      close() {
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
        this.close();
        this.callback.ok && this.callback.ok();
      },
      cancel() {
        this.visible = false;
        this.close();
        this.callback.cancel && this.callback.cancel();
      }
    },
    destroyed() {
      this.timer = null;
    }
  });
  return {
    info(options) {
      if (!hasDialog()) {
        const opt = mergeOptions(
          {
            title: '',
            message: 'info',
            callback: {},
            okText: 'ok'
          },
          options
        );
        opt.type = 'info';
        this.instance = new DialogCom({ data: opt }).$mount();
        this.instance.visible = true;
        document.body.appendChild(this.instance.$el);
      }
    },
    confirm(options) {
      if (!hasDialog()) {
        const opt = mergeOptions(
          {
            title: '',
            message: 'confirm',
            callback: {},
            okText: 'ok',
            cancelText: 'cancel'
          },
          options
        );
        opt.type = 'confirm';
        this.instance = new DialogCom({ data: opt }).$mount();
        this.instance.visible = true;
        document.body.appendChild(this.instance.$el);
      }
    }
  };
});
