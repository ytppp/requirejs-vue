/**
 * input框组件
 */
define(function (require) {
  require('less!./components/input/style.less');
  var Vue = require('vue');

  Vue.component('fh-input', {
    template: require('text!./components/input/template.html'),
    props: {
      type: {
        type: String,
        default: 'text'
      },
      hidePwdIcon: {
        type: Boolean,
        default: false
      },
      value: {},
      placeholder: { type: String },
      disabled: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ''
      },
      onBlur: { type: Function },
      addonBefore: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        showPwd: false,
        inputValue: this.value || ''
      };
    },
    watch: {
      value() {
        this.inputValue = this.value;
        this.$parent.$emit('change');
      }
    },
    methods: {
      getCursorPosition() {
        return this.$refs.input.selectionEnd;
      },
      setCursorPosition(position) {
        this.$refs.input.setSelectionRange(position, position);
      },
      changePwdStatus() {
        if (!this.disabled) {
          this.showPwd = !this.showPwd;
        }
      },
      onInput() {
        this.$emit('input', this.inputValue);
      },
      blur() {
        this.onBlur && this.onBlur();
        this.$parent.$emit('blur');
      },
      focus() {
        this.$parent.$emit('focus');
      }
    },
    computed: {
      computedWidth() {
        if (!this.addonBefore) {
          return 0;
        }

        const div = document.createElement('div');
        div.innerText = this.addonBefore;
        div.style.fontSize = '14px';
        div.style.paddingLeft = '10px'; // same padding with input
        div.style.display = 'inline-block';
        document.body.appendChild(div);
        const width = `${div.clientWidth}px`;
        document.body.removeChild(div);
        return width;
      },
      inputType() {
        if (this.type === 'password') {
          if (this.showPwd) {
            return 'text';
          }
          return 'password';
        }
        return 'text';
      },
      isPwdInput() {
        return this.type === 'password';
      }
    }
  });
});
