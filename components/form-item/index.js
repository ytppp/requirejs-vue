define(function (require) {
  var Vue = require('vue');
  require('fh-form-item-label-wrap');
  Vue.component('FhFormItem', {
    template: require('text!./components/form-item/template.html'),
    componentName: 'FormItem',
    provide() {
      return {
        formItem: this
      };
    },
    inject: ['form'],
    props: {
      label: String,
      prop: {
        type: String
      },
      for: String,
      rules: {
        type: Array,
        default: () => []
      },
      labelPosition: {
        type: String,
        validator: function (value) {
          return ['top', 'left', 'right'].indexOf(value) !== -1; // left 时 labelWidth 要明确指定
        }
      },
      labelWidth: {
        type: String
      }
    },
    data() {
      return {
        validateMessage: '',
        computedLabelWidth: '',
        isNested: false,
        validators: [],
        result: null, // null表示没有进行校验，true通过，false未通过
      };
    },
    computed: {
      formCom() {
        let parent = this.$parent;
        let parentName = parent.$options.componentName;
        while (parentName !== 'Form') {
          if (parentName === 'FormItem') {
            this.isNested = true;
          }
          parent = parent.$parent;
          parentName = parent.$options.componentName;
        }
        return parent;
      },
      labelWidthCom() {
        return this.labelWidth || this.formCom.labelWidth;
      },
      labelPositionCom() {
        return this.labelPosition || this.formCom.labelPosition;
      },
      isLabelPositionHorizontal() {
        return ['left', 'right'].includes(this.labelPositionCom)
      },
      labelStyle() {
        let ret = {};
        if (this.labelPositionCom === 'top') return ret;
        if (this.labelWidthCom) {
          ret.width = this.labelWidthCom;
        }
        return ret;
      },
      contentStyle() {
        let ret = {};
        if (this.labelPositionCom === 'top') return ret;
        if (!this.label && !this.labelWidth && this.isNested) return ret;
        if (this.labelWidthCom === 'auto') {
          if (this.labelWidth === 'auto') {
            ret.marginLeft = this.computedLabelWidth;
          } else if (this.formCom.labelWidth === 'auto') {
            ret.marginLeft = this.form.autoLabelWidth;
          }
        } else {
          ret.marginLeft = this.labelWidthCom;
        }
        return ret;
      },
      labelFor() {
        return this.for || this.prop;
      },
      error() {
        return this.result !== null && this.result === false;
      },
      success() {
        return this.result === true;
      }
    },
    methods: {
      updateComputedLabelWidth(width) {
        this.computedLabelWidth = width ? `${width}px` : '';
      },
      getValueByPath(obj, path) {
        let tempObj = obj;
        // remove start dot in path
        path = path.replace(/^\./, '');
        // replace .=>[]
        path = path.replace(/\.(\w+)(?=\.|\[|$)/g, '[$1]');
        // replace start key
        path = path.replace(/^(\w+)/, '[$1]');
        // sometime path is empty when init, so match will get null
        let keyArr = path.match(/(?:\[)(.*?)(?:\])/g) || [];
        // remove [|]|"|' in key
        keyArr = keyArr.map(k => k.replace(/(\[|\]|"|')/g, ''));
        let i = 0;
        for (let len = keyArr.length; i < len - 1; i += 1) {
          if (!tempObj) break;
          const key = keyArr[i];
          if (key in tempObj) {
            tempObj = tempObj[key];
          }
        }
        return tempObj ? tempObj[keyArr[i]] : null;
      },
      escape2Html(val) {
        let temp = document.createElement('span');
        temp.innerHTML = val;
        let output = temp.innerText || temp.textContent;
        temp = null;
        return output;
      },
      validate() {
        if (this.prop) {
          const rules = this.$parent.rules || {};
          const prop = this.prop || '';
          const validators = rules[prop] || [];
          this.validators = validators.concat(this.rules);

          const value = this.escape2Html(this.getValueByPath(this.$parent.model, this.prop));
          let result = true;
          // 检验
          if (this.validators && this.validators.length) {
            for (let j = 0; j < this.validators.length; j += 1) {
              const validator = this.validators[j];
              if (!validator.rule(value)) {
                result = false;
                this.validateMessage = validator.message;
                break;
              }
            }
          }
          this.result = result;
          return result;
        }
        return true;
      },
      extraValidate(validator, msg, ...arg) {
        let result = true;
        if (!validator(...arg)) {
          result = false;
          this.validateMessage = msg;
        }
        this.result = result;
        return result;
      },
      clearValidate() {
        this.result = null;
      }
    },
    mounted () {
      this.$on('blur', () => {
        this.validate();
      });
      this.$on('focus', () => {
        this.result = null;
      });
      this.$on('change', () => {
        this.result = null;
      });
    }
  });
});
