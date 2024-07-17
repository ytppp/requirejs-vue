define(function (require) {
  var Vue = require('vue');
  const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
  const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
  Vue.component('FhButton', {
    inject: {
      form: {
        default: ''
      },
      formItem: {
        default: ''
      }
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      block: {
        type: Boolean,
        default: false
      },
      plain: {
        type: Boolean,
        default: true
      },
      size: {
        type: String,
        default: 'middle',
        validator: function (value) {
          return ['small', 'middle'].indexOf(value) !== -1;
        }
      },
      type: {
        type: String,
        default: 'primary',
        validator: function (value) {
          return ['primary', 'text'].indexOf(value) !== -1;
        }
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      id: String,
      needInserted: {
        type: Boolean,
        default: true
      } // Add a space between two Chinese characters
    },
    computed: {
      classes() {
        return [
          'btn',
          `btn--${this.type}`,
          this.size ? 'btn--' + this.size : '',
          {
            'is-disabled': this.btnDisabled,
            'is-block': this.block,
            'is-plain': this.plain
          }
        ]
      },
      btnDisabled() {
        return this.disabled || (this.form || {}).disabled;
      },
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      },
      insertSpace(child, createElement) {
        const SPACE = this.needInserted ? ' ' : '';
        if (typeof child.text === 'string') {
          let text = child.text.trim();
          if (isTwoCNChar(text)) {
            text = text.split('').join(SPACE);
          }
          return createElement(
            'span',
            text
          );
        }
        return child;
      },
    },
    render: function (createElement) {
      const { id, nativeType, btnDisabled, classes, handleClick, $slots } = this;
      const buttonProps = {
        attrs: {
          id,
          type: nativeType,
          disabled: btnDisabled
        },
        class: classes,
        on: {
          click: handleClick
        }
      };
      const children = $slots.default;
      const kids = children.map(child => this.insertSpace(child, createElement));
      return createElement(
        'button',
        {...buttonProps},
        kids
      );
    },
  });
});
