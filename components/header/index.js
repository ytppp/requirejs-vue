define(function (require) {
  var Vue = require('vue');
  var dialog = require('fh-dialog');
  require('fh-menu');
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
      menus: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        menuMode: 'horizontal',

        mobileI18nVisible: false,
        showPopup: false,
        Languages: Languages.filter(l => l.show),
        current: null,
        navVisible: true,
        logoSrc: customerInfo[customerInfo.name].logo
      };
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
      handleMenuItemClick(menu) {
        this.$parent.handleMenuItemClick(menu);
      },
      trigerMobileNav() {
        this.navVisible = !this.navVisible;
        this.mobileI18nVisible = false;
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
        this.navVisible = false;
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
          okText: this.$t('trans0019'),
          cancelText: this.$t('trans0020'),
          message: this.$t('trans0021'),
          callback: {
            ok: () => {
              localStorage.removeItem("username");
              window.location.href = '/cgi-bin/logout.cgi';
            },
          },
        });
      },
      close() {
        this.showPopup = false;
      },
      changeMenuMode() {
        const contentMinWidth = 768; // 定义内容区域最小宽度
        if (document.body.clientWidth > contentMinWidth) {
          this.menuMode = 'horizontal';
          this.navVisible = true;
        } else {
          this.menuMode = 'vertical';
          this.navVisible = false;
        }
      }
    },
    mounted() {
      this.$i18n.locale = this.language.value;
      // this.changeMenuMode();
      if (window.addEventListener) {
        window.addEventListener('click', this.close);
        // window.addEventListener('resize', this.changeMenuMode);
      } else if (window.attachEvent) {
        window.attachEvent('click', this.close);
        // window.attachEvent('resize', this.changeMenuMode);
      }
    },
    beforeDestroy() {
      if (window.addEventListener) {
        window.removeEventListener('click', this.close);
        // window.removeEventListener('resize', this.changeMenuMode);
      } else if (window.attachEvent) {
        window.detachEvent('click', this.close);
        // window.detachEvent('resize', this.changeMenuMode);
      }
    }
  });
});
