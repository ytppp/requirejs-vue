define(function (require) {
  require('less!./style.less');
  require('fh-form');
  require('fh-form-item');
  require('fh-input');
  require('fh-button');
  var { isValidPassword, getStringByte } = require('tool');
  var customerInfo = require('customer-info');

  return {
    template: require('text!./template.html'),
    data() {
      return {
        logoSrc: customerInfo[customerInfo.name].logo,
        userinfo: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {
              rule: value => value,
              message: this.$t('trans0232')
            },
            {
              rule: value => getStringByte(value) <= 64,
              message: this.$t('trans0261')
            }
          ],
          password: [
            {
              rule: value => value,
              message: this.$t('trans0232')
            },
            {
              rule: value => isValidPassword(value, 1, 64),
              message: this.$t('trans0125').format(1, 64)
            }
          ]
        }
      };
    },
    computed: {
    }
  };
});
