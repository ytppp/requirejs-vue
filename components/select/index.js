/**
 * select 组件
 */
define(function (require) {
  require('less!./components/select/style.less');
  require('clickoutside');

  var Vue = require('vue');
  var { scrollTo } = require('tool');

  Vue.component('fh-select', {
    template: require('text!./components/select/template.html'),
    props: {
      options: {
        type: Array,
        default: () => []
      },
      value: {},
      label: {
        type: String,
        default: ''
      },
      height: {
        type: Number
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        selected: this.getOptionByValue(this.value),
        opened: false
      };
    },
    watch: {
      value(val) {
        this.selected = this.getOptionByValue(val);
      }
    },
    methods: {
      getOptionByValue(val) {
        const option = this.options.filter(o => o.value === val)[0] || {
          text: val
        };
        return option;
      },
      scrollToSelect() {
        this.$nextTick(() => {
          const popupEl = this.$el.querySelector('.select-popup');
          const selectEl = popupEl.querySelector('li.selected');
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
      }
    }
  });
});
