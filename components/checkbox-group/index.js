define(function (require) {
  require('less!./components/checkbox-group/style.less');
  var Vue = require('vue');
  Vue.component('FhCheckboxGroup', {
    template: require('text!./components/checkbox-group/template.html'),
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
      }
    }
  })
});
