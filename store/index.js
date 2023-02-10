define(function (require) {
  var customerInfo = require('customer-info');
  var Vue = require('vue');
  var Vuex = require('vuex');
  Vue.use(Vuex);
  var store = new Vuex.Store({
    state: {
      name: customerInfo.name
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {}
  });
  return store;
});
