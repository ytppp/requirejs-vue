define(function (require) {
  require('css!./style.css');
  require('fh-layout');
  require('fh-input');
  require('fh-select');
  require('fh-switch');
  require('fh-button');

  const DeviceType = {
    wired: 'wireless_5g',
    wireless_5g: 'wireless_5g',
    disallow: 'disallow',
    offline: 'offline'
  };
  const minSpeed = 100;
  const maxSpeed = 1000000;
  return {
    template: require('text!./template.html'),
    data() {
      return {
        form: {
          deviceType: DeviceType.wired
        },
        DeviceType,
        deviceList: [
          {
            value: DeviceType.wired,
            text: this.$t('trans0172')
          },
          {
            value: DeviceType.wireless_5g,
            text: this.$t('trans0173')
          },
          {
            value: DeviceType.disallow,
            text: this.$t('trans0174')
          },
          {
            value: DeviceType.offline,
            text: this.$t('trans0175')
          }
        ],
        data: []
      };
    },
    computed: {
      speedLimitTipsText() {
        return this.$t('trans0611').format(minSpeed, maxSpeed);
      }
    },
    methods: {
      toggleSpeedLimit(item, type, flag) {
        if (type === 'topSpeed') {
          item.isShowTopSpeedLimitInput = flag;
          if (flag) {
            this.$nextTick(() => {
              this.$refs.topSpeedLimitInput[0].focus();
            })
          }
        }
        if (type === 'bottomSpeed') {
          item.isShowBootomSpeedLimitInput = flag;
          if (flag) {
            this.$nextTick(() => {
              this.$refs.bootomSpeedLimitInput[0].focus();
            })
          }
        }
      },
      formatSpeed(value) {
        const units = ['bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps', 'Pbps'];
        let index = 0;
        value = Number(value);
        if (!Number.isNaN(value)) {
          while (value > 1000 && index < units.length - 1) {
            value /= 1000;
            index += 1;
          }
          return {
            value,
            unit: units[index]
          };
        }
        return {
          value: '-',
          unit: 'bps'
        };
      }
    },
    created () {
      let data = [
        {
          name: 'xxxx',
          ip: '192.168.3.254',
          mac: 'A0:88:B4:DD:88:74',
          time: '4 天 10 小时 3 分钟',
          isAllowInternet: false,
          isSpeedLimit: false,
          topSpeed: '',
          bottomSpeed: ''
        }
      ];
      this.data = data.map(item => {
        let topSpeed = Number(item.topSpeed);
        let bottomSpeed = Number(item.bottomSpeed);
        return {
          ...item,
          topSpeed,
          topSpeedText: topSpeed ? topSpeed : this.$t('trans0172'),
          topSpeedUnit: 'Kbps',
          topSpeedInput: topSpeed ? topSpeed : '',
          bottomSpeed,
          bottomSpeedText: bottomSpeed ? bottomSpeed : this.$t('trans0172'),
          bottomSpeedInput: bottomSpeed ? bottomSpeed : '',
          bottomSpeedUnit: 'Kbps',
          isShowTopSpeedLimitInput: false,
          isShowBootomSpeedLimitInput: false,
        }
      })
    }
  };
});
