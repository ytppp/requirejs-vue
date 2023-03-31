define(function (require) {
  require('less!./components/loading/style.less');
  require('fh-wrap');
  var Vue = require('vue');
  const LoadingCom = Vue.extend({
    template: require('text!./components/loading/template.html'),
    data() {
      return {
        visible: false,
        tip: '',
        isAppendBody: false
      };
    },
    destroyed() {
      this.timer = null;
    }
  });

  return LoadingCom;
});
