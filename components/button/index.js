define(function (require) {
  require('less!./components/button/style.less');
  var Vue = require('vue');
  Vue.component('FhButton', {
    template: require('text!./components/button/template.html'),
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      size: {
        type: String
      },
      nativeType: {
        type: String,
        default: 'button'
      }
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  });
});
