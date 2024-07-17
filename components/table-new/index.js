define(function (require) {
  var Vue = require('vue');
  Vue.component('FhTableNew', {
    template: require('text!./components/table-new/template.html'),
    props: {
      data: {
        type: Array,
        default: () => []
      },
    },
    data() {
      return {
      };
    },
    computed: {
      tableColumns() {
        const columns = [];
        if (this.$slots.default) {
          this.$slots.default.forEach(vnode => {
            if (vnode.componentOptions && vnode.componentOptions.propsData) {
              const { prop, label } = vnode.componentOptions.propsData;
              columns.push({ prop, label });
            }
          })
        }
        return columns;
      },
    },
    methods: {
    },
    mounted () {
    }
  });
});
