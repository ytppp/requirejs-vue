define(function (require) {
  require('less!./components/alert/style.less');
  var Vue = require('vue');
  const TYPE_CLASSES_MAP = {
    success: 'icon-success',
    warning: 'icon-warning',
    error: 'icon-error'
  };
  Vue.component('FhAlert', {
    template: require('text!./components/alert/template.html'),
    props: {
      title: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'info'
      },
      closable: {
        type: Boolean,
        default: true
      },
      closeText: {
        type: String,
        default: ''
      },
      showIcon: Boolean,
      center: Boolean,
      effect: {
        type: String,
        default: 'light',
        validator: function (value) {
          return ['light', 'dark'].indexOf(value) !== -1;
        }
      }
    },
    data() {
      return {
        visible: true
      };
    },
    methods: {
      close() {
        this.visible = false;
        this.$emit('close');
      }
    },

    computed: {
      typeClass() {
        return `alert--${this.type}`;
      },
      iconClass() {
        return TYPE_CLASSES_MAP[this.type] || 'icon-info';
      },
      isBigIcon() {
        return this.description || this.$slots.default ? 'is-big' : '';
      },
      isBoldTitle() {
        return this.description || this.$slots.default ? 'is-bold' : '';
      }
    }
  });
});
