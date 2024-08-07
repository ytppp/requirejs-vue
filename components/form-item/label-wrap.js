define(function (require) {
  var Vue = require('vue');
  Vue.component('FhFormItemLabelWrap', {
    inject: ['form', 'formItem'],
    props: {
      isAutoWidth: Boolean,
      updateAll: Boolean
    },
    data() {
      return {
        computedWidth: 0
      };
    },
    watch: {
      computedWidth(val, oldVal) {
        if (this.updateAll) {
          this.form.registerLabelWidth(val, oldVal);
          this.formItem.updateComputedLabelWidth(val);
        }
      }
    },
    methods: {
      getLabelWidth() {
        if (this.$el && this.$el.firstElementChild) {
          const computedWidth = window.getComputedStyle(this.$el.firstElementChild).width;
          return Math.ceil(parseFloat(computedWidth));
        } else {
          return 0;
        }
      },
      updateLabelWidth(action = 'update') {
        if (this.$slots.default && this.isAutoWidth && this.$el.firstElementChild) {
          if (action === 'update') {
            this.computedWidth = this.getLabelWidth();
          } else if (action === 'remove') {
            this.form.deregisterLabelWidth(this.computedWidth);
          }
        }
      }
    },
    render: function(createElement) {
      const slots = this.$slots.default;
      if (!slots) return null;
      if (this.isAutoWidth) {
        const autoLabelWidth = this.form.autoLabelWidth;
        const style = {};
        if (autoLabelWidth && autoLabelWidth !== 'auto') {
          const marginLeft = parseInt(autoLabelWidth, 10) - this.computedWidth;
          if (marginLeft) {
            style.marginLeft = marginLeft + 'px';
          }
        }
        return createElement(
          'div',
          {
            class: 'form-item__label-wrap',
            style
          },
          slots
        );
      } else {
        return slots[0];
      }
    },
    mounted() {
      this.updateLabelWidth('update');
    },
    updated() {
      this.updateLabelWidth('update');
    },
    beforeDestroy() {
      this.updateLabelWidth('remove');
    }
  });
});
