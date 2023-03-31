define(function (require) {
  require('less!./components/modal/style.less');
  require('fh-wrap');
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
