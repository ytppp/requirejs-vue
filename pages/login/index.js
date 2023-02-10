define(function (require) {
  require('less!./style.less');
  var { mapState } = require('vuex');

  return {
    template: require('text!./template.html'),
    data() {
      return {
        title: '登录'
      };
    },
    computed: {
      ...mapState(['name']),
      logoImgSrc() {
        return `/customer-conf/${this.name}/images/logo.png`;
      }
    }
  };
});
