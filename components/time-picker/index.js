define(function (require) {
  var Vue = require('vue');

  require('fh-input');
  require('fh-button');
  require('fh-icon');
  require('clickoutside');

  Vue.component('FhTimePicker', {
    template: require('text!./components/time-picker/template.html'),
    inject: {
      form: {
        default: ''
      },
      formItem: {
        default: ''
      }
    },
    props: {
      value: {
        required: true
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
        opened: false,
        hs: Array.from(new Array(24)).map((__, v) => this.formatCount(v)),
        ms: Array.from(new Array(60)).map((__, v) => this.formatCount(v)),
        inputValue: this.value,
        time: {
          h: this.value.split(':')[0],
          m: this.value.split(':')[1]
        },
        distance: 0,
        animationTime: 200,
        animationEl: null,
        oldValue: ''
      }
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
      value(v) {
        this.value = v;
        this.inputValue = this.value;
        this.time = {
          h: v.split(':')[0],
          m: v.split(':')[1]
        };
      }
    },
    methods: {
      formatCount(v) {
        return `0${v}`.slice(-2);
      },
      scrollTo(el, x, y) {
        if (el.scrollTo) {
          el.scrollTo(x, y);
        } else {
          el.scrollTop = y;
        }
      },
      ok() {
        this.$emit('input', this.inputValue);
        this.opened = false;
      },
      open() {
        if (!this.opened) {
          this.opened = true;
          this.oldValue = this.inputValue;
          this.$nextTick(() => {
            const hEl = this.$refs.h;
            const mEl = this.$refs.m;
            this.initScroll(hEl);
            this.initScroll(mEl);
          });
        }
      },
      close() {
        if (!this.opened) {
          return;
        }
        this.inputValue = this.oldValue;
        this.time = {
          h: this.inputValue.split(':')[0],
          m: this.inputValue.split(':')[1]
        };
        this.opened = false;
      },
      initScroll(el) {
        const sEl = el.querySelector('.selected');
        const cTop = sEl.offsetTop;
        this.scrollTo(el, 0, cTop);
      },
      animateScroll() {
        if (this.animationEl.scrollTop >= this.distance) {
          cancelAnimationFrame(this.animationId);
          return;
        }
        let scroll = this.animationEl.scrollTop + 5;
        scroll = scroll > this.distance ? this.distance : scroll;
        this.scrollTo(this.animationEl, 0, scroll);
        this.animationId = requestAnimationFrame(this.animateScroll);
      },
      selectScroll(e, p) {
        const pEl = this.$refs[p];
        const sEl = e.currentTarget;
        this.distance = sEl.offsetTop;
        this.animationEl = pEl;
        this.animateScroll();
      },
      select(type, v, e) {
        // this.selectScroll(e, type);
        this.time[type] = v;
        this.inputValue = `${this.time.h}:${this.time.m}`;
      }
    },
    beforeDestroy() {
      if (window.addEventListener) {
        document.body.removeEventListener('click', this.close);
      } else if (window.attachEvent) {
        document.body.detachEvent('click', this.close);
      }
    },
    mounted() {
      if (window.addEventListener) {
        document.body.addEventListener('click', e => {
          if (!this.$el.contains(e.target)) {
            this.close();
          }
        });
      } else if (window.attachEvent) {
        document.body.attachEvent('click', e => {
          if (!this.$el.contains(e.target)) {
            this.close();
          }
        });
      }
    }
  });
});
