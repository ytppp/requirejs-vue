define(function (require) {
  var Vue = require('vue');
  Vue.component('FhRadioGroup', {
    template: require('text!./components/radio-group/template.html'),
    componentName: 'FhRadioGroup',
    inject: {
      form: {
        default: ''
      },
      formItem: {
        default: ''
      }
    },
    props: {
      direction: {
        type: String,
        default: 'horizontal'
      },
      value: {},
      disabled: Boolean
    },
    created() {
      this.$on('handleChange', value => {
        this.$emit('change', value);
      });
    }
  });
});
