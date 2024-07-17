define(function (require) {
  require('fh-wrap');
  var Vue = require('vue');
  const LoadingCom = Vue.extend({
    template: require('text!./components/loading/template.html'),
    data() {
      return {
        visible: false,
        tip: '',
        title: '',
        isAppendBody: false,
      };
    }
  });

  return LoadingCom;
});
