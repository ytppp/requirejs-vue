define(function (require) {
  require('css!./style.css');
  require('fh-layout');
  require('fh-form');
  require('fh-form-item');
  require('fh-radio-group');
  require('fh-radio');
  require('fh-input');
  require('fh-checkbox');
  require('fh-button');
  require('fh-step');
  const PageType = {
    devicePage: 'devicePage',
    netPage: 'netPage',
    routingPage: 'routingPage',
    resultPage: 'resultPage'
  };
  const Status = {
    success: 'success',
    fail: 'fail'
  };
  const OnlineWay = {
    pppoe: 'pppoe',
    dhcp: 'dhcp',
    static: 'static'
  };
  // 模拟板子数据 开始
  const connStatus = Status.fail;
  // 模拟板子数据 结束
  return {
    template: require('text!./template.html'),
    data() {
      return {
        PageType,
        pageType: PageType.devicePage,
        deviceConnStatus: Status.fail,
        stepOption: {
          current: 0,
          steps: [
            {
              text: this.$t('trans0577'),
              success: true
            },
            {
              text: this.$t('trans0578'),
              success: true
            },
            {
              text: this.$t('trans0579'),
              success: true
            },
            {
              text: this.$t('trans0580'),
              success: true
            },
          ]
        },
        onlineWay: OnlineWay.pppoe,
        onlineWays: [
          {
            value: OnlineWay.pppoe,
            text: this.$t('trans0081')
          },
          {
            value: OnlineWay.dhcp,
            text: this.$t('trans0082')
          },
          {
            value: OnlineWay.static,
            text: this.$t('trans0084')
          }
        ],
        pppoeForm: {
          username: '',
          password: ''
        },
        pppoeFormRules: {
          username: [],
          password: []
        },
        staticForm: {
          ip: '',
          mask: '',
          gateway: '',
          dnsPrimary: '',
          dnsSecondary: ''
        },
        staticFormRules: {
          ip: [],
          mask: [],
          gateway: [],
          dnsPrimary: [],
          dnsSecondary: []
        },
        wifiForm: {
          username: '',
          wifiPwd: '',
          routingPwd: '',
          isSame: false
        },
        wifiFormRules: {
          username: [],
          wifiPwd: [],
          routingPwd: []
        },
        displayForm: {
          username: '-',
          wifiPwd: '-',
          routingPwd: '-'
        }
      };
    },
    computed: {
      isDevicePage() {
        return this.pageType === PageType.devicePage;
      },
      isDeviceConnSuccess() {
        return this.deviceConnStatus === Status.success;
      },
      isDeviceConnFail() {
        return this.deviceConnStatus === Status.fail;
      },
      isNetPage() {
        return this.pageType === PageType.netPage;
      },
      isPppoe() {
        return this.onlineWay === OnlineWay.pppoe;
      },
      isDhcp() {
        return this.onlineWay === OnlineWay.dhcp;
      },
      isStatic() {
        return this.onlineWay === OnlineWay.static;
      },
      isRoutingPage() {
        return this.pageType === PageType.routingPage;
      },
      isResultPage() {
        return this.pageType === PageType.resultPage;
      }
    },
    methods: {
      jump(index) {
        this.stepOption.current = index;
        // this.stepOption.steps[index].success = true;
      },
      testDeviceConnStatus() {
        //
      },
      forwardLogin() {},
      jumpDevicePage() {
        this.pageType = PageType.devicePage;
        this.judgeDeviceConnStatus();
        this.jump(0);
      },
      jumpNetPage() {
        this.pageType = PageType.netPage;
        this.stepOption.steps[0].success = true;
        this.jump(1);
      },
      jumpRoutingPage() {
        this.pageType = PageType.routingPage;
        this.jump(2);
      },
      jumpResultPage() {
        this.pageType = PageType.resultPage;
        this.jump(3);
      },
      judgeDeviceConnStatus() {
        if (this.isDeviceConnSuccess) {
          this.stepOption.steps[0].success = true;
        } else {
          this.stepOption.steps[0].success = false;
        }
      }
    },
    created () {
      this.deviceConnStatus = connStatus;
      this.judgeDeviceConnStatus();
    },
    mounted () {

    }
  };
});
