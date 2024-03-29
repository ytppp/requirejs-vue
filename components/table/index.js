define(function (require) {
  require('less!./components/table/style.less');
  require('fh-checkbox');
  var Vue = require('vue');
  Vue.component('FhTable', {
    template: require('text!./components/table/template.html'),
    props: {
      columns: {
        type: Array,
        default: () => []
      },
      data: {
        type: Array,
        default: () => []
      },
      title: String,
      footer: String,
      showIndex: {
        type: Boolean,
        default: true
      },
      stripe: {
        type: Boolean,
        default: true
      },
      border: {
        type: Boolean,
        default: true
      },
      hover: {
        type: Boolean,
        default: true
      },
      showTableHeader: {
        type: Boolean,
        default: true
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      showRowCheckbox: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        listSelected: [],
        isScrollLeft: false,
        isScrollRight: false,
        isShowScroll: false
      };
    },
    computed: {
      isFixedLeft() {
        return this.isShowScroll && this.showRowCheckbox && this.isScrollRight;
      },
      isFixedRight() {
        return this.isShowScroll && this.$scopedSlots.operation && this.isScrollLeft;
      },
      isShowOperation() {
        return this.$scopedSlots.operation && this.data.length;
      },
      isShowIndex() {
        return this.showIndex && this.data.length;
      },
      isShowRowCheckbox() {
        return this.showRowCheckbox && this.data.length;
      }
    },
    methods: {
      getItemStyle(col) {
        return {
          width: col.width && `${col.width}px`,
          maxWidth: col.width && `${col.width}px`,
        }
      },
      handleScroll() {
        if (!this.isShowScroll) {
          return;
        }
        const offset = 20;
        const checkboxColClientWidth = this.$refs.checkboxCol.clientWidth;
        const operationColClientWidth = this.$refs.operationCol.clientWidth;
        const clientWidth = this.$refs.tableWrap.clientWidth;
        const scrollLeft = this.$refs.tableWrap.scrollLeft;
        const scrollWidth = this.$refs.tableWrap.scrollWidth;
        const offsetLeft = Math.min(checkboxColClientWidth, offset);
        const offsetRight = Math.min(operationColClientWidth, offset);
        const offsetWidth = scrollWidth - clientWidth - offsetRight;
        if (scrollLeft > offsetLeft) {
          this.isScrollRight = true;
        } else {
          this.isScrollRight = false;
        }
        if (scrollLeft < offsetWidth) {
          this.isScrollLeft = true;
        } else {
          this.isScrollLeft = false;
        }
      },
      select(val, row) {
        if (val && !this.listSelected.includes(row)) {
          this.listSelected.push(row);
        } else if (!val && this.listSelected.includes(row)) {
          this.listSelected.splice(this.listSelected.indexOf(row), 1);
        }
        this.$emit('select', this.listSelected);
      }
    },
    mounted () {
      this.isShowScroll = this.$refs.scrollTable.scrollWidth > this.$refs.tableWrap.clientWidth;
      if (this.isShowScroll) {
        this.isScrollLeft = true;
      }
    }
  });
});
