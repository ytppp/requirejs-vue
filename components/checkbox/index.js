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
      value: Array,
      direction: {
        type: String,
        default: 'horizontal'
      },
      rect: {
        type: Boolean,
        default: true
      },
      readonly: {
        type: Boolean,
        default: false
      },
      stopPropagation: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      options: Array,
      name: String
    },
    computed: {
      isDisabled() {
        return this.disabled || (this.form || {}).disabled;
      },
      model: {
        get() {
          return this.value;
        },
        set(val) {
          // console.log(val)
          // this.$emit('input', val);
          // this.$refs.radio && (this.$refs.radio.checked = this.model === this.label);
        }
      }
    },
    methods: {
      check(e) {
        if (this.readonly || this.isDisabled) {
          return;
        }
        this.$emit('input', this.checked);
        this.$emit('change', this.checked);
      },
      handleChange(ev) {
        console.log('111111', ev.target.checked);
      }
      // handleChange(option, ev) {
      //   console.log('111111', option, this.model);
      //   if (ev.target.checked) {
      //     if (this.model.includes(option.value)) {
      //       this.model.splice(this.model.indexOf(option.value), 1);
      //     } else {
      //       this.model.push(option.value);
      //     }
      //   }
      //   if (!ev.target.checked && this.model.includes(option.value)) {
      //     this.model.push(option.value);
      //   }
      //   console.log('22222', this.model);
      //   this.$emit('change', this.model);
      // }
    }
  });
});
