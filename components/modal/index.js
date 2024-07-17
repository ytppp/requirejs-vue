define(function (require) {
  require('fh-wrap');
  require('fh-icon');
  var Vue = require('vue');
  Vue.component('FhModal', {
    template: require('text!./components/modal/template.html'),
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      title: String,
      width: {
        type: String,
        default: '50%'
      },
      fullscreen: {
        type: Boolean,
        default: false
      },
      showClose: {
        type: Boolean,
        default: true
      },
      beforeClose: {
        type: Function,
        default: () => ({})
      }
    },
    data () {
      return {
        open: false
      }
    },
    watch: {
      visible(val) {
        this.open = val;
      }
    },
    methods: {
      close() {
        this.beforeClose && this.beforeClose();
        this.open = false;
        this.$emit('update:visible', false);
      }
    },
    mounted () {
      this.$on('visible', () => {
        this.close();
      });
    }
  });
});
