define(function (require) {
  var Vue = require('vue');
  Vue.component('FhTableNewCol', {
    template: require('text!./components/table-new-col/template.html'),
    props: {
      prop: {
        type: String,
      },
      label: {
        type: String,
      },
    },
    data() {
      return {
      };
    },
    computed: {
    },
    methods: {
    },
    created () {
      // console.log(this.prop, this.label);
    },
    mounted () {
    }
  });
});
