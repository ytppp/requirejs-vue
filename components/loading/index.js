define(function (require) {
  require('fh-wrap');
  const LoadingCom = require('fh-loading-com');
  let { mergeOptions } = require('tool');
  const defaultOptions = {
    tip: '',
    title: '',
    isAppendBody: true
  };
  return {
    instance: null,
    open(options) {
      const opt = mergeOptions(defaultOptions, options);
      if (!this.instance) {
        this.instance = new LoadingCom({
          data: {
            tip: opt.tip,
            title: opt.title,
            isAppendBody: opt.isAppendBody
          }
        }).$mount();
        this.instance.visible = true;
        document.body.appendChild(this.instance.$el);
      }
    },
    close() {
      if (this.instance) {
        this.instance.visible = false;
        let { instance } = this;
        this.instance = null;
        instance.$el.addEventListener('transitionend', () => {
          if (instance) {
            instance.$el.parentNode.removeChild(instance.$el);
            instance = null;
          }
        });
        // fix ie bug
        const timer = setTimeout(() => {
          if (instance) {
            instance.$el.parentNode.removeChild(instance.$el);
            instance = null;
          }
          clearTimeout(timer);
        }, 500);
      }
    }
  };
});
