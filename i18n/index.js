define(function (require) {
  var VueI18n = require('vue-i18n');
  var Vue = require('vue');
  var customerInfo = require('customer-info');
  var tool = require('tool');
  var transArr = [];
  var langArr = [];
  var numberFormat = {
    decimal: {
      style: 'decimal'
    }
  }; // 数字格式
  Vue.use(VueI18n);
  var i18n = new VueI18n({
    locale: tool.getLangUsed()
  });
  customerInfo[customerInfo.name].languages.forEach(function (lang) {
    langArr.push(lang);
    transArr.push(`json!customer-conf/${customerInfo.name}/i18n/${lang}.json`);
    i18n.mergeLocaleMessage(lang, {});
    i18n.mergeNumberFormat(lang, numberFormat);
  });
  require(transArr, function () {
    for (let i = 0; i < arguments.length; i++) {
      i18n.mergeLocaleMessage(langArr[i], arguments[i]);
    }
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
