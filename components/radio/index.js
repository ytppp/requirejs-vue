define(function (require) {
  require('less!./components/radio/style.less');
  var Vue = require('vue');
  Vue.component('FhRadio', {
    template: require('text!./components/radio/template.html'),
    inject: {
      form: {
        default: ''
      },
      formItem: {
        default: ''
      }
    },
    props: {
      value: {},
      label: {},
      disabled: {
        type: Boolean,
        default: false
      },
      name: String
    },
    computed: {
      isDisabled() {
        return this.isGroup
          ? this._radioGroup.disabled || this.disabled || (this.form || {}).disabled
          : this.disabled || (this.form || {}).disabled;
      },
      isGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== 'FhRadioGroup') {
            parent = parent.$parent;
          } else {
            this._radioGroup = parent;
            return true;
          }
        }
        return false;
      },
      model: {
        get() {
          return this.isGroup ? this._radioGroup.value : this.value;
        },
        set(val) {
          if (this.isGroup) {
            this._radioGroup.$emit('input', val);
          } else {
            this.$emit('input', val);
          }
          this.$refs.radio && (this.$refs.radio.checked = this.model === this.label);
        }
      },
    },
    methods: {
      handleChange() {
        this.$nextTick(() => {
          if (this.isGroup) {
            this._radioGroup.$emit('handleChange', this.model);
          } else {
            this.$emit('change', this.model);
          }
        });
      }
    }
  });
});
