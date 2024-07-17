define(function (require) {
  require('iconfont');
  var Vue = require('vue');
  Vue.component('FhIcon', {
    props: {
      name: {
        type: String,
        default: ''
      },
      hoverName: {
        type: String
      }
    },
    data() {
      return {
        isHover: false
      };
    },
    computed: {
      iconName() {
        return `#${this.isHover ? this.hoverName : this.name}`;
      }
    },
    methods: {
      click() {
        this.$emit('click');
      },
      hover() {
        if (!this.hoverName) {
          return;
        }
        this.isHover = true;
      },
      out() {
        if (!this.hoverName) {
          return;
        }
        this.isHover = false;
      }
    },
    render: function (createElement) {
      const {iconName, click, hover, out} = this;
      const iconProps = {
        attrs: {
          'aria-hidden': true
        },
        class: ['svg-icon'],
        on: {
          click: click,
          mouseover: hover,
          mouseout: out
        }
      };
      const iconUseProps = {
        attrs: {
          'xlink:href': iconName
        }
      }
      return createElement(
        'svg',
        {...iconProps},
        [
          createElement(
            'use',
            {...iconUseProps}
          )
        ]
      );
    },
  });
});
