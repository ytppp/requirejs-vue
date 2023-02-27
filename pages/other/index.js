define(function (require) {
  require('less!./style.less');
  let { isValidPassword, getStringByte } = require('tool');
  require('fh-layout');
  require('fh-form');
  require('fh-form-item');
  require('fh-input');
  require('fh-select');
  require('fh-switch');
  require('fh-button');
  require('fh-radio');
  require('fh-checkbox');
  require('fh-alert');
  let dialog = require('fh-dialog');

  const Encrypts = {
    none: 'none',
    wpa2: '11i',
    wpawpa2: 'WPAand11i',
    wpa2wpa3: 'WPA2-PSK/WPA3-PSK'
  };
  const Powermodes = {
    low: '2', // 60%
    middle: '1', // 80%
    high: '6', // '100%'
  };
  const Bands = {
    b24g: '2.4G',
    b5g: '5G'
  };

  return {
    template: require('text!./template.html'),
    data() {
      return {
        Encrypts,
        Powermodes,
        Bands,
        wifiform: {
          isB5gFirst: true,
          b24g: {
            enable: true,
            ssid: '',
            password: '',
            encrypt: Encrypts.none,
            isAutoReboot: false
          },
          b5g: {
            enable: true,
            ssid: '',
            password: '',
            encrypt: Encrypts.none,
            isAutoReboot: false
          },
          isLoginPwd: false, // 将 Wi-Fi 密码作为路由器登录密码
          isStandbyNet: false, // Wi-Fi 5 备用网络
          powermode: Powermodes.high
        },
        powermodes: [
          {
            value: Powermodes.low,
            text: this.$t('trans0045')
          },
          {
            value: Powermodes.middle,
            text: this.$t('trans0046')
          },
          {
            value: Powermodes.high,
            text: this.$t('trans0047')
          }
        ],
        encrypts: [
          {
            value: Encrypts.none,
            text: this.$t('trans0033')
          },
          {
            value: Encrypts.wpa2,
            text: this.$t('trans0034')
          },
          {
            value: Encrypts.wpawpa2,
            text: this.$t('trans0035')
          },
          {
            value: Encrypts.wpa2wpa3,
            text: this.$t('trans0036')
          }
        ],
        rules: {
          'b24g.ssid': [
            {
              rule: value => getStringByte(value) <= 20,
              message: this.$t('trans0005').format(this.$t('trans0051'))
            },
            {
              rule: value => !/^\s*$/g.test(value),
              message: this.$t('trans0052').format(this.$t('trans0051'))
            }
          ],
          'b24g.password': [
            {
              rule: value => isValidPassword(value, 8, 24),
              message: this.$t('trans0003').format(8, 24)
            }
          ],
          'b5g.ssid': [
            {
              rule: value => getStringByte(value) <= 20,
              message: this.$t('trans0005').format(this.$t('trans0051'))
            },
            {
              rule: value => !/^\s*$/g.test(value),
              message: this.$t('trans0052').format(this.$t('trans0051'))
            }
          ],
          'b5g.password': [
            {
              rule: value => isValidPassword(value, 8, 24),
              message: this.$t('trans0003').format(8, 24)
            }
          ]
        }
      };
    },
    computed: {
      b24gWifiText() {
        if (this.wifiform.isB5gFirst) {
          return this.$t('trans0027').format('');
        } else {
          return this.$t('trans0027').format(`${this.$t('trans0049')} `);
        }
      },
      b5gWifiText() {
        if (this.wifiform.isB5gFirst) {
          return this.$t('trans0027').format('');
        } else {
          return this.$t('trans0027').format(`${this.$t('trans0050')} `);
        }
      },
      b24gEncryptTip() {
        if (this.wifiform.b24g.encrypt === Encrypts.none) {
          return this.$t('trans0032');
        }
        if (this.wifiform.b24g.encrypt === Encrypts.wpa2wpa3) {
          return this.$t('trans0038');
        }
        return '';
      },
      b5gEncryptTip() {
        if (this.wifiform.b5g.encrypt === Encrypts.none) {
          return this.$t('trans0032');
        }
        if (this.wifiform.b5g.encrypt === Encrypts.wpa2wpa3) {
          return this.$t('trans0038');
        }
        return '';
      },
      b24gStandbyNetText() {
        return `${this.wifiform.b24g.ssid}_Wi-Fi5`;
      },
      b5gStandbyNetText() {
        return `${this.wifiform.b5g.ssid}_Wi-Fi5`;
      }
    },
    methods: {
      switchB5gFirst(val) {
        if (val) {
          dialog.confirm({
            okText: this.$t('trans0019'),
            cancelText: this.$t('trans0020'),
            message: this.$t('trans0048').format(this.wifiform.b24g.ssid),
            callback: {
              ok: () => {
                this.wifiform.b5g = {
                  ssid: `${this.wifiform.b24g.ssid}_5G`,
                  ...this.wifiform.b24g
                };
              },
              cancel: () => {
                this.wifiform.isB5gFirst = false;
              }
            }
          });
        } else {
          // todo
          this.wifiform.b5g = {
            enable: true,
            ssid: '',
            password: '',
            encrypt: Encrypts.none,
            isAutoReboot: false
          };
        }
      },
      switchEnable(band, val) {
        if (!val) {
          dialog.confirm({
            okText: this.$t('trans0019'),
            cancelText: this.$t('trans0020'),
            message: this.$t('trans0025'),
            callback: {
              cancel: () => {
                if (band = Bands.b24g) {
                  this.wifiform.b24g.enable = true;
                }
                if ((band = Bands.b5g)) {
                  this.wifiform.b5g.enable = true;
                }
              }
            }
          });
        }
      },
      changePowermode(val) {
        if (val !== Powermodes.high) {
          dialog.confirm({
            okText: this.$t('trans0019'),
            cancelText: this.$t('trans0020'),
            message: this.$t('trans0026'),
            callback: {
              ok: () => {
                this.wifiform.powermode = Powermodes.high;
              }
            }
          });
        }
      }
    }
  };
});
