define(function (require) {
  require('less!./components/checkbox/style.less');
  var Vue = require('vue');
  Vue.component('FhCheckbox', {
    template: require('text!./components/checkbox/template.html'),
    inject: {
      form: {
        default: ''
      },
      formItem: {
        default: ''
      }
    },
    props: {
      circle: {
        type: Boolean,
        default: false
      },
      value: {},
      label: {},
      disabled: Boolean,
      checked: Boolean,
      name: String,
      trueLabel: [String, Number],
      falseLabel: [String, Number],
    },
    data() {
      return {
        selfModel: false
      };
    },
    computed: {
      isGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== 'FhCheckboxGroup') {
            parent = parent.$parent;
          } else {
            this._checkboxGroup = parent;
            return true;
          }
        }
        return false;
      },
      isChecked() {
        if ({}.toString.call(this.model) === '[object Boolean]') {
          return this.model;
        } else if (Array.isArray(this.model)) {
          return this.model.indexOf(this.label) > -1;
        } else if (this.model !== null && this.model !== undefined) {
          return this.model === this.trueLabel;
        }
      },
      isCircle() {
        return this.isGroup ? this._checkboxGroup.circle || this.circle : this.circle;
      },
      isDisabled() {
        return this.isGroup
          ? this._checkboxGroup.disabled ||
              this.disabled ||
              (this.form || {}).disabled
          : this.disabled || (this.form || {}).disabled;
      },
      store() {
        return this._checkboxGroup ? this._checkboxGroup.value : this.value;
      },
      model: {
        get() {
          return this.isGroup
            ? this.store
            : this.value !== undefined
            ? this.value
            : this.selfModel;
        },
        set(val) {
          if (this.isGroup) {
            this._checkboxGroup.$emit('input', val);
          } else {
            this.$emit('input', val);
            this.selfModel = val;
          }
        }
      }
    },
    methods: {
      addToStore() {
        if (
          Array.isArray(this.model) &&
          this.model.indexOf(this.label) === -1
        ) {
          this.model.push(this.label);
        } else {
          this.model = this.trueLabel || true;
        }
      },
      handleChange(ev) {
        let value;
        if (ev.target.checked) {
          value = this.trueLabel === undefined ? true : this.trueLabel;
        } else {
          value = this.falseLabel === undefined ? false : this.falseLabel;
        }
        this.$nextTick(() => {
          if (this.isGroup) {
            this._checkboxGroup.$emit('change', this._checkboxGroup.value);
          } else {
            this.$emit('change', value);
          }
        });
      }
    },
    created() {
      this.checked && this.addToStore();
    }
  });
});
