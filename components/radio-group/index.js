define(function (require) {
  require('less!./components/radio-group/style.less');
  var Vue = require('vue');
  Vue.component('fh-radio-group', {
    template: require('text!./components/radio-group/template.html'),
    props: {
      value: {},
      direction: {
        type: String,
        default: 'horizontal'
      },
      options: Array
    },
    data() {
      return { selected: this.value };
    },
    watch: {
      value(val) {
        this.selected = val;
      }
    },
    methods: {
      check(option) {
        this.selected = option.value;
        this.$emit('input', this.selected);
      }
    }
  });
});
