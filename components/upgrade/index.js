define(function (require) {
  require('fh-wrap');
  var Vue = require('vue');
  let { mergeOptions } = require('tool');
  const defaultOptions = {
    tip: '',
    title: '',
    timeout: 300,
    progressVisible: false
  };
  const UpgradeCom = Vue.extend({
    template: require('text!./components/upgrade/template.html'),
    data() {
      return {
        url: '',
        visible: false,
        title: '',
        tip: '',
        styles: { width: 0 },
        percent: 0,
        timeout: 0,
        countdown: 0,
        timer: null,
        progressVisible: false
      };
    },
    computed: {
      percentText() {
        return `${parseInt(this.percent)}%`;
      }
    },
    methods: {
      createTimer() {
        this.countdown = this.timeout;
        const average = 100 / this.timeout;
        this.timer = setInterval(() => {
          if (!this.countdown) {
            this.cleanup();
            return;
          }
          this.countdown -= 1;
          this.percent += average;
          this.styles.width = this.percentText;
        }, 1000);
      },
      cleanup() {
        clearTimeout(this.timer);
      }
    },
    mounted() {
      this.createTimer();
    }
  });
  const Upgrade = {
    instance: null,
    open(options) {
      const opt = mergeOptions(defaultOptions, options);
      if (!this.instance) {
        this.instance = new UpgradeCom({
          data: {
            tip: opt.tip,
            title: opt.title,
            timeout: opt.timeout,
            progressVisible: opt.progressVisible
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
  }
  return Upgrade;
});
