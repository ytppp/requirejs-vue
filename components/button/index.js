define(function (require) {
  require('less!./components/button/style.less');
  var Vue = require('vue');
  Vue.component('FhButton', {
    template: require('text!./components/button/template.html'),
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
      size: {
        type: String,
        default: 'small',
        validator: function (value) {
          return ['small', 'middle', 'block'].indexOf(value) !== -1;
        }
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      id: String
    },
    computed: {
      btnDisabled() {
        return this.disabled || (this.form || {}).disabled;
      }
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  });
});
