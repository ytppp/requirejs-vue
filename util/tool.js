define(function (require) {
  var customerInfo = require('customer-info');
  function formatLang(lang) {
    let langFormated = {
      zh: 'zh-CN',
      en: 'en-US',
      nl: 'nl-NL',
      pt: 'pt-PT',
      fr: 'fr-FR',
      es: 'es-MX',
      de: 'de-DE'
    }; // 浏览器返回语言可能只含前半部分，加上后半部分
    return langFormated[lang] ? langFormated[lang] : lang;
  }
  function getLangUsed() {
    var lang = customerInfo[customerInfo.name].defaultLanguage;
    if (localStorage && localStorage.getItem('lang')) {
      lang = localStorage.getItem('lang');
    } else if (navigator && navigator.language) {
      lang = navigator.language;
    }
    return formatLang(lang);
  }
  function setFavicon(favicon) {
    var link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement('link');
    link.rel = 'icon';
    link.href = favicon;
    document.getElementsByTagName('head')[0].appendChild(link);
  }
  function setDocTitle(title) {
    document.title = title;
  }
  function scrollTo(el, x = 0, y = 0) {
    if (el.scrollTo) {
      el.scrollTo(x, y);
    } else {
      el.scrollLeft = x;
      el.scrollTop = y;
    }
  }
  function isValidPassword(value, min = 8, max = 24) {
    if (!value) {
      return false;
    }
    if (value.length < min || value.length > max) {
      return false;
    }
    const passwordRuleReg =
      /^[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~`]+$/;
    return passwordRuleReg.test(value);
  }
  String.prototype.format = function (...args) {
    let _this = this;
    args.forEach(val => {
      _this = _this.replace(/%[abcdefghnostx]/, val);
    });
    return _this;
  };
  return {
    getLangUsed,
    setFavicon,
    setDocTitle,
    scrollTo,
    isValidPassword
  };
});

/**
  | 国家/地区 | 语言代码 | 国家/地区 | 语言代码 |
  | --- | --- | --- | --- |
  | 简体中文(中国) | zh-cn | 繁体中文(台湾地区) | zh-tw |
  | 繁体中文(香港) | zh-hk | 英语(香港) | en-hk |
  | 英语(美国) | en-us | 英语(英国) | en-gb |
  | 英语(全球) | en-ww | 英语(加拿大) | en-ca |
  | 英语(澳大利亚) | en-au | 英语(爱尔兰) | en-ie |
  | 英语(芬兰) | en-fi | 芬兰语(芬兰) | fi-fi |
  | 英语(丹麦) | en-dk | 丹麦语(丹麦) | da-dk |
  | 英语(以色列) | en-il | 希伯来语(以色列) | he-il |
  | 英语(南非) | en-za | 英语(印度) | en-in |
  | 英语(挪威) | en-no | 英语(新加坡) | en-sg |
  | 英语(新西兰) | en-nz | 英语(印度尼西亚) | en-id |
  | 英语(菲律宾) | en-ph | 英语(泰国) | en-th |
  | 英语(马来西亚) | en-my | 英语(阿拉伯) | en-xa |
  | 韩文(韩国) | ko-kr | 日语(日本) | ja-jp |
  | 荷兰语(荷兰) | nl-nl | 荷兰语(比利时) | nl-be |
  | 葡萄牙语(葡萄牙) | pt-pt | 葡萄牙语(巴西) | pt-br |
  | 法语(法国) | fr-fr | 法语(卢森堡) | fr-lu |
  | 法语(瑞士) | fr-ch | 法语(比利时) | fr-be |
  | 法语(加拿大) | fr-ca | 西班牙语(拉丁美洲) | es-la |
  | 西班牙语(西班牙) | es-es | 西班牙语(阿根廷) | es-ar |
  | 西班牙语(美国) | es-us | 西班牙语(墨西哥) | es-mx |
  | 西班牙语(哥伦比亚) | es-co | 西班牙语(波多黎各) | es-pr |
  | 德语(德国) | de-de | 德语(奥地利) | de-at |
  | 德语(瑞士) | de-ch | 俄语(俄罗斯) | ru-ru |
  | 意大利语(意大利) | it-it | 希腊语(希腊) | el-gr |
  | 挪威语(挪威) | no-no | 匈牙利语(匈牙利) | hu-hu |
  | 土耳其语(土耳其) | tr-tr | 捷克语(捷克共和国) | cs-cz |
  | 斯洛文尼亚语 | sl-sl | 波兰语(波兰) | pl-pl |
  | 瑞典语(瑞典) | sv-se | 西班牙语 (智利) | es-cl |
 */
