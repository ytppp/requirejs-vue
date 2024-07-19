define(function (require) {
  var Vue = require('vue');
  require('fh-icon');

  Vue.component('FhInput', {
    template: require('text!./components/input/template.html'),
    inject: {
      form: {
        default: ''
      },
      formItem: {
        default: ''
      }
    },
    props: {
      value: [String, Number],
      prefixIcon: String,
      suffixIcon: String,
      tabindex: String,
      label: String,
      name: String,
      placeholder: String,
      disabled: Boolean,
      readonly: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      autocomplete: {
        type: String,
        default: 'new-password'
      },
      clearable: {
        type: Boolean,
        default: false
      },
      showPassword: {
        type: Boolean,
        default: false
      },
      showWordLimit: {
        type: Boolean,
        default: false
      },
      isFormatHtml: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        hovering: false,
        focused: false,
        isComposing: false,
        passwordVisible: false,
      };
    },
    computed: {
      inputDisabled() {
        return this.disabled || (this.form || {}).disabled;
      },
      isWordLimitVisible() {
        return this.showWordLimit &&
          this.$attrs.maxlength &&
          (this.type === 'text' || this.type === 'textarea') &&
          !this.inputDisabled &&
          !this.readonly &&
          !this.showPassword;
      },
      inputExceed() {
        return this.isWordLimitVisible &&
          (this.textLength > this.upperLimit);
      },
      nativeInputValue() {
        if (this.value === null || this.value === undefined) {
          return '';
        }
        let val = String(this.value);
        if (this.isFormatHtml) {
          val = this.escape2Html(val);
        }
        return val;
      },
      showClear() {
        return this.clearable &&
          !this.inputDisabled &&
          !this.readonly &&
          this.nativeInputValue &&
          (this.focused || this.hovering);
      },
      showPwdVisible() {
        return this.showPassword &&
          !this.inputDisabled &&
          !this.readonly &&
          (!!this.nativeInputValue || this.focused);
      },
      upperLimit() {
        return this.$attrs.maxlength;
      },
      textLength() {
        if (typeof this.value === 'number') {
          return String(this.value).length;
        }
        return (this.value || '').length;
      },
    },
    watch: {
      // value(val) {
      //   this.$nextTick(this.resizeTextarea);
      // },
      nativeInputValue() {
        this.setNativeInputValue();
      },
      type() {
        this.$nextTick(() => {
          this.setNativeInputValue();
          // this.resizeTextarea();
          // this.updateIconOffset();
        });
      }
    },
    methods: {
      escape2Html(val) {
        let temp = document.createElement('span');
        temp.innerHTML = val;
        let output = temp.innerText || temp.textContent;
        temp = null;
        return output;
      },
      getInput() {
        return this.$refs.input || this.$refs.textarea;
      },
      focus() {
        this.getInput().focus();
      },
      blur() {
        this.getInput().blur();
      },
      getSuffixVisible() {
        return this.$slots.suffix ||
          this.suffixIcon ||
          this.showClear ||
          this.showPassword ||
          this.isWordLimitVisible;
      },
      clear() {
        this.$emit('input', '');
        this.$emit('change', '');
        this.$emit('clear');
      },
      handlePasswordVisible() {
        this.passwordVisible = !this.passwordVisible;
      },
      setNativeInputValue() {
        const input = this.getInput();
        if (!input) return;
        if (input.value === this.nativeInputValue) return;
        input.value = this.nativeInputValue;
      },
      handleCompositionStart(event) {
        this.$emit('compositionstart', event);
        this.isComposing = true;
      },
      handleCompositionUpdate(event) {
        this.$emit('compositionupdate', event);
        this.isComposing = true;
      },
      handleCompositionEnd(event) {
        this.$emit('compositionend', event);
        if (this.isComposing) {
          this.isComposing = false;
          this.handleInput(event);
        }
      },
      handleInput(event) {
        if (this.isComposing) return;
        if (event.target.value === this.nativeInputValue) return;
        this.$emit('input', event.target.value);
        this.$nextTick(this.setNativeInputValue);
      },
      handleFocus(event) {
        this.focused = true;
        this.$emit('focus', event);
        this.$parent.$emit('focus', event);
      },
      handleBlur(event) {
        this.focused = false;
        this.$emit('blur', event);
        this.$parent.$emit('blur', event);
      },
      handleChange(event) {
        this.$emit('change', event.target.value);
        this.$parent.$emit('change', event.target.value);
      },
    },
    mounted () {
      this.setNativeInputValue();
    }
  });
});
