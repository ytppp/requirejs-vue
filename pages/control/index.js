define(function (require) {
  require('less!./style.less');
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
    computed: {},
    methods: {}
  };
});
