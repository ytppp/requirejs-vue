define(function (require) {
  require('less!./components/upload-dragger/style.less');
  var Vue = require('vue');
  Vue.component('FhUploadDragger', {
    template: require('text!./components/upload-dragger/template.html'),
    data() {
      return {
        isDragOver: false
      };
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleDragOver(e) {
        e.preventDefault();
        this.isDragOver = true;
      },
      handleDragLeave(e) {
        e.preventDefault();
        this.isDragOver = false;
      },
      handleDrop(e) {
        e.preventDefault();
        this.isDragOver = false;
        if (this.disabled) {
          return;
        }
        this.$parent.initUploadStatus();
        const { files } = e.dataTransfer;
        this.$emit('file', files);
      }
    }
  });
});
