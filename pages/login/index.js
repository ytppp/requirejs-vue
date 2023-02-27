define(function (require) {
  require('less!./style.less');
  require('fh-layout');
  require('fh-form');
  require('fh-form');
  require('fh-form-item');
  require('fh-input');
  require('fh-button');
  var $ = require('jquery');
  var { isValidPassword, getStringByte } = require('tool');
  var customerInfo = require('customer-info');

  return {
    template: require('text!./template.html'),
    data() {
      return {
        formDisabled: true,
        logoSrc: customerInfo[customerInfo.name].logo,
        userinfo: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {
              rule: value => value,
              message: this.$t('trans0004')
            },
            {
              rule: value => getStringByte(value) <= 64,
              message: this.$t('trans0005')
            }
          ],
          password: [
            {
              rule: value => value,
              message: this.$t('trans0004')
            },
            {
              rule: value => isValidPassword(value, 1, 64),
              message: this.$t('trans0003').format(1, 64)
            }
          ]
        }
      };
    },
    methods: {
      login() {
        if (this.$refs.form.validate()) {
          var form = $('#loginForm');
          $.ajax({
            url: '/cgi-bin/check_auth.json',
            type: form.attr('method'),
            data: form.serialize(),
            dataType: 'json',
            beforeSend: () => {
              this.formDisabled = true;
            },
            error: () => {
              this.formDisabled = false;
            },
            success: result => {
              console.log(result);
            }
          });
        }
      }
    }
  };
});
