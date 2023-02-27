require.config({
  baseUrl: './',
  urlArgs: 'v=' + new Date().getTime(),
  paths: {
    vue: 'libs/vue/vue.min',
    'vue-router': 'libs/vue-router/vue-router.min',
    'vue-i18n': 'libs/vue-i18n/vue-i18n',
    vuex: 'libs/vuex/vuex',
    jquery: 'libs/jquery',
    'velocity-animate': 'libs/velocity-animate.min',

    text: 'libs/require-plugins/text',
    json: 'libs/require-plugins/json',
    css: 'libs/require-plugins/css.min',
    less: 'libs/require-plugins/less/less',
    lessc: 'libs/require-plugins/less/lessc',
    normalize: 'libs/require-plugins/less/normalize',

    'fh-input': 'components/input/index',
    'fh-select': 'components/select/index',
    'fh-form': 'components/form/index',
    'fh-form-item': 'components/form-item/index',
    'fh-checkbox': 'components/checkbox/index',
    'fh-checkbox-group': 'components/checkbox-group/index',
    'fh-switch': 'components/switch/index',
    'fh-button': 'components/button/index',
    'fh-radio': 'components/radio/index',
    'fh-radio-group': 'components/radio-group/index',
    'fh-alert': 'components/alert/index',
    'fh-header': 'components/header/index',
    'fh-footer': 'components/footer/index',
    'fh-layout': 'components/layout/index',
    'fh-dialog': 'components/dialog/index',
    clickoutside: 'components/directives/clickoutside',

    constant: 'util/constant',
    'customer-info': 'util/customer-info',
    tool: 'util/tool',
    menu: 'util/menu'
  },
  shim: {
    'vue-i18n': ['vue'],
    vuex: ['vue']
  }
});

require(['css!style/normalize.css', 'less!style/common.less', 'less!style/icon.less']);

define(function (require) {
  var Vue = require('vue');
  var router = require('router/index');
  var store = require('store/index');
  var i18nInstance = require('i18n/index');
  var customerInfo = require('customer-info');
  var tool = require('tool');

  require([`less!customer-conf/${customerInfo.name}/style/custom.less`]);
  tool.setFavicon(customerInfo[customerInfo.name].favicon);
  tool.setDocTitle(customerInfo[customerInfo.name].title);

  window.app = new Vue({
    router,
    store,
    i18n: i18nInstance.i18n
  }).$mount('#root');
});
