define(function (require) {
  require('less!./components/switch/style.less');
  var Vue = require('vue');
  Vue.component('fh-switch', {
    template: require('text!./components/switch/template.html'),
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      label: { type: String },
      value: {
        type: [Boolean, String, Number],
        default: false
      },
      activeValue: {
        type: [Boolean, String, Number],
        default: true
      },
      inactiveValue: {
        type: [Boolean, String, Number],
        default: false
      }
    },
    computed: {
      checked() {
        return this.value === this.activeValue;
      }
    },
    methods: {
      handleChange() {
        const val = this.checked ? this.inactiveValue : this.activeValue;
        this.$emit('input', val);
        this.$emit('change', val);
      },
      switchValue() {
        !this.disabled && this.handleChange();
      }
    }
  });
});
