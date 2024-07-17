define(function (require) {
  var Vue = require('vue');
  const ToastCom = Vue.extend({
    template: require('text!./components/toast/template.html'),
    data() {
      return {
        visible: false,
        duration: 3000,
        text: '',
        type: 'success',
        timer: null
      };
    },
    methods: {
      startTimer() {
        this.timer = setTimeout(() => {
          this.visible = false;
          this.$el.addEventListener('transitionend', this.close);
        }, this.duration);
      },
      close() {
        this.timer = null;
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    mounted() {
      this.startTimer();
    }
  });
  const toast = (
    text = '',
    duration = 3000,
    type = 'error',
    parentEl = '.layout'
  ) => {
    const instance = new ToastCom({
      data: {
        text,
        duration,
        type
      }
    }).$mount();
    instance.visible = true;

    const pEl = document.querySelector(parentEl);
    pEl.appendChild(instance.$el);
    const rect = pEl.getBoundingClientRect();
    const left = rect.left + rect.width / 2;
    instance.$el.style.left = `${left}px`;
  };
  return toast;
});
