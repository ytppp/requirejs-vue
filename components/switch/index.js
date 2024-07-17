define(function (require) {
  var Vue = require('vue');
  Vue.component('FhSwitch', {
    template: require('text!./components/switch/template.html'),
    inject: {
      form: {
        default: ''
      },
      formItem: {
        default: ''
      }
    },
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
      },
      name: String,
      id: String
    },
    computed: {
      checked() {
        return this.value === this.activeValue;
      },
      switchDisabled() {
        return this.disabled || (this.form || {}).disabled;
      }
    },
    methods: {
      handleChange() {
        const val = this.checked ? this.inactiveValue : this.activeValue;
        this.$emit('input', val);
        this.$emit('change', val);
      },
      switchValue() {
        !this.switchDisabled && this.handleChange();
      }
    },
  });
});
