define(function (require) {
  var Vue = require('vue');
  Vue.component('FhForm', {
    template: require('text!./components/form/template.html'),
    componentName: 'Form',
    props: {
      model: {
        type: Object
      },
      rules: {
        type: Object
      },
      name: String,
      id: String,
      action: String,
      method: String,
      enctype: String,
      disabled: Boolean,
      labelPosition: {
        type: String,
        default: 'top',
      },
      labelWidth: {
        type: String
      }
    },
    provide() {
      return {
        form: this
      };
    },
    data () {
      return {
        potentialLabelWidthArr: []
      }
    },
    computed: {
      autoLabelWidth() {
        if (!this.potentialLabelWidthArr.length) return 0;
        const max = Math.max(...this.potentialLabelWidthArr);
        return max ? `${max}px` : '';
      }
    },
    methods: {
      validate() {
        let result = true;
        this.$children.forEach(child => {
          if (child.validate) {
            if (!child.validate()) {
              result = false;
            }
          }
          return true;
        });
        return result;
      },
      clearValidate() {
        this.$children.forEach(child => {
          child.clearValidate();
        });
      },
      getLabelWidthIndex(width) {
        const index = this.potentialLabelWidthArr.indexOf(width);
        if (index === -1) {
          throw new Error('[Form]unpected width ', width);
        }
        return index;
      },
      registerLabelWidth(val, oldVal) {
        if (val && oldVal) {
          const index = this.getLabelWidthIndex(oldVal);
          this.potentialLabelWidthArr.splice(index, 1, val);
        } else if (val) {
          this.potentialLabelWidthArr.push(val);
        }
      },
      deregisterLabelWidth(val) {
        const index = this.getLabelWidthIndex(val);
        this.potentialLabelWidthArr.splice(index, 1);
      }
    }
  });
});
