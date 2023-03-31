define(function (require) {
  var Vue = require('vue');
  Vue.component('FhForm', {
    template: require('text!./components/form/template.html'),
    props: {
      model: {
        type: Object
      },
      rules: {
        type: Object
      },
      name: String,
      id: String,
      action: String,
      method: String,
      enctype: String,
      disabled: Boolean
    },
    provide() {
      return {
        form: this
      };
    },
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
  });
});
