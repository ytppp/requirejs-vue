define(function (require) {
  require('fh-checkbox');
  require('fh-table-column-render');
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
        default: false
      },
      border: {
        type: Boolean,
        default: false
      },
      hover: {
        type: Boolean,
        default: false
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
      },
      fixed: {
        type: Boolean,
        default: true
      },
      align: {
        type: String,
        default: 'center',
        validator: function (value) {
          return ['left', 'center', 'right'].indexOf(value) !== -1;
        }
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
        return this.fixed && this.isShowScroll && this.showRowCheckbox && this.isScrollRight;
      },
      isFixedRight() {
        return this.fixed && this.isShowScroll && this.$scopedSlots.operation && this.isScrollLeft;
      },
      isShowOperation() {
        return this.$scopedSlots.operation;
      },
      isShowIndex() {
        return this.showIndex;
      },
      isShowRowCheckbox() {
        return this.showRowCheckbox && this.data.length;
      },
      cellStyle() {
        return {
          textAlign: this.align,
          lineHeight: '100%'
        };
      },
      columnsTotal() {
        let total = 0;
        if (this.isShowOperation) {
          total += 1;
        }
        if (this.isShowIndex) {
          total += 1;
        }
        if (this.isShowRowCheckbox) {
          total += 1;
        }
        total += this.columns.length;
        return total;
      }
    },
    methods: {
      getItemStyle(col) {
        return this.data.length ? {
          width: col.width && `${col.width}px`,
          maxWidth: col.width && `${col.width}px`
        } : {};
      },
      handleScroll() {
        if (!this.isShowScroll) {
          return;
        }
        const offset = 20;
        const checkboxColClientWidth = this.$refs.checkboxCol.clientWidth;
        const operationColClientWidth = this.$refs.headerOperationCol.clientWidth;
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
