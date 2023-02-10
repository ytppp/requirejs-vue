define(function (require) {
  var Vue = require('vue');
  Vue.component('fh-form', {
    template: require('text!./components/form/template.html'),
    props: ['model', 'rules'],
    methods: {
      methods: {
        validate() {
          let result = true;

          this.$children.forEach(child => {
            if (child.validate) {
              if (!child.validate()) {
                result = false;
              }
            }
            return true;
          });
          return result;
        }
      }
    }
  });
});
