define(function (require) {
  require('less!./components/checkbox-group/style.less');
  var Vue = require('vue');
  Vue.component('FhCheckboxGroup', {
    template: require('text!./components/checkbox-group/template.html'),
    componentName: 'FhCheckboxGroup',
    inject: {
      form: {
        default: ''
      },
      formItem: {
        default: ''
      }
    },
    props: {
      rect: {
        type: Boolean,
        default: true
      },
      direction: {
        type: String,
        default: 'horizontal'
      },
      value: {},
      disabled: Boolean,
    },
    created() {
      this.$on('handleChange', value => {
        this.$emit('change', value);
      });
    }
  })
});
