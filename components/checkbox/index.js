define(function (require) {
  require('less!./components/checkbox/style.less');
  var Vue = require('vue');
  Vue.component('fh-checkbox', {
    template: require('text!./components/checkbox/template.html'),
    props: {
      value: {
        type: Boolean,
        default: false
      },
      text: { type: String },
      rect: {
        type: Boolean,
        default: true
      },
      readonly: {
        type: Boolean,
        default: false
      },
      stopPropagation: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return { checked: this.value };
    },
    computed: {
      classObject() {
        return {
          checked: this.checked,
          'circle-shape': !this.rect,
          disabled: this.disabled
        };
      }
    },
    methods: {
      check(e) {
        if (this.readonly || this.disabled) {
          return;
        }
        this.checked = !this.checked;
        this.$emit('input', this.checked);
        this.$emit('change', this.checked);
        if (this.stopPropagation) {
          e.stopPropagation();
        }
      }
    },
    watch: {
      value(v) {
        this.checked = v;
      }
    }
  });
});
