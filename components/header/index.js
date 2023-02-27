define(function (require) {
  require('less!./components/header/style.less');
  var Vue = require('vue');
  var dialog = require('fh-dialog');
  var customerInfo = require('customer-info');
  var { changeLanguage } = require('i18n/index');
  const Languages = [
    {
      text: 'English',
      value: 'en-US',
      show: false
    },
    {
      text: '简体中文',
      value: 'zh-CN',
      show: false
    },
    {
      text: 'Deutsch',
      value: 'de-DE',
      show: false
    },
    {
      text: 'Nederlands',
      value: 'nl-NL',
      show: false
    },
    {
      text: 'Srpski',
      value: 'sr-RS',
      show: false
    },
    {
      text: 'Norsk bokmål',
      value: 'nb-NO',
      show: false
    },
    {
      text: 'Français',
      value: 'fr-FR',
      show: false
    },
    {
      text: 'Español',
      value: 'es-ES',
      show: false
    }
  ];
  const supportLanguage = customerInfo[customerInfo.name].languages;
  supportLanguage.forEach(sl => {
    const language = Languages.filter(l => l.value === sl)[0];
    if (language) {
      language.show = true;
    }
  });
  Vue.component('FhHeader', {
    template: require('text!./components/header/template.html'),
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      list: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        mobileI18nVisible: false,
        showPopup: false,
        Languages: Languages.filter(l => l.show),
        current: null,
        mobileNavVisible: false,
        logoSrc: customerInfo[customerInfo.name].logo
      };
    },
    mounted() {
      this.$i18n.locale = this.language.value;
      if (window.addEventListener) {
        document.body.addEventListener('click', this.close);
      } else if (window.attachEvent) {
        document.body.attachEvent('click', this.close);
      }
    },
    computed: {
      language() {
        return this.getDefaultLanguage();
      },
      title() {
        return this.$parent.title;
      },
      url() {
        return this.$parent.url;
      }
    },
    methods: {
      trigerMobileNav() {
        this.mobileNavVisible = !this.mobileNavVisible;
        this.mobileI18nVisible = false;
      },
      close() {
        this.showPopup = false;
      },
      getDefaultLanguage() {
        const language = this.Languages.filter(
          l => l.value === this.$i18n.locale
        )[0];
        if (!language) {
          return this.Languages[0];
        }
        return language;
      },
      setLangPopupVisible(visible) {
        this.showPopup = visible;
      },
      setMobleLangVisible() {
        this.mobileI18nVisible = !this.mobileI18nVisible;
        this.mobileNavVisible = false;
        // if (this.mobileI18nVisible) {
        //   this.$el.parentNode.style.paddingTop = '65px';
        // } else {
        //   this.$el.parentNode.style.paddingTop = '0';
        // }
      },
      selectLang(lang) {
        changeLanguage(lang.value);
        this.showPopup = false;
      },
      selectMobileLang(lang) {
        changeLanguage(lang.value);
        this.mobileI18nVisible = false;
      },
      changeLang() {
        const zh = 'zh-CN';
        const en = 'en-US';
        changeLanguage(this.$i18n.locale === en ? zh : en);
      },
      exit() {
        dialog.confirm({
          okText: this.$t('trans0024'),
          cancelText: this.$t('trans0025'),
          message: this.$t('trans0323'),
          callback: {
            ok: () => {
              console.log('123');
              // window.location.href = '/content/login.asp';
            }
          }
        });
      }
    },
    beforeDestroy() {
      if (window.addEventListener) {
        document.body.removeEventListener('click', this.close);
      } else if (window.attachEvent) {
        document.body.detachEvent('click', this.close);
      }
    }
  });
});
