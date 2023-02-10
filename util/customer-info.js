define(function (require) {
  var constant = require('constant');
  return {
    name: constant.customers.demo, // 当前客户
    [constant.customers.demo]: {
      title: 'Demo',
      languages: [constant.languages.en, constant.languages.zh],
      defaultLanguage: constant.languages.en,
      favicon: 'customer-conf/demo/images/favicon.png'
    },
    [constant.customers.fhtek]: {
      title: 'Fhtek',
      languages: [constant.languages.en, constant.languages.zh],
      defaultLanguage: constant.languages.zh,
      favicon: 'customer-conf/fhtek/images/favicon.ico'
    }
  };
});
