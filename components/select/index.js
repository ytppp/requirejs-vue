/**
 * select 组件
 */
define(function (require) {
  require('fh-input');
  require('clickoutside');

  var Vue = require('vue');
  var { scrollTo } = require('tool');

  Vue.component('FhSelect', {
    template: require('text!./components/select/template.html'),
    inject: {
      form: {
        default: ''
      },
      formItem: {
        default: ''
      }
    },
    props: {
      options: {
        type: Array,
        default: () => []
      },
      // value: {},
      value: {
        required: true
      },
      height: {
        type: Number
      },
      disabled: {
        type: Boolean,
        default: false
      },
      name: String,
      placeholder: String,
      label: String,
    },
    data() {
      return {
        selected: {},
        opened: false
      };
    },
    computed: {
      iconClass() {
        return this.opened ? 'is-reverse' : '';
      },
      currentLabel() {
        return this.label || this.$parent.label || '';
      },
      selectPlaceholder() {
        return typeof this.placeholder !== 'undefined'
          ? this.placeholder
          : this.$t('trans0001');
      },
      selectDisabled() {
        return this.disabled || (this.form || {}).disabled;
      },
    },
    watch: {
      value() {
        this.setSelected();
      },
      options() {
        this.setSelected();
      }
    },
    methods: {
      setSelected() {
        const option = this.options.filter(o => o.value === this.value)[0] || {
          text: this.value
        };
        this.selected = option;
      },
      scrollToSelect() {
        this.$nextTick(() => {
          const popupEl = this.$el.querySelector('.select__popup');
          const selectEl = popupEl.querySelector('li.is-selected');
          if (selectEl) {
            const popupHeight = popupEl.clientHeight;
            const elHeight = selectEl.clientHeight;
            // 滚动到正中间的位置
            scrollTo(
              popupEl,
              0,
              selectEl.offsetTop - popupHeight / 2 + elHeight / 2
            );
          }
        });
      },
      select(option) {
        this.selected = option;
        this.opened = false;
        this.$emit('input', this.selected.value);
        if (this.value !== this.selected.value) {
          this.change();
        }
      },
      change() {
        this.$emit('change', this.selected.value, this.value);
        this.$parent.$emit('change', this.selected.value, this.value);
      },
      open() {
        if (!this.disabled) {
          this.opened = !this.opened;
          if (this.opened) {
            this.scrollToSelect();
          }
        }
      },
      close() {
        this.opened = false;
      },
      inputBlurHandler() {
        setTimeout(() => {
          this.$emit('blur');
          this.$parent.$emit('blur');
        }, 100);
      },
      inputFocusHandler() {
        this.$emit('focus');
        this.$parent.$emit('focus');
      }
    },
    created () {
      this.setSelected();
    }
  });
});
