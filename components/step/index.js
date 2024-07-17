define(function (require) {
  var Vue = require('vue');
  Vue.component('FhStep', {
    template: require('text!./components/step/template.html'),
    props: {
      option: {
        type: Object
      }
    },
    data() {
      return {
        preLength: this.option.steps.length
      };
    },
    computed: {
      width() {
        return `${(this.option.current * 100) / (this.length - 1)}%`;
      },
      length() {
        return this.option.steps.length;
      }
    },
    watch: {
      option: {
        handler(nv) {
          if (nv.steps.length !== this.preLength) {
            this.layout();
          }
        },
        deep: true
      }
    },
    methods: {
      layout() {
        this.$nextTick(() => {
          const width = this.$el.clientWidth;
          const stepItems = this.$el.querySelectorAll('.step');
          const stepItemArr = Array.from(stepItems);
          const stepItemWidth = stepItemArr.reduce((sum, current) => {
            sum += current.clientWidth;
            return sum;
          }, 0);
          const perOffset = ((width - stepItemWidth) / (this.length - 1) / width) * 100;
          stepItemArr.forEach((step, index) => {
            step.style.left = `${(perOffset * index).toFixed(2)}%`;
          });
          this.preLength = this.length;
        });
      }
    },
    mounted() {
      this.layout();
      window.addEventListener('resize', this.layout);
    },
    beforeDestory() {
      window.removeEventListener('resize', this.layout);
    },
  });
});
