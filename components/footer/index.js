define(function (require) {
  require('less!./components/footer/style.less');
  var Vue = require('vue');
  Vue.component('FhFooter', {
    template: require('text!./components/footer/template.html'),
    data() {
      return { show: false };
    },
    methods: {
      showPolicy() {
        console.log('showPolicy');
      },
      close() {
        this.show = false;
      }
    },
    computed: {
      policy() {
        // return require('./policy-en.html');
        return '';
      },
      copyright() {
        return `${this.$t('trans0009')} ${this.$t('trans0008')}`;
      }
    }
  });
});
