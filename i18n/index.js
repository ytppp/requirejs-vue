define(function (require) {
  var VueI18n = require('vue-i18n');
  var Vue = require('vue');
  var constant = require('constant');
  var customerInfo = require('customer-info');
  var tool = require('tool');
  var i18nArr = [];
  Vue.use(VueI18n);
  var i18n = new VueI18n({
    locale: tool.getLangUsed(),
    messages: {
      [constant.languages.en]: {},
      [constant.languages.zh]: {}
    }
  });
  customerInfo[customerInfo.name].languages.forEach(function (lang) {
    i18nArr.push(`json!customer-conf/${customerInfo.name}/i18n/${lang}.json`);
  });
  require(i18nArr, function () {
    i18n.mergeLocaleMessage(constant.languages.en, arguments[0]);
    i18n.mergeLocaleMessage(constant.languages.zh, arguments[1]);
  });

  // todo 自定义文件处理

  function changeLanguage(lang) {
    if (!customerInfo[customerInfo.name].languages.includes(lang)) {
      console.log('language not exist!');
    } else {
      localStorage.setItem('lang', lang);
      window.location.reload();
    }
  }

  function translate(key, locale) {
    return i18n.t(key, locale || i18n.locale);
  }

  function toLocaleNumber(
    number,
    locale = 'en-US',
    minimumFractionDigits = 1,
    maximumFractionDigits = 1
  ) {
    // 有时候传入是不是数字，是占位符字符串
    if (typeof number === 'number') {
      return i18n.n(number, {
        key: defaultKey,
        locale,
        minimumFractionDigits,
        maximumFractionDigits
      });
    }
    return number;
  }
  return {
    i18n,
    changeLanguage,
    translate,
    toLocaleNumber
  };
});
