define(function (require) {
  var constant = require('constant');
  return {
    name: constant.customers.fhtek, // 当前客户
    [constant.customers.demo]: {
      title: 'Demo',
      languages: [constant.languages.en, constant.languages.zh],
      defaultLanguage: constant.languages.en,
      favicon: 'customer-conf/demo/images/favicon.png',
      logo: 'customer-conf/demo/images/logo.png'
    },
    [constant.customers.fhtek]: {
      title: 'Fhtek',
      languages: [constant.languages.en, constant.languages.zh],
      defaultLanguage: constant.languages.zh,
      favicon: 'customer-conf/fhtek/images/favicon.ico',
      logo: 'customer-conf/fhtek/images/logo.png'
    }
  };
});
