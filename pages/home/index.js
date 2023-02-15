define(function (require) {
  require('less!./style.less');
  var { isValidPassword, getStringByte } = require('tool');
  require('fh-form');
  require('fh-form-item');
  require('fh-input');
  require('fh-select');
  require('fh-checkbox');
  require('fh-switch');
  require('fh-button');
  require('fh-radio');
  require('fh-radio-group');

  return {
    template: require('text!./template.html'),
    data() {
      return {
        ddns: {
          domain: 'asdaq',
          username: 'baidu',
          password: '123456',
          service: 'dyndns',
          enabled: false,
          serviceList: ['dyndns', 'oray']
        },
        addonBefore: 'xxxx',
        services: [
          {
            text: this.$t('trans0437'),
            value: 'dyndns'
          },
          {
            text: this.$t('trans0438'),
            value: 'oray'
          }
        ],
        rules: {
          domain: [
            {
              rule: value => value,
              message: this.$t('trans0232')
            },
            {
              rule: value => getStringByte(value) <= 64,
              message: this.$t('trans0228')
            }
          ],
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
    methods: {
      submit() {
        alert('submit');
      },
      updateddns() {}
    }
  };
});
