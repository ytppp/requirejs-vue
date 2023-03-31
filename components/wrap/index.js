define(function (require) {
  require('less!./components/wrap/style.less');
  var Vue = require('vue');
  Vue.component('FhWrap', {
    template: require('text!./components/wrap/template.html'),
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      closeOnClickWrap: {
        type: Boolean,
        default: false
      },
      wrapBgColor: {
        type: String,
        default: 'rgba(0, 0, 0, 0.3)'
      },
      isAppendBody: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        open: false
      };
    },
    computed: {
      wrapStyleObj() {
        return {
          backgroundColor: this.wrapBgColor
        }
      },
      parentNode() {
        if (this.isAppendBody) {
          return document.body;
        } else {
          return this.$el.parentNode;
        }
      }
    },
    watch: {
      visible(val) {
        this.open = val;
        if (this.open) {
          this.$el.style.position = this.isAppendBody ? 'fixed' : 'absolute';
          this.overflow = this.parentNode.style.overflow;
          this.parentNode.style.overflow = 'hidden';
        } else {
          this.parentNode.style.overflow = this.overflow;
        }
      }
    },
    methods: {
      close() {
        if (!this.closeOnClickWrap) {
          return;
        }
        this.$parent.$emit('visible', this.open);
      }
    },
  });
});
