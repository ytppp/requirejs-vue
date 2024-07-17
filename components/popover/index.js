define(function (require) {
  var Vue = require('vue');
  const Positions = {
    topStart: 'top-start',
    top: 'top',
    topEnd: 'top-end',
    bottomStart: 'bottom-start',
    bottom: 'bottom',
    bottomEnd: 'bottom-end',
    left: 'left',
    right: 'right'
  };
  const Trigger = {
    click: 'click',
    hover: 'hover'
  };
  Vue.component('FhPopover', {
    template: require('text!./components/popover/template.html'),
    props: {
      position: {
        type: String,
        default: Positions.top,
        validator(value) {
          return [Positions.top, Positions.bottom].includes(value);
        }
      },
      trigger: {
        type: String,
        default: 'hover',
        validator(value) {
          return [Trigger.click, Trigger.hover].includes(value);
        }
      },
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        visible: false
      };
    },
    methods: {
      positionContent() {
        const { triggerWrapper, popoverWrapper } = this.$refs;
        document.body.appendChild(popoverWrapper);
        let { width, height, top, left } =
          triggerWrapper.getBoundingClientRect();
        let { width: popoverWrapperWidth, height: popoverWrapperHeight } =
          popoverWrapper.getBoundingClientRect();
        let positions = {
          [Positions.top]: {
            top: parseInt(window.pageYOffset + top - popoverWrapperHeight),
            left: parseInt(
              window.pageXOffset +
                left -
                Math.abs(popoverWrapperWidth - width) / 2
            )
          },
          [Positions.bottom]: {
            top: parseInt(window.pageYOffset + top + height),
            left: parseInt(
              window.pageXOffset +
                left -
                Math.abs(popoverWrapperWidth - width) / 2
            )
          }
          // [Positions.left]: {
          //   top: top + (height - popoverHeight) / 2 + window.pageYOffset,
          //   left: window.pageXOffset - left,
          // },
          // [Positions.right]: {
          //   top: top + (height - popoverHeight) / 2 + window.pageYOffset,
          //   left: left + width + window.pageXOffset,
          // },
        };
        popoverWrapper.style.left = positions[this.position].left + 'px';
        popoverWrapper.style.top = positions[this.position].top + 'px';
      },
      handleClick(event) {
        if (this.$refs.triggerWrapper.contains(event.target)) {
          if (this.visible === true) {
            this.onClose();
          } else {
            this.onShow();
          }
        }
      },
      onShow() {
        this.visible = true;
        this.$nextTick(() => {
          this.positionContent();
          document.addEventListener('click', this.eventHandler);
        });
      },
      onClose() {
        this.visible = false
        document.removeEventListener('click', this.eventHandler)
      },
      eventHandler(e) {
        if (
          this.$refs.popover &&
          (this.$refs.popover === e.target ||
            this.$refs.popover.contains(e.target))
        ) {
          return;
        }
        if (
          this.$refs.popoverWrapper &&
          (this.$refs.popoverWrapper === e.target ||
            this.$refs.popoverWrapper.contains(e.target))
        ) {
          return;
        }
        this.onClose();
      }
    },
    mounted() {
      if (this.trigger === Trigger.click) {
        this.$refs.popover.addEventListener('click', this.handleClick);
      } else {
        this.$refs.popover.addEventListener('mouseenter', this.onShow);
        this.$refs.popover.addEventListener('mouseleave', this.onClose);
      }
    },
    beforeDestroy() {
      if (this.trigger === Trigger.click) {
        this.$refs.popover.removeEventListener('click', this.handleClick);
      } else {
        this.$refs.popover.removeEventListener('mouseenter', this.onShow);
        this.$refs.popover.removeEventListener('mouseleave', this.onClose);
      }
    }
  });
});
